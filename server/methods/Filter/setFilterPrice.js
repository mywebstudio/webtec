Meteor.methods({
	setFilterPrice(id) {
		
		check(id, String);

		if (Meteor.user().roles != 'admin') {
			throw new Meteor.Error('error-not-allowed', 'Not allowed', { method: 'setFilterPrice' });
		}

		const currentApplication = FiltersList.findOne(id);
		if (currentApplication == null) {
			throw new Meteor.Error('error-application-not-found', 'Application not found', { method: 'setFilterPrice' });
		}

		if (!currentApplication.items.length) {
			throw new Meteor.Error('error-application-not-found', 'Пустой пресет', { method: 'setFilterPrice' });
		}
		var value = 0;

		for(var i =0; i<currentApplication.items.length; i++){
			var item = Items.findOne(currentApplication.items[i]);
			if(item.price) value = value + Number(item.price);

		}


		FiltersList.update(id, {
			$set: {price: value}
		});
		return '1'
	}
});
