let SettingsManager = (() =>
{
  return class SettingsManager
  {
    filterByBoardChosenByUser(response)
    {
      // TODO : Reach in to local storage to grab settings of the name that is necessary
      return response.filter((board) => board.name == "Scrum Board - Team \“NULL\"")[0];
    }
  }


})();