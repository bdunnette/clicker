Template.choice.selected = function () {
  console.log(this);
  return Session.equals("selected_choice", this[0]) ? "selected" : '';
};

Template.poll.selected_choice = function() {
  var selected_choice = Session.get("selected_choice");
  return selected_choice;
};

Template.poll.events = {
  'click': function () {
    Session.set("selected_choice", this[0]);
  }
};
