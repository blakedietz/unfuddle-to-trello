
let TrelloButton = (() =>
{
  let onSubmitFunctionProperty = Symbol('onSubmitFunction');
  let buttonContainerProperty  = Symbol('buttonContainer');

  return class TrelloButton
  {
    constructor (config)
    {
      this.onSubmit(config.onSubmitFunction || null);
      this[buttonContainerProperty]  = createTrelloButton.call(this);
    }

    onSubmit(submitFunction)
    {
      if (submitFunction)
      {
        this[onSubmitFunctionProperty] = points =>
        {
          submitFunction(points)
            .then(removePointsInput)
            .then(restyleTrelloButton);
        };
      }
    }

    get buttonContainer()
    {
      return this[buttonContainerProperty];
    }
  };

  function createTrelloButton()
  {
    var exportToTrelloButton = document.createElement('DIV');
    exportToTrelloButton.classList.add('export-to-trello-button');

    var trelloIcon = document.createElement('I');
    trelloIcon.classList.add('icon-trello');
    trelloIcon.classList.add('pull-right');

    exportToTrelloButton.appendChild(trelloIcon);

    var hasClicked = false;
    exportToTrelloButton.addEventListener('click', () =>
    {
      if (!hasClicked)
      {
        hasClicked = true;

        restyleTrelloButton();
        addPointsInput.call(this);
      }
    });
    return exportToTrelloButton;
  }

  function removePointsInput()
  {
    var trelloButton = document.querySelector('.export-to-trello-button');
    var pointsForm   = document.querySelector('.export-to-trello-button form');
    trelloButton.removeChild(pointsForm);
  }

  function addPointsInput()
  {
    this[buttonContainerProperty]
      .appendChild(createForm(this[onSubmitFunctionProperty]));
  }

  function createForm (onSubmitFunction)
  {
    var pointsForm = document.createElement('FORM');
    pointsForm.id  = "points_form";
    pointsForm.appendChild(createFormInput());
    pointsForm.appendChild(createFormSubmitButton(onSubmitFunction));

    return pointsForm;
  }

  function createFormInput ()
  {
    var pointsInput   = document.createElement('INPUT');

    pointsInput.id = 'points_input';
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
