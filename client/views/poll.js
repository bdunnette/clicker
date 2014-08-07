Template.pollView.helpers({
 
});

Template.pollView.events({
  'click .choice': function (event, template) {
    Session.set("selected_choice", this._id);
    Meteor.call("setResponse", this.poll, this._id, Meteor.userId());
  },

  'tap .choice': function (event, template) {
    Session.set("selected_choice", this._id);
    Meteor.call("setResponse", this.poll, this._id, Meteor.userId());
  },

  'blur #pollTitle': function () {
    var newTitle = $('#pollTitle').text();
    Polls.update(this.poll._id, {
      $set: {
        title: newTitle
      }
    });
  },

  'blur .progress-bar-text': function (event, template) {
    var newText = event.target.textContent;
    Pollchoices.update(this._id, {
      $set: {
        text: newText
      }
    });
  },

  'click button.delete-poll': function () {
    console.log(this)
    Meteor.call("deletePoll", this.poll._id, function (err, response) {
      Router.go('/');
    });
  },
});