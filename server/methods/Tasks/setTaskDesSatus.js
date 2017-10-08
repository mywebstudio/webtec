Meteor.methods({
	setTaskDesSatus(id) {

		check(id, String);
		

			const currentApplication = Tasks.findOne(id);

			if (currentApplication == null) {
				throw new Meteor.Error('error-application-not-found', 'Application not found', {method: 'setTaskDesSatus'});
			}
			if (currentApplication.manager != this.userId && Meteor.user().roles != 'admin') {
				throw new Meteor.Error('error-application-not-found', 'Нет доступа', {method: 'setTaskDesSatus'});
			}
			if (!currentApplication.desinger || !currentApplication.developer ) {
				throw new Meteor.Error('error-application-not-found', 'Не назанчены исполнители задания', {method: 'setTaskDesSatus'});
			}
		
				if(currentApplication.desstatus == 0)
				{
					Tasks.update(id, {
						$set: {
							desstatus: 1
						}
					});

					return Meteor.call('sendTaskDesStatus', id );

				}
		
				else if(currentApplication.desstatus == 1)
				{
					Tasks.update(id, {
						$set: {
							desstatus: 0
						}
					});

					return Meteor.call('sendTaskDesStatus', id );
					
				}
	}
});
 