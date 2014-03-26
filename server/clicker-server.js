Meteor.startup(function () {
  //Polls.remove({});
  //Responses.remove({});
});

Meteor.methods({
    createPoll: function () {
        console.log(this);
        var defaultPoll = {
            owner: this.userId,
            title: "New Poll",
            open: false,
            responses: [
                {text: "A", respondents: []},
                {text: "B", respondents: []},
                {text: "C", respondents: []},
                {text: "D", respondents: []},
                {text: "E", respondents: []}
            ]
        };
        var newPoll = Polls.insert(defaultPoll);
        console.log(newPoll);
        return newPoll;
    }
});