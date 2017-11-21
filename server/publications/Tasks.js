
Tasks = new Mongo.Collection('tasks');

Meteor.publish('TasksAll', function() {
	return Tasks.find();
});



Meteor.publish('TasksSmart', function() {
	if(this.userId) {
		if (Meteor.user().roles == 'admin')
			return Tasks.find();

		if (Meteor.user().roles == 'user')
			return Tasks.find({user: this.userId});

		if (Meteor.user().roles == 'developer')
			return Tasks.find({developer: this.userId});

		if (Meteor.user().roles == 'manager')
			return Tasks.find({manager: this.userId});
	}
});

Meteor.publish('TasksOne', function(id) {
	return Tasks.find({_id: id});
});
