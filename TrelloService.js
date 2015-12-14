let TrelloService = (() =>
{
  return class TrelloService
  {

    static authorize()
    {
      authorizeUser();
    }

    static createCard (numberOfPoints)
    {
      let resolve = function() { };

      let reject = function() { };

      return new Promise(function(resolve, reject)
      {
        getUserBoards()
          .then(response =>
          {
            return getBoard(response)
              .then(getBoardResponse =>
              {
                return addCardToList(getBoardResponse, numberOfPoints)
                .then(response =>
                {
                  resolve();
                  return response;
                });
              });
          });
      });

    }
  };

  function authorizeUser()
  {
    Trello.authorize(
      {
        type      : "popup",
        name      : "unfuddle2trello",
        scope     : {
          read : true,
          write: true
        },
        expiration: "never",
        function() {
          console.log('trello authnetication success')
        },
        function() {
          console.log('trello authentication failure')
        }
      });
  }

  function getUserBoards()
  {
    return Trello.get('/member/me/boards');
  }

  function getBoard (response)
  {
    return Trello.get('/boards/' + filterBoardToUserSelection(response) + '/lists');
  }

  function addCardToList (response, points)
  {
    var toDoListId = response.filter((list) => list.name == "To Do")[0].id;

    var newCard =
        {
          name    : 'Bug : ' + document.querySelector('.summary').innerText + '(' + points + ')',
          desc    : location.href,
          pos     : 'top',
          due     : null,
          idList  : toDoListId,
          // FIXME : get this from a central store of information that is probably already defined by the user
          idLabels: '55759f05664ce8ff30954931'
        };

    return Trello.post('/cards/', newCard);
  }

  function filterBoardToUserSelection(response)
  {
    return response.filter((board) => board.name == "Scrum Board - Team \“NULL\"")[0].id;
  }

  function getLabels (boardID)
  {
    return Trello
      .get('/boards/' + boardID + '/labels')
      .then((successMessage) => { return successMessage.filter((label) => label.name == "Bug"); });
  }

  function parseURLForTicketNumber(hash)
  {
    var queryString = hash.split('/');
    // get last item, split on query string and take the first item
    return queryString.pop().split('?')[0];
  }
})();
