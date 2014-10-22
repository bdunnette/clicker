Router.configure({
  layoutTemplate: 'layout',
  loadingTemplate: 'loading'
});

Router.onRun(function () {
  var sessionId = Session.get('session_id');
  if (Meteor.userId()) {
    if (sessionId !== Meteor.userId()) {
      Meteor.call("claimResponses", sessionId);
    }
    Session.set('session_id', Meteor.userId());
  } else {
    if (!sessionId) {
      Session.set('session_id', new Meteor.Collection.ObjectID().toHexString());
    }
  }
  console.log(sessionId);
});

Router.map(function () {

  this.route('polls', {
    path: '/',
    template: 'pollsView',
    data: function () {
      return Polls.find({});
    }
  });

  this.route('poll', {
    path: '/p/:_id',
    template: 'pollView',
    waitOn: function () {
      var pollChoices = Meteor.subscribe('PollChoices', {
          poll: this.params._id
        }),
        pollResponses = Meteor.subscribe('Responses', {
          poll: this.params._id
        });
      return (pollChoices, pollResponses);
    },
    data: function () {
      _id = this.params._id;
      var poll = Polls.findOne({
        _id: this.params._id
      });
      var choices = Pollchoices.find({
        poll: this.params._id
      });
      var responses = Responses.find({
        poll: this.params._id
      });
      return {
        poll: poll,
        choices: choices,
        responses: responses
      };
    },
  });
});