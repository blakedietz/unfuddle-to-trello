main();

function main()
{
  // since trello is slow, continue attempting to add the button to the page every half a second
  var intervalID = setInterval(addButtonToTicket, 500);

  function addButtonToTicket()
  {
    var ticketHeaders = document.querySelector('div.ticket-header div+div');

    if (ticketHeaders == null)
    {
      return
    }
    clearInterval(intervalID);

    ticketHeaders.appendChild(createTrelloButton());

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

  function addCardToList(response)
  {
    var toDoList = response.filter((list) => list.name == "To Do")[0];

    var newCard =
        {
          name    : 'Bug : ' + document.querySelector('.summary').innerText,
          desc    : location.href,
          pos     : 'top',
          due     : null,
          idList  : toDoList.id,
          // FIXME : get this from a central store of information that is probably already defined by the user
          idLabels: '55759f05664ce8ff30954931'
        };

    Trello.post('/cards/',
      newCard,
      (successMessage) =>
      {
        console.log(successMessage);
      },
      (failureMessage) =>
      {
        console.log(failureMessage);
      }
    );
  }

  function filterBoardToUserSelection(response)
  {
    return response.filter((board) => board.name == "Scrum Board - Team \“NULL\"")[0];
  }

  function exportTicketToTrello()
  {
    Trello.get('/member/me/boards',
      (response) =>
      {
        Trello.get('/boards/' + filterBoardToUserSelection(response).id + '/lists',
          addCardToList,
          (failureMessage) =>
          {
            console.log(failureMessage);
          }
        );
      },
      (failureMessage) =>
      {
        console.log(failureMessage);
      }
    );
  }

  function createTrelloButton()
  {
    var exportToTrelloButton = document.createElement('DIV');
    exportToTrelloButton.classList.add('export-to-trello-button');

    var trelloIcon = document.createElement('I');
    trelloIcon.classList.add('icon-trello');

    exportToTrelloButton.appendChild(trelloIcon);
    exportToTrelloButton.addEventListener('click', () =>
    {
      exportTicketToTrello();
    });
    return exportToTrelloButton;
  }

  function getLabels(boardID)
  {
    return Trello.get('/boards/' + boardID + '/labels')
      .then((successMessage) =>
      {
        return successMessabe.filter((label) => label.name == "Bug");
      });
  }

  function parseURLForTicketNumber(hash)
  {
    var queryString = hash.split('/');
    // get last item, split on query string and take the first item
    return queryString.pop().split('?')[0];
  }
}
