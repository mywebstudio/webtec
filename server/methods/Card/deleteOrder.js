Meteor.methods({
	deleteOrder(applicationId) {

		const application = OrdersList.findOne(applicationId);
		if (application == null) {
			throw new Meteor.Error('error-application-not-found', 'Заказ не найден', { method: 'deleteOrder' });
		}
		if (application.user == this.userId || Meteor.user().roles == 'admin') {

			var items = Items.find({order: applicationId}).fetch();
			for(var i=0;i<items.length; i++){
				if( items[i].order && items[i].user )
				Items.remove(items[i]._id)
			}

			OrdersList.remove(applicationId);
			return true;
		}
		else throw new Meteor.Error('error-application-not-allowed', 'Нет доступа', { method: 'deleteOrder' });
	}
});
