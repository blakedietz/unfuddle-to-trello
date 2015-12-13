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

    
    ticketHeaders.appendChild(TrelloButton.createTrelloButton());
  }

  // TODO : I'm too drunk for this shit.
  function wireButtonToService(response, numberOfPoints)
  {
    var toDoList = response.filter((list) => list.name == "To Do")[0];
    TrelloService
      .then(() =>
      {
        TrelloButton.remove();
      });
  }
}
