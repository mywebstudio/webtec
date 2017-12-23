Meteor.methods({
	addTicket(project, name, text, color, fileid, labels, list) {

		var proj = Projects.findOne(project);
		if (!proj) throw new Meteor.Error('error-invalid-name', 'Проект не существует', { method: 'addTicket' });

		var litems = [];
		for(var i=0;i<list.length;i++) {
			litems.push({check: false, text: list[i]});
		}
		 
		var application = {};
		application._createdAt = new Date;

		application.user = this.userId;
		application.project = project;
		application.projectname = proj.name;
		application.title = name;
		application.teh = text;
		application.attach = fileid;
		application.color = color.substr(0, 7);
		application.color2 = color;
		application.labels = labels;
		application.list = litems;

		application._id = Tasks.insert(application);
		return application;
	}
});
