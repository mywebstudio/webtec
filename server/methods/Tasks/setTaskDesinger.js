Meteor.methods({
	setTaskDesinger(id, value) {

		check(id, String);
		check(value, String);

		
			const currentApplication = Tasks.findOne(id);
			if (currentApplication == null) {
				throw new Meteor.Error('error-application-not-found', 'Application not found', {method: 'setTaskDesinger'});
			}
			if (currentApplication.manager != this.userId && Meteor.user().roles != 'admin') {
				throw new Meteor.Error('error-application-not-found', 'Нет доступа', {method: 'setTaskDesinger'});
			}

			Tasks.update(id, {
				$set: {
					desinger: value,
				}
			});

			Meteor.call('sendNewTask', id, value);
			return value;

	}
});
