UI.registerHelper('isOwner', function () {
  return Session.get("is_owner");
});

UI.registerHelper('responseCount', function (choiceId, pollId) {
  var choiceResponses = Responses.find({
    choice: choiceId
  }).count();
  var totalResponses = Responses.find({
    poll: pollId
  }).count();
  return 100 * (choiceResponses / totalResponses);
});