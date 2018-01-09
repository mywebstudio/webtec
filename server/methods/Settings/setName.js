Meteor.methods({
	setStudioName(id, name) {

		
		check(name, String);
		check(id, String);

		var currentStudio = Studio.findOne(id);
		var anotherStudio = Studio.findOne({name: name});

		if (!currentStudio) {
			throw new Meteor.Error('error-invalid-user', 'Не найдено', { method: 'setStudioName' });
		}
		if (anotherStudio) {
			throw new Meteor.Error('error-invalid-user', 'Имя занято', { method: 'setStudioName' });
		}

		if (this.userId != currentStudio.user && Meteor.user().roles != 'admin') {
			throw new Meteor.Error('error-not-allowed', 'Not allowed', { method: 'setStudioName' });
		}

		Studio.update(id, {
			$set: {name: name}
		});
		
		return name
	}
});