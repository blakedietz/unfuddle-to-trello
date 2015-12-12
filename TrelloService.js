let TrelloService = (() =>
{
  return class TrelloService
  {
    constructor()
    {
      authorize();
    }

    addCardToList(trelloList, numberOfPoints)
    {
      var newCard =
          {
            name    : 'Bug : ' + document.querySelector('.summary').innerText + '(' + numberOfPoints + ')',
            desc    : location.href,
            pos     : 'top',
            due     : null,
            idList  : trelloList.id,
            // FIXME : get this from a central store of information that is probably already defined by the user
            idLabels: '55759f05664ce8ff30954931'
          };

      return Trello
        .post('/cards/', newCard,
          (successMessage) => { console.log(successMessage); },
          (failureMessage) => { console.log(failureMessage); }
        );
    }

    getLabels (boardID)
    {
      return Trello.get('/boards/' + boardID + '/labels')
        .then((successMessage) =>
        {
          return successMessage.filter((label) => label.name == "Bug");
        });
    }
  };

  function authorize()
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

})();