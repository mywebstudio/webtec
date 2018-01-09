Meteor.methods({
	toggleSetting(id, active) {

		
		check(active, Boolean);
		check(id, String);

		var currentSetting = Settings.findOne(id);
		

		if (!currentSetting) {
			throw new Meteor.Error('error-invalid-user', 'Не найдено', { method: 'toggleSetting' });
		}
		
		
		if ( Meteor.user().roles != 'admin') {
			throw new Meteor.Error('error-not-allowed', 'Not allowed', { method: 'toggleSetting' });
		}

		Settings.update(id, {
			$set: {active: active}
		});
		
		return id
	}
});