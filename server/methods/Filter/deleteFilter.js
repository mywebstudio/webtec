Meteor.methods({
	deleteFilter(applicationId) {
		// if (!Meteor.user.roles == 'admin') {
		// 	throw new Meteor.Error('error-not-allowed', 'Not allowed', { method: 'deleteFilter' });
		// }
		const application = FiltersList.findOne(applicationId);
		if (application == null) {
			throw new Meteor.Error('error-application-not-found', 'Application not found', { method: 'deleteFilter' });
		}
		FiltersList.remove({ _id: applicationId });
		return true;
	}
});
