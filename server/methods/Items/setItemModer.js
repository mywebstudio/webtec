Meteor.methods({
	setItemModer(id) {

		check(id, String);
		const currentApplication = Items.findOne(id);
		if (currentApplication == null) {
			throw new Meteor.Error('error-application-not-found', 'Application not found', { method: 'setItemModer' });
		}
		if (Meteor.user().roles != 'admin') {
			throw new Meteor.Error('error-not-allowed', 'Not allowed', { method: 'setFilterProp' });
		}
		
		Items.update(id, {
			$set: {
				moder: true		
			}
		});

		// проверяем что все компоненты заказа прошли проверку
		var allitems = Items.find({order: currentApplication.order, moder: false}).fetch();
		if(!allitems.length)
			{
				OrdersList.update(currentApplication.order, {
					$set: {
						confirm: true
					}
				});
				Meteor.call('emailModerTrue', currentApplication);

			}

		//Пересчитываем суммы заказа
		Meteor.call('updateOrderCount', currentApplication.order);


		return '1';
	}
});
