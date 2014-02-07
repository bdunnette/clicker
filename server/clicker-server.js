  Meteor.startup(function () {
    if (Polls.find().count() === 0) {
      Polls.insert({title: "Demo Poll", choices: ["A", "B", "C", "D", "E"]});
    }
  });
