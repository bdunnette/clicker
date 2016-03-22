Meteor.startup(function() {
  // code to run on server at startup
});

Meteor.publish('Polls', function () {
  return Polls.find();
})

Meteor.publish('PollChoices', function () {
  return Pollchoices.find();
});

Meteor.publish('Responses', function() {
  return Responses.find();
})
