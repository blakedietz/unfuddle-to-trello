let TrelloButton = (() =>
{
  return class TrelloButton
  {
    constructor()
    {

    }

    onPointsSubmit (submitFunction)
    {
      this.onSubmitFunction = submitFunction;
    }
  }

  function removePointsInput ()
  {

  }

  function createPointsInput ()
  {

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
