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
        function() { console.log('trello authnetication success') },
        function() { console.log('trello authentication failure') }
      });
  }

  function addCardToList(response)
  {
    var toDoList = response.filter((list) => list.name == "To Do")[0];

    var newCard =
        {
          name  : "Bug: " + parseURLForTicketNumber(location.hash),
          desc  : location.href,
          pos   : "top",
          due   : null,
          idList: toDoList.id
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
    var board = response.filter((board) => board.name == "Scrum Board - Team \“NULL\"")[0];
    Trello.get('/boards/' + board.id + '/lists',
      addCardToList,
      (failureMessage) => { console.log(failureMessage); }
    );
  }

  function exportTicketToTrello()
  {
    Trello.get('/member/me/boards',
      (response) =>
      {
        filterBoardToUserSelection(response);
      },
      (failureMessage) => { console.log(failureMessage); }
    );
  }

  function createTrelloButton()
  {
    var exportToTrelloButton = document.createElement('DIV');
    exportToTrelloButton.classList.add('export-to-trello-button');

    var trelloIcon    = document.createElement('I');
    trelloIcon.classList.add('icon-trello');

    exportToTrelloButton.appendChild(trelloIcon);
    exportToTrelloButton.addEventListener('click', ( ) =>
    {
      exportTicketToTrello();
    });
    return exportToTrelloButton;
  }

  function parseURLForTicketNumber(hash)
  {
    var queryString = hash.split('/');
    // get last item, split on query string and take the first item
    return queryString.pop().split('?')[0];
  }
}
