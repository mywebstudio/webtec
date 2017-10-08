Meteor.methods({
	setProjectBrif(id, value) {

		check(id, String);
		check(value, String);



			const currentApplication = Projects.findOne(id);
			if (currentApplication == null) {
				throw new Meteor.Error('error-application-not-found', 'Application not found', {method: 'setProjectBrif'});
			}
			if (currentApplication.user != this.userId && currentApplication.manager != this.userId && Meteor.user().roles != 'admin') {
				throw new Meteor.Error('error-application-not-found', 'Нет доступа', {method: 'setProjectBrif'});
			}

			Projects.update(id, {
				$set: {
					brif: value,
				}
			});
			return value;

	}
});
