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

UI.registerHelper('myResponse', function (pollId, currentUser) {
  var myResponse = Responses.findOne({
    poll: pollId,
    user: currentUser._id
  });
  var myChoice = Pollchoices.findOne({_id: myResponse.choice});
  return myChoice.text;
});

UI.registerHelper('pollResponsesTotal', function (poll) {
  var pollResponsesTotal = Responses.find({poll: poll._id}).count();
  return pollResponsesTotal;
});