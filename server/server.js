var defaultChoices = [
  {
    "text": "A",
    "color": "red"
  },
  {
    "text": "B",
    "color": "green"
  },
  {
    "text": "C",
    "color": "yellow"
  },
  {
    "text": "D",
    "color": "blue"
  },
  {
    "text": "E",
    "color": "orange"
  }
];

Meteor.methods({
  createPoll: function () {
    var defaultPoll = {
      owner: this.userId,
      title: "New Poll",
      open: true,
    };
    var newPoll = Polls.insert(defaultPoll);
    for (i = 0; i < 5; i++) {
      var choice = defaultChoices[i];
      choice.poll = newPoll,
      choice.owner = this.userId;
      var newChoice = Pollchoices.insert(choice);
    }
    return newPoll;
  },

  addChoice: function (pollId) {
    var choiceCount = Pollchoices.find({
      poll: pollId
    }).count();
    choice = {
      text: String.fromCharCode(65 + choiceCount),
      color: '#' + Math.floor(Math.random() * 16777215).toString(16)
    };
    choice.poll = pollId;
    choice.owner = this.userId;
    var newChoice = Pollchoices.insert(choice);
    return newChoice;
  },

  deletePoll: function (pollId) {
    var pollDeleted = Polls.remove(pollId);
    var choicesDeleted = PollChoices.remove({
      poll: pollId
    });
    var responsesDeleted = Responses.remove({
      poll: pollId
    });
    return pollDeleted;
  },

  setResponse: function (pollId, choiceId, userId) {
    var responseSet = Responses.upsert({
      poll: pollId,
      user: userId
    }, {
      $set: {
        choice: choiceId
      }
    });
    return responseSet;
  },

  clearMyResponse: function (pollId, userId) {
    var myResponseCleared = Responses.remove({
      poll: pollId,
      user: userId
    });
    return myResponseCleared;
  },

  clearAllResponses: function (pollId, userId) {
    var pollOwner = Polls.findOne(pollId).owner;
    if (pollOwner == userId) {
      var allResponsesCleared = Responses.remove({
        poll: pollId
      });
      return allResponsesCleared;
    } else {
      return false;
    }
  },

  claimResponses: function (sessionId) {
    var responsesClaimed = Responses.update({
      user: sessionId
    }, {
      user: this.userId
    });
    return responsesClaimed;
  }
});