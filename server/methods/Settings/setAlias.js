Meteor.methods({
	addSetting(name) {

		
		check(name, String);

		var anotherStudio = Settings.findOne({name: name});

		if (anotherStudio) {
			throw new Meteor.Error('error-invalid-user', 'Уже есть такое имя', { method: 'addSetting' });
		}

		if ( Meteor.user().roles != 'admin') {
			throw new Meteor.Error('error-not-allowed', 'Not allowed', { method: 'addSetting' });
		}

		Settings.insert({alias: slugify(name), name: name});
		
		return name
	}
});