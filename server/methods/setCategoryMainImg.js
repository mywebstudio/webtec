Meteor.methods({
	setCategoryMainImg(id, value) {

		check(id, String);
		
		const currentApplication = Sections.findOne(id);
		if (currentApplication == null) {
			throw new Meteor.Error('error-application-not-found', 'Application not found', { method: 'setCategoryMainImg' });
		}
		
		Sections.update(id, {
			$set: {
				mainImg: value			
			}
		});
		return id;
	}
});
