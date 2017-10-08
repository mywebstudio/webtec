Meteor.methods({
	dragTask(taskId, start, end) {

		check(taskId, String);


		const currentApplication = Tasks.findOne(taskId);
		if (currentApplication == null) {
			throw new Meteor.Error('error-application-not-found', 'Application not found', {method: 'dragTask'});
		}
		if ((currentApplication.manager != this.userId ) && Meteor.user().roles != 'admin') {
			throw new Meteor.Error('error-application-not-found', 'Нет доступа', {method: 'setTaskSatus'});
		}
		

			return Tasks.update(taskId, {
				$set: {
					start: moment(start).format('MM/DD/YYYY'),
					end: moment(end).format('MM/DD/YYYY')
				}
			});

	}
});
