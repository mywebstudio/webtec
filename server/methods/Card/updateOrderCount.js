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
		var countdiscont = 0;
		var i = 0;
		if(currentApplication.items) {

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

			//Расчёты при наличии скидки у клиента
			var user = Meteor.users.findOne(currentApplication.user);
			if(user.discont) {
				
				i = 0;
				for (var item in currentApplication.items) {
					if (currentApplication.items[i] && currentApplication.items[i] != null)
					{
						var itemObj = Items.findOne(currentApplication.items[i]);
						if (itemObj.price && itemObj.meter != '%') countdiscont = countdiscont + ( itemObj.price - itemObj.price * user.discont * 0.01 );
					}
					
					i++;
				}
				i = 0;
				for (var item in currentApplication.items) {
					if (currentApplication.items[i] && currentApplication.items[i] != null) {
						var itemObj = Items.findOne(currentApplication.items[i]);
						if (itemObj.meter == '%') countdiscont = countdiscont + countdiscont * ( itemObj.price - itemObj.price * user.discont * 0.01 ) * 0.01;
					}
					
					i++;
				}
				
			} else {
				countdiscont = count;
			}
			

		}
		OrdersList.update(orderId, {
			$set: {
				count: count.toFixed(),
				countdiscont: countdiscont.toFixed()
			}
		});


		return count;
		
	}
});
