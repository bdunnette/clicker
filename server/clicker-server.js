Meteor.startup(function() {
  // code to run on server at startup
});

Meteor.publish('Polls', function () {
  return Polls.find();
});

Meteor.publish('Poll', function (pollId) {
  return Polls.find({_id: pollId});
})

Meteor.publish('PollChoices', function () {
  return PollChoices.find();
});

Meteor.publish('Responses', function() {
  return Responses.find();
});
