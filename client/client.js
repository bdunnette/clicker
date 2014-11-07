UI.registerHelper('isOwner', function (pollId, currentUser) {
  var poll = Polls.findOne({
    _id: pollId
  });
  if (poll && currentUser) {
    return poll.owner == currentUser._id;
  } else {
    return false;
  }
});

UI.registerHelper('responsePercent', function (choiceId, pollId) {
  var totalResponses = Responses.find({
    poll: pollId
  }).count();
  var responsePercent = 0;
  if (totalResponses > 0) {
    var choiceResponses = Responses.find({
      choice: choiceId
    }).count();
    responsePercent = Math.round((choiceResponses / totalResponses) * 100);
  }
  return responsePercent;
});

UI.registerHelper('myResponse', function (pollId, currentUser) {
  var myResponse = Responses.findOne({
    poll: pollId,
    user: currentUser._id
  });
  var myChoice = Pollchoices.findOne({
    _id: myResponse.choice
  });
  return myChoice.text;
});

UI.registerHelper('pollResponsesTotal', function (poll) {
  var pollResponsesTotal = Responses.find({
    poll: poll._id
  }).count();
  return pollResponsesTotal;
});
