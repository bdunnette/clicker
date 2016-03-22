Polls = new Mongo.Collection('Polls');

PollChoices = new Mongo.Collection('PollChoices');

Responses = new Mongo.Collection('Responses');

// Polls.allow({
//   insert: function (userId, doc) {
//     return doc.owner === userId;
//   },
//   update: function (userId, doc, fields, modifier) {
//     // can only change your own documents
//     return doc.owner === userId;
//   },
//   remove: function (userId, doc) {
//     // can only remove your own documents
//     return doc.owner === userId;
//   },
//   fetch: ['owner']
// });
//
// PollChoices.allow({
//   insert: function (userId, doc) {
//     return userId;
//   },
//   update: function (userId, doc, fields, modifier) {
//     // can only change your own documents
//     return doc.owner === userId;
//   },
//   remove: function (userId, doc) {
//     // can only remove your own documents
//     return doc.owner === userId;
//   },
//   fetch: ['owner']
// });
