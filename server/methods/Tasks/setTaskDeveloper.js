Meteor.methods({
	setTaskDeveloper(id, value) {

		check(id, String);
		check(value, String);

		
			const currentApplication = Tasks.findOne(id);
			if (currentApplication == null) {
				throw new Meteor.Error('error-application-not-found', 'Application not found', {method: 'setTaskDeveloper'});
			}
			if (currentApplication.manager != this.userId && Meteor.user().roles != 'admin') {
				throw new Meteor.Error('error-application-not-found', 'Нет доступа', {method: 'setTaskDeveloper'});
			}

			Tasks.update(id, {
				$set: {
					developer: value,
				}
			});
			
			Meteor.call('sendNewTask', id, value);
			return value;

	}
});
