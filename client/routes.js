Router.configure({
  layoutTemplate: 'layout',
  loadingTemplate: 'loading'
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