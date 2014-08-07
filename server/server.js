Meteor.methods({
  createPoll: function () {
    var defaultPoll = {
      owner: this.userId,
      title: "New Poll",
      open: true,
    };
    var newPoll = Polls.insert(defaultPoll);
    console.log(newPoll);
    var defaultChoices = ["A", "B", "C", "D", "E"];
    var defaultColors = ["red", "green", "yellow", "blue", "orange"];
    for (d in defaultColors) {
      var choice = {
        poll: newPoll,
        text: defaultChoices[d],
        color: defaultColors[d],
        owner: this.userId
      };
      console.log(choice);
      var newChoice = Pollchoices.insert(choice);
      console.log(newChoice);
    };
    return newPoll;
  },

  deletePoll: function (pollId) {
    var pollDeleted = Polls.remove(pollId);
    console.log(pollDeleted);
    var choicesDeleted = PollChoices.remove({
      poll: pollId
    });
    console.log(choicesDeleted);
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
  }
});