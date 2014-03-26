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
                {id: Meteor.uuid(), text: "A", respondents: []},
                {id: Meteor.uuid(), text: "B", respondents: []},
                {id: Meteor.uuid(), text: "C", respondents: []},
                {id: Meteor.uuid(), text: "D", respondents: []},
                {id: Meteor.uuid(), text: "E", respondents: []}
            ]
        };
        var newPoll = Polls.insert(defaultPoll);
        console.log(newPoll);
        return newPoll;
    },
    
    setResponse: function(pollId, responseId) {
        console.log(pollId);
        console.log(responseId);
        console.log(this.userId);
        var poll = Polls.findOne({_id: pollId});
        console.log(poll);
    }
});