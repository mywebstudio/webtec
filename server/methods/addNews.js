Meteor.methods({
	addNews(application) {

		
		if (!_.isString(application.name) || application.name.trim() === '') {
			throw new Meteor.Error('error-invalid-name', 'Invalid name', { method: 'addNews' });
		}


		application._createdAt = new Date;
		application.alias = slugify(application.name);
		var currestNews = NewsList.findOne({alias: application.alias });
		if(currestNews) {
			throw new Meteor.Error('error-invalid-arguments', 'Такое имя уже есть', { method: 'addNews' });
		}

		application.author = this.userId;

		application._id = NewsList.insert(application);
		return application;
	}
});
