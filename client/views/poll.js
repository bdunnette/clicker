var draw_qrcode = function (text, typeNumber, errorCorrectLevel) {
  document.write(create_qrcode(text, typeNumber, errorCorrectLevel));
};

var create_qrcode = function (text, typeNumber, errorCorrectLevel, table) {

  var qr = qrcode(typeNumber || 4, errorCorrectLevel || 'M');
  qr.addData(text);
  qr.make();

  //	return qr.createTableTag();
  return qr.createImgTag();
};

var update_qrcode = function (pollId) {
  document.getElementById('qr').innerHTML = create_qrcode(pollId);
};

var addChoice = function (pollId) {
  var choiceCount = Pollchoices.find({
    poll: pollId
  }).count();
  choice = {
    text: String.fromCharCode(65 + choiceCount),
    color: randomColor()
  };
  console.log(this);
  choice.poll = pollId;
  choice.owner = Meteor.userId();
  var newChoice = Pollchoices.insert(choice);
  return newChoice;
}

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

  'click button.clear-all-responses': function () {
    Meteor.call("clearAllResponses", this.poll._id, Meteor.userId());
  },

  'click button.add-choice': function () {
    addChoice(this.poll._id);
  },

  'click button.clear-response': function () {
    Meteor.call("clearMyResponse", this.poll._id, Session.get('session_id'));
  },

  'click .remove-choice': function () {
    Pollchoices.remove(this._id);
  }
});

Template.pollQR.rendered = function () {
  update_qrcode(location.href);
};