Meteor.methods({
	setNewsName(id, value) {

		check(id, String);
		check(value, String);
		
		const currentApplication = NewsList.findOne(id);
		if (currentApplication == null) {
			throw new Meteor.Error('error-application-not-found', 'Application not found', { method: 'setNewsName' });
		}

		var alias = slugify(value);
		var currestNews = NewsList.find({alias: alias });
		if(currestNews) {
			throw new Meteor.Error('error-invalid-arguments', 'Такое имя уже есть', { method: 'addNews' });
		}
		
		NewsList.update(id, {
			$set: {
				name: value,
				alias: alias
			}
		});
		return value;
	}
});
