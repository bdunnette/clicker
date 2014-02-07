Template.poll.events = {
  'click': function () {
    Session.set("selected_choice", this[0]);
  }
};

Template.poll.selected_choice = function() {
  var selected_choice = Session.get("selected_choice");
  return selected_choice;
}
