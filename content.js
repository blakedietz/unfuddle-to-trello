// Unfuddle is slow, probably should just set as an interval until div.ticket-header is picked up
// I'm just being lazy right now
setTimeout(addButtonToTicket, 4000);

function addButtonToTicket()
{
  var ticketHeaders        = document.querySelector('div.ticket-header div+div');
  var exportToTrelloButton = document.createElement("DIV");
  exportToTrelloButton.classList.add('export-to-trello-button');

  exportToTrelloButton.addEventListener('click', () =>
  {
    exportTicketToTrello();
  });

  ticketHeaders.appendChild(exportToTrelloButton);
}

function exportTicketToTrello()
{
  var ticketID = parseURLForTicketNumber(location.hash);
  console.log(ticketID);
}

function parseURLForTicketNumber(hash)
{
  var queryString = hash.split('/');
  // get last item, split on query string and take the first item
  var ticketID    = queryString.pop().split('?')[0];

  return ticketID;
}