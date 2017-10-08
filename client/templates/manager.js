
Template.managername.helpers({
   out(){
       var manager = Meteor.users.findOne(Template.instance().data.id);
       if (manager.name) return manager.name;
       else return manager.username;
   }
});