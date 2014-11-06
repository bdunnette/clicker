Template.pollsView.helpers({

});

Template.pollsView.events({
  'click button.new-poll': function () {
    //    Meteor.call('createPoll', function (err, response) {
    //      Router.go('poll', {
    //        _id: response
    //      });
    //    });
    Polls.insert({
      owner: Meteor.userId(),
      title: [Meteor.user().profile.name, new Date().toLocaleString()].join(' ')
    }, function (error, pollId) {
      Router.go('poll', {
        _id: pollId
      });
    });
  },
});