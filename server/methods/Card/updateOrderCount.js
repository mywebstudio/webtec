Meteor.methods({
	updateOrderCount(orderId) {
		// if (!Meteor.user.roles == 'admin') {
		// 	throw new Meteor.Error('error-not-allowed', 'Not allowed', { method: 'updateOrderPayed' });
		// }
		check(orderId, String); 
		

		const currentApplication = OrdersList.findOne(orderId);
		if(!currentApplication) {
			throw new Meteor.Error('error-invalid-order', 'Invalid order', { method: 'updateOrderCount' });
		}

		//Пересчитываем сумму
		var count = 0;
		var i = 0;
		if(currentApplication.items) {

			var user = Meteor.users.findOne(currentApplication.user);

			//Расчёты при наличии скидки у клиента
			if(user.discont) {

				for (var item in currentApplication.items) {
					if (currentApplication.items[i] && currentApplication.items[i] != null)
					{
						var itemObj = Items.findOne(currentApplication.items[i]);
						if (itemObj.price && itemObj.meter != '%') count = count + ( itemObj.price - itemObj.price * user.discont * 0.01 );
					}
					i++;
				}
				i = 0;
				for (var item in currentApplication.items) {
					if (currentApplication.items[i] && currentApplication.items[i] != null) {
						var itemObj = Items.findOne(currentApplication.items[i]);
						if (itemObj.meter == '%') count = count + count * ( itemObj.price - itemObj.price * user.discont * 0.01 ) * 0.01;
					}
					i++;
				}
			}

			//Расчёты при наличии скидки у клиента
			else {

				for (var item in currentApplication.items) {
					if (currentApplication.items[i] && currentApplication.items[i] != null)
					{
						var itemObj = Items.findOne(currentApplication.items[i]);
						if (itemObj.price && itemObj.meter != '%') count = count + itemObj.price;
					}
					i++;
				}
				i = 0;
				for (var item in currentApplication.items) {
					if (currentApplication.items[i] && currentApplication.items[i] != null) {
						var itemObj = Items.findOne(currentApplication.items[i]);
						if (itemObj.meter == '%') count = count + count * itemObj.price * 0.01;
					}
					i++;
				}
			}


		}
		OrdersList.update(orderId, {
			$set: {
				count: count.toFixed()
			}
		});


		return count;
		
	}
});
