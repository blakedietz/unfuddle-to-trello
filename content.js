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
      return;
    }

    TrelloService.authorize();

    clearInterval(intervalID);

    var config = {
      onSubmitFunction : function(points)
      {
        return TrelloService.createCard(points);
      }
    };

    var trelloButton = new TrelloButton(config);

    ticketHeaders.appendChild(trelloButton.buttonContainer);
  }
}
