Template.choice.selected = function () {
  return Session.equals("selected_choice", this[0]) ? "selected" : '';
};

Template.poll.selected_choice = function() {
  var selected_choice = Session.get("selected_choice");
  return selected_choice;
};

Template.poll.events = {
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
    Polls.update(this.poll._id, { $set: {title: newTitle}});
  },
    
  'blur .choice': function () {
    var newText = $('#' + this._id).text();
    PollChoices.update(this._id, { $set: {text: newText}});
  },
  
    'click button.delete-poll': function () {
      Meteor.call("deletePoll", this.poll._id, function (err, response) {
          Router.go('/');
      });
      
  },
};

Template.poll.rendered = function() {
    var selected_choice = Session.get("selected_choice");
    if (this.data.poll.owner == Meteor.userId()) {
        $('#pollTitle').attr("contenteditable", true);
        $('.choice').attr("contenteditable", true);        
    }
    $('.choice#' + selected_choice).addClass('selected');
};

Template.choice.responseCount = function (choiceId, pollId) {
    var choiceResponses = Responses.find({choice: choiceId}).count();
    var totalResponses = Responses.find({poll: pollId}).count();
    return 100 * (choiceResponses / totalResponses);
};

Template.polls.events = {
  'click button.new-poll': function () {
    Meteor.call('createPoll', function(err, response) {
        Router.go('poll', {_id: response});
    });
  },
};

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
      var poll = Polls.findOne({_id: this.params._id});
      var choices = PollChoices.find({poll: this.params._id});
      var responses = Responses.find({poll: this.params._id});
      if (!Meteor.userId()) {Meteor.loginVisitor()};
      return {poll: poll, choices: choices, responses: responses};
    },
  });
})
