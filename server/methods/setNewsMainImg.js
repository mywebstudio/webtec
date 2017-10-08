Meteor.methods({
	setNewsMainImg(id, value, value2) {

		check(id, String);

		const currentApplication = NewsList.findOne(id);
		if (currentApplication == null) {
			throw new Meteor.Error('error-application-not-found', 'Application not found', { method: 'setNewsMainImg' });
		}


		NewsList.update(id, {
			$set: {
				mainImg: value,
				mainImgMini: value2
			}
		});
		return id;
	}
});
