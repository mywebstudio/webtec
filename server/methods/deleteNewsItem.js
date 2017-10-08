Meteor.methods({
	deleteNewsItem(applicationId) {
		// if (!Meteor.user.roles == 'admin') {
		// 	throw new Meteor.Error('error-not-allowed', 'Not allowed', { method: 'deleteCatalogItem' });
		// }
		const application = NewsList.findOne(applicationId);
		if (application == null) {
			throw new Meteor.Error('error-application-not-found', 'Application not found', { method: 'deleteNewsItem' });
		}
		NewsList.remove({ _id: applicationId });
		return true;
	}
});
