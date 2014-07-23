Template.pollsView.helpers({

});

Template.pollsView.events({
  'click button.new-poll': function () {
    Meteor.call('createPoll', function (err, response) {
      Router.go('poll', {
        _id: response
      });
    });
  },
});