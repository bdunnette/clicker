Meteor.publish('Responses', function() {
  return Responses.find();
})