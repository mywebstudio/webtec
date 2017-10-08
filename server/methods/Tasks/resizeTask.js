Meteor.methods({
	resizeTask(task) {

		check(task, Object);

		const currentApplication = Tasks.findOne(task._id);
		if (currentApplication == null) {
			throw new Meteor.Error('error-application-not-found', 'Application not found', {method: 'resizeTask'});
		}
		// if ((currentApplication.manager != this.userId || currentApplication.user != this.userId) && Meteor.user().roles != 'admin') {
		// 	throw new Meteor.Error('error-application-not-found', 'Нет доступа', {method: 'setTaskSatus'});
		// }
		//
		if(!currentApplication.status || currentApplication.status == 0)
		{
			return Tasks.update(task._id, {
				$set: {
					end: task.end
				}
			});
		}
	}
});
