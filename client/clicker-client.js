Template.choice.selected = function () {
  return Session.equals("selected_choice", this[0]) ? "selected" : '';
};

Template.poll.selected_choice = function() {
  var selected_choice = Session.get("selected_choice");
  return selected_choice;
};

Template.poll.events = {
  'click .choice': function (event, template) {
    console.log(this);
    Session.set("selected_choice", this._id);
    console.log(Session);
    var parentID = template.data._id;
    var userId = Meteor.userId();
    var obj = {};
    obj["responses." + userId] = this[0];
    Polls.update({_id: parentID}, {$set: obj});
  },
    
  'blur #pollTitle': function () {
    var newTitle = $('#pollTitle').text();
    Polls.update(this.poll._id, { $set: {title: newTitle}});
  },
    
  'blur .choice': function () {
    var newText = $('#' + this._id).text();
    Responses.update(this._id, { $set: {text: newText}});
  },
  
  'click button.close-poll': function () {
      Polls.update(this.poll._id, { $set: {open: false}});
  },

  'click button.delete-poll': function () {
      Polls.remove(this.poll._id);
      Router.go('/');
  }
};

Template.poll.rendered = function() {
    var selected_choice = Session.get("selected_choice");
    console.log(this.data);
    if (this.data.poll.owner == Meteor.userId()) {
        $('#pollTitle').attr("contenteditable", true);
        $('.choice').attr("contenteditable", true);        
    } else {
        $('.choice#' + selected_choice).addClass('selected');
    }
};

Template.polls.events = {
  'click button.new-poll': function () {
    var newPoll = Polls.insert({title: "New Poll", open: true, owner: Meteor.userId()});
    console.log(newPoll);
    var defaultChoices = ["A", "B", "C", "D", "E"];
    for (var c in defaultChoices) {
        Responses.insert({poll: newPoll, text:defaultChoices[c], respondents:[]});
    }
    Router.go('/p/' + newPoll);
  },
};
