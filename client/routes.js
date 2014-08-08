// From http://jsfiddle.net/briguy37/2MVFd/
function generateSessionID() {
  var d = new Date().getTime();
  var uuid = 'guest-xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      var r = (d + Math.random()*16)%16 | 0;
      d = Math.floor(d/16);
      return (c=='x' ? r : (r&0x7|0x8)).toString(16);
  });
  return uuid;
}

Router.configure({
  layoutTemplate: 'layout',
  loadingTemplate: 'loading'
});

Router.onRun(function() {
  if (!Session.get('session_id')) {
    console.log(Session);
    var session_id = Meteor.userId() || generateSessionID();
    console.log(session_id);
    Session.set('session_id', session_id);
  }
});

Router.map(function () {

  this.route('polls', {
    path: '/',
    template: 'pollsView',
    data: function () {
      return Polls.find({});
    },
  });

  this.route('poll', {
    path: '/p/:_id',
    template: 'pollView',
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