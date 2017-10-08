Meteor.methods({
	deleteSection(applicationId) {

		if (Meteor.user.roles != 'admin') {
			throw new Meteor.Error('error-not-allowed', 'Not allowed', { method: 'deleteSection' });
		}
		
		const application = Sections.findOne(applicationId);
		if (application == null) {
			throw new Meteor.Error('error-application-not-found', 'Application not found', { method: 'deleteSection' });
		}
		Sections.remove({ _id: applicationId });


		return true;
	}
});
