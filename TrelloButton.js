let TrelloButton = (() =>
{
  return class TrelloButton
  {
    constructor()
    {

    }

  }

  function removePointsInput()
  {

  }

  function createPointsInput()
  {


    function createForm ()
    {
      var pointsForm   = document.createElement('FORM');
      pointsForm.id    = "points_form";
      pointsForm.appendChild(pointsInput);
      pointsForm.appendChild(pointsSubmit);

      return pointsForm;

      function createFormInput ()
      {
        var pointsInput   = document.createElement('INPUT');
        var pointsInputID = 'points_input';
        pointsInput.id    = pointsInputID;
        pointsInput.setAttribute('type', 'text');
        pointsInput.setAttribute('name', 'points-input');

        return pointsInput;
      }

      function createFormSubmitButton ()
      {
        var pointsSubmit = document.createElement('INPUT');
        pointsSubmit.id  = 'submit_button';
        pointsSubmit.setAttribute('type', 'button');
        pointsSubmit.setAttribute('value', 'Submit');
        pointsSubmit.addEventListener('click', () =>
        {
          var pointValue = document.getElementById(pointsInputID).value;
          exportTicketToTrello(pointValue);
        });

        return pointsSubmit;
      }
    }

  }



})();
