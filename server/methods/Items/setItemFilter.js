Meteor.methods({
	setItemFilter(id, filter, value) {

		check(id, String);
		check(filter, String);
		check(value, String);

		const currentApplication = Items.findOne(id);
		if (currentApplication == null) {
			throw new Meteor.Error('error-application-not-found', 'Application not found', { method: 'setItemFilter' });
		}
		if (Meteor.user().roles != 'admin') {
			throw new Meteor.Error('error-not-allowed', 'Not allowed', { method: 'setFilterProp' });
		}
		var farray = {};
		if(currentApplication.farray) {
			farray = currentApplication.farray;
			farray[filter] = value;
		} else {
			farray[filter] = value;
		}

		
		Items.update(id, {
			$set: {
				farray: farray
			}
		});
		return farray;
	}
});
