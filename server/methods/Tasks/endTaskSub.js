Meteor.methods({
	endTaskSub(id, key) {

		check(id, String);
		check(key, String);

		
			const currentApplication = Tasks.findOne(id);
			if (currentApplication == null) {
				throw new Meteor.Error('error-application-not-found', 'Application not found', {method: 'endTaskSub'});
			}
			if (currentApplication.manager != this.userId && currentApplication.developer != this.userId && currentApplication.user != this.userId && Meteor.user().roles != 'admin') {
				throw new Meteor.Error('error-application-not-found', 'Нет доступа', {method: 'endTaskSub'});
			}

		var array = currentApplication.sub;

		array[key].status = new Date();

		Tasks.update(id, {
			$set: {
				sub: array
			}
		});

		// Meteor.call('sendNewTask', id, value);
		return key;

	}
});
