Meteor.methods({
	deleteProject(applicationId) {

		const application = Projects.findOne(applicationId);
		if (application == null) {
			throw new Meteor.Error('error-application-not-found', 'Заказ не найден', { method: 'deleteProject' });
		}
		if (application.user == this.userId || Meteor.user().roles == 'admin') {
			

			var y = Meteor.call('deleteProjectChat', application.room);

			var tasks = Tasks.find({project: applicationId}).fetch();
			for(var i = 0; i < tasks.length; i++){

				Tasks.remove(tasks[i]._id);
			}

			Projects.remove(applicationId);

			Meteor.call('sendRemoveProject', applicationId);

			return true

		}
		else throw new Meteor.Error('error-application-not-allowed', 'Нет доступа', { method: 'deleteProject' });
	}
});
