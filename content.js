// Unfuddle is slow, probably should just set as an interval until div.ticket-header is picked up
// I'm just being lazy right now
setTimeout(addButtonToTicket, 4000);

function addButtonToTicket()
{
  var ticketHeaders = document.querySelector('div.ticket-header div+div');
  var trelloIcon    = document.createElement('I');
  trelloIcon.classList.add('icon-trello');

  var exportToTrelloButton = document.createElement('DIV');
  exportToTrelloButton.classList.add('export-to-trello-button');
  exportToTrelloButton.appendChild(trelloIcon);
  exportToTrelloButton.addEventListener('click',
    () =>
    {
      exportTicketToTrello();
    });

  ticketHeaders.appendChild(exportToTrelloButton);

  Trello.authorize({
    type      : "popup",
    name      : "unfuddle to trello",
    scope     : {
      read : true,
      write: true
    },
    expiration: "never",
    trelloAuthSuccess,
    trelloAuthFailure
  });
}

function exportTicketToTrello()
{
  var ticketID = parseURLForTicketNumber(location.hash);
  Trello.get('/member/me/boards',
    (successMessage) =>
    {
      var board = successMessage.filter((board) => board.name == "Scrum Board - Team \“NULL\"")[0];

      Trello.get('/boards/' + board.id + '/lists',
        (successMessage) =>
        {
          var toDoList = successMessage.filter((list) => list.name == "To Do")[0];

          var newCard =
              {
                name  : "Bug: " + parseURLForTicketNumber(location.hash),
                desc  : "Squash dis bug",
                pos   : "top",
                due   : null,
                idList: toDoList.id
              };

          Trello.post('/cards/', newCard,
            (successMessage) =>
            {
              console.log(successMessage);
            }
            ,
            (failureMessage) =>
            {
              console.log(failureMessage);
            }
          );
        }
        ,
        (failureMessage) =>
        {
          console.log(failureMessage);
        }
      );
    }
    , (failureMessage) =>
    {
      console.log(failureMessage);
    }
  );
  console.log(ticketID);
}

function parseURLForTicketNumber(hash)
{
  var queryString = hash.split('/');
  // get last item, split on query string and take the first item
  var ticketID = queryString.pop().split('?')[0];

  return ticketID;
}

function trelloAuthSuccess()
{
  console.log('trello authentication success');
}

function trelloAuthFailure()
{
  console.log('trello authentication failure');
}