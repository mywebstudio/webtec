
Projects = new Mongo.Collection('projects');
 

Meteor.publish('ProjectsAll', function() {
	return Projects.find();
});

Meteor.publish('ProjectsManager', function(manager) {
	return Projects.find({manager: manager});
});

Meteor.publish('ProjectsUser', function(user) {
	return Projects.find({user: user});
});

Meteor.publish('ProjectsSmart', function() {
	if(this.userId) {
		if (Meteor.user().roles == 'admin')
			return Projects.find();

		if (Meteor.user().roles == 'user')
			return Projects.find({user: this.userId});

		if (Meteor.user().roles == 'manager')
			return Projects.find({manager: this.userId});
	}
	
});
