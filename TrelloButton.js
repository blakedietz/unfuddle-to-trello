let TrelloButton = (() =>
{
  return class TrelloButton
  {
    constructor (config)
    {
      this.onSubmitFunction = config.onSubmitFunction || null;
    }

    onPointsSubmit (submitFunction)
    {
      this.onSubmitFunction = submitFunction;
    }
    
    remove()
    {

    }
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

  function removePointsInput()
  {
    var trelloButton = document.querySelector('.export-to-trello-button');
    var pointsForm   = document.querySelector('.export-to-trello-button form');
    // TODO : Remove points input
    // removeChild(pointsForm);
  }

  function createPointsInput ()
  {

  }

  function addPointsInput(buttonContainer)
  {
    var pointsInput = createPointsInput();
    buttonContainer.appendChild(pointsInput)
  }

  function createForm (onSubmitFunction)
  {
    var pointsForm = document.createElement('FORM');
    pointsForm.id  = "points_form";
    pointsForm.appendChild(pointsInput);
    pointsForm.appendChild(pointsSubmit);

    return pointsForm;
  }

  function createFormInput ()
  {
    var pointsInput   = document.createElement('INPUT');

    pointsInput.id    = 'points_input';
    pointsInput.setAttribute('type', 'text');
    pointsInput.setAttribute('name', 'points-input');

    return pointsInput;
  }

  function createFormSubmitButton (onSubmitFunction)
  {
    var pointsSubmit = document.createElement('INPUT');
    pointsSubmit.id  = 'submit_button';

    pointsSubmit.setAttribute('type', 'button');
    pointsSubmit.setAttribute('value', 'Submit');
    pointsSubmit.addEventListener('click', () =>
    {
      var pointValue = document.getElementById('points_input').value;
      onSubmitFunction(pointValue);
    });

    return pointsSubmit;
  }

  function restyleTrelloButton()
  {
    var trelloIcon = document.querySelector('i.icon-trello');
    if (trelloIcon.classList.contains('pull-right'))
    {
      trelloIcon.classList.remove('pull-right');
      trelloIcon.classList.add('pull-left');
    }
    else
    {
      trelloIcon.classList.remove('pull-left');
      trelloIcon.classList.add('pull-right');
    }
  }

})();
