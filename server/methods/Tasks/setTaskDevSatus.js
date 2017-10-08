Meteor.methods({
	setTaskDevSatus(id) {

		check(id, String);


		const currentApplication = Tasks.findOne(id);
		if (currentApplication == null) {
			throw new Meteor.Error('error-application-not-found', 'Application not found', {method: 'setTaskDevSatus'});
		}
		if (!currentApplication.desinger || !currentApplication.developer ) {
			throw new Meteor.Error('error-application-not-found', 'Не назанчены исполнители задания', {method: 'setTaskDesSatus'});
		}
		if (currentApplication.manager != this.userId && currentApplication.developer != this.userId && currentApplication.desinger != this.userId && Meteor.user().roles != 'admin') {
			throw new Meteor.Error('error-application-not-found', 'Нет доступа', {method: 'setTaskDevSatus'});
		}


		if(currentApplication.devstatus == 0)
		{
			Tasks.update(id, {
				$set: {
					devstatus: 1
				}
			});

			return Meteor.call('sendTaskDevStatus', id );

		}

		else if(currentApplication.devstatus == 1)
		{
			Tasks.update(id, {
				$set: {
					devstatus: 0
				}
			});

			return Meteor.call('sendTaskDevStatus', id );

		}
	}
});
