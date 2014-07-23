Pollchoices.allow({
  update: function (userId, doc, fields, modifier) {
    // can only change your own documents
    return doc.owner === userId;
  },
  remove: function (userId, doc) {
    // can only remove your own documents
    return doc.owner === userId;
  },
  fetch: ['owner']
});

Meteor.publish('PollChoices', function () {
  return Pollchoices.find();
});