Template.pollView.helpers({
 
});

Template.pollView.events({
  'click .choice': function (event, template) {
    Session.set("selected_choice", this._id);
    Meteor.call("setResponse", this.poll, this._id, Session.get('session_id'));
  },

  'tap .choice': function (event, template) {
    Session.set("selected_choice", this._id);
    Meteor.call("setResponse", this.poll, this._id, Session.get('session_id'));
  },

  'blur #pollTitle': function () {
    var newTitle = $('#pollTitle').text();
    Polls.update(this.poll._id, {
      $set: {
        title: newTitle
      }
    });
  },

  'blur .choice-text': function (event, template) {
    var newText = event.target.textContent;
    Pollchoices.update(this._id, {
      $set: {
        text: newText
      }
    });
  },

  'click button.delete-poll': function () {
    Meteor.call("deletePoll", this.poll._id, function (err, response) {
      Router.go('/');
    });
  },
  
  'click button.add-choice': function () {
    Meteor.call("addChoice", this.poll._id);
  },
  
  'click button.clear-response': function () {
    Meteor.call("clearResponse", this.poll._id, Session.get('session_id'));
  },
  
  'click .remove-choice': function () {
    Pollchoices.remove(this._id);
  }
});