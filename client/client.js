UI.registerHelper('isOwner', function (pollId, currentUser) {
  var poll = Polls.findOne({_id:pollId});
  if (poll && currentUser) {
    return poll.owner == currentUser._id;
  } else {
    return false;
  }
});

UI.registerHelper('responsePercent', function (choiceId, pollId) {
  var choiceResponses = Responses.find({
    choice: choiceId
  }).count();
  var totalResponses = Responses.find({
    poll: pollId
  }).count();
  return 100 * (choiceResponses / totalResponses);
});
