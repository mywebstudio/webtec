Meteor.methods({
	getProjectName(id) {
		
		check(id, String);

		var project = Projects.findOne(id);
		
		
		return  project.name;
	}
});
