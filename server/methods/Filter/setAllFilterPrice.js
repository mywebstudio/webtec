Meteor.methods({
	setAllFilterPrice() {

		if (Meteor.user().roles != 'admin') {
			throw new Meteor.Error('error-not-allowed', 'Not allowed', { method: 'setAllFilterPrice' });
		}

		var array = FiltersList.find().fetch();

		for (var y=0;y<array.length;y++) {


			if (array[y].items.length) {

				var value = 0;

				for (var i = 0; i < array[y].items.length; i++) {
					var item = Items.findOne(array[y].items[i]);
					if (item.price && item.meter != '%') value = value + Number(item.price);
				}

				
				FiltersList.update(array[y]._id, {
					$set: {price: value}
				});

			}
		}
		return '1'
	}
});
