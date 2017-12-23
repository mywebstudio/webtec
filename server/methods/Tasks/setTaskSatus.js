Meteor.methods({
	setTaskSatus(id) {

		check(id, String);


		const currentApplication = Tasks.findOne(id);
		if (currentApplication == null) {
			throw new Meteor.Error('error-application-not-found', 'Application not found', {method: 'setTaskSatus'});
		}
		// if ((currentApplication.manager != this.userId || currentApplication.user != this.userId) && Meteor.user().roles != 'admin') {
		// 	throw new Meteor.Error('error-application-not-found', 'Нет доступа', {method: 'setTaskSatus'});
		// }
		//
		if(!currentApplication.status || currentApplication.status == 0)
		{
			Tasks.update(id, {
				$set: {
					status: 1
				}
			});

			return Meteor.call('sendTaskStatus', id );

		}

		else if(currentApplication.status == 1)
		{
			Tasks.update(id, {
				$set: {
					status: 0
				}
			});

			return true;

		}
	}
});
