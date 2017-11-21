Meteor.methods({
	setTaskSub(id, value) {

		check(id, String);
		check(value, String);

		
			const currentApplication = Tasks.findOne(id);
			if (currentApplication == null) {
				throw new Meteor.Error('error-application-not-found', 'Application not found', {method: 'setTaskSub'});
			}
			if (currentApplication.manager != this.userId && currentApplication.developer != this.userId && currentApplication.user != this.userId && Meteor.user().roles != 'admin') {
				throw new Meteor.Error('error-application-not-found', 'Нет доступа', {method: 'setTaskSub'});
			}

			var sub = {};
			sub.text = value;
			sub.date = new Date();
			sub.status = 0;
			sub.user = this.userId;
 
			Tasks.update(id, {
				$addToSet: {
					sub: sub
				}
			});
			
			// Meteor.call('sendNewTask', id, value);
			return value;

	}
});
