// Set up a collection to contain player information. On the server,
// it is backed by a MongoDB collection named "players".

Polls = new Meteor.Collection("polls");
PollChoices = new Meteor.Collection("pollchoices");
Responses = new Meteor.Collection("responses");

