
Template.projectname.helpers({
   out(){
       console.log(Meteor.call('getProjectName', Template.instance().data.id));
   } 
});