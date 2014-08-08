var defaultChoices = [
  {"text":"A", "color":"red"},
  {"text":"B", "color":"green"},
  {"text":"C", "color":"yellow"},
  {"text":"D", "color":"blue"},
  {"text":"E", "color":"orange"},
  {"text":"F", "color":"purple"},
  {"text":"G", "color":"aqua"},
  {"text":"H", "color":"maroon"},
  {"text":"I", "color":"lime"},
  {"text":"J", "color":"navy"},
  {"text":"K", "color":"fuchsia"},
  {"text":"L", "color":"olive"}
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
    var choiceCount = Pollchoices.find({poll: pollId}).count();
    if (defaultChoices[choiceCount]) {
      choice = defaultChoices[choiceCount];
    } else {
      choice = {
        text: choiceCount,
        // Thanks to Paul Irish et al for random CSS color code! http://www.paulirish.com/2009/random-hex-color-code-snippets/
        color: '#'+Math.floor(Math.random()*16777215).toString(16)
      };
    }
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
  
  clearResponse: function (pollId, userId) {
    var responseCleared = Responses.remove({
      poll: pollId,
      user: userId
    });
    return(responseCleared);
  }
});