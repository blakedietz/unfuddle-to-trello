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

  function addCardToList(response, numberOfPoints)
  {
    var toDoList = response.filter((list) => list.name == "To Do")[0];

    var newCard =
        {
          name    : 'Bug : ' + document.querySelector('.summary').innerText + '(' + numberOfPoints + ')',
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

  function exportTicketToTrello(numberOfPoints)
  {
    Trello.get('/member/me/boards',
      (response) =>
      {
        Trello.get('/boards/' + filterBoardToUserSelection(response).id + '/lists',
          (response) => { return addCardToList(response, numberOfPoints); } ,
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
    trelloIcon.classList.add('pull-right');
    // todo : remove event listener instead of depending upon closure :P  HACK HACK HACK
    exportToTrelloButton.appendChild(trelloIcon);
    var hasClicked = false;
    exportToTrelloButton.addEventListener('click', () =>
    {
      if (!hasClicked)
      {
        hasClicked = true;
        restyleTrelloButton();
        addPointsInput(exportToTrelloButton);
      }
    });
    return exportToTrelloButton;
  }

  function restyleTrelloButton()
  {
    var trelloIcon = document.querySelector('i.pull-right');
    if (trelloIcon)
    {
      trelloIcon.classList.remove('pull-right');
      trelloIcon.classList.add('pull-left');
    }
  }

  function addPointsInput(buttonContainer)
  {
    var pointsInput = createPointsInput();
    buttonContainer.appendChild(pointsInput)
  }

  function createPointsInput()
  {
    var pointsInput   = document.createElement('INPUT');
    var pointsInputID = 'points_input';
    pointsInput.id    = pointsInputID;
    pointsInput.setAttribute('type', 'text');
    pointsInput.setAttribute('name', 'points-input');

    var pointsSubmit = document.createElement('INPUT');
    pointsSubmit.id  = 'submit_button';
    pointsSubmit.setAttribute('type', 'button');
    pointsSubmit.setAttribute('value', 'Submit');
    pointsSubmit.addEventListener('click', () =>
    {
      var pointValue = document.getElementById(pointsInputID).value;
      exportTicketToTrello(pointValue);
    });

    var pointsForm   = document.createElement('FORM');
    pointsForm.appendChild(pointsInput);
    pointsForm.appendChild(pointsSubmit);

    return pointsForm;
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
