// Set up a collection to contain player information. On the server,
// it is backed by a MongoDB collection named "players".

Polls = new Meteor.Collection("polls");

Router.map(function() {
  this.route('polls', {
    path: '/',
    waitOn: function () {
      return Meteor.subscribe('polls');
    },
    data: function () {
      return Polls.find();
    },
  });
  this.route('poll', {
    path: '/p/:_id',
    data: function () {
      _id = this.params._id;
      var poll = Polls.findOne({_id: _id});
      console.log(poll);
      return poll;
    },
  });
})