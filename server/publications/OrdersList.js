 
OrdersList = new Mongo.Collection('orders');


Meteor.publish('OrdersList', function() {

	return OrdersList.find();
});

 Meteor.publish('OrdersUserList', function(id) {

		 return OrdersList.find(id);
});

 Meteor.publish('OrdersUserActive', function() {
	if (!this.userId) {
		return this.ready();
	}
		 return OrdersList.find({user: this.userId, active: true});
});

 Meteor.publish('OrdersUserShortList', function() {
	if (!this.userId) {
		return this.ready();
	}
	 
	 if(this.userId) {
		 
		 return OrdersList.find({manager: this.userId}, {
			 fields: {active: 1, count: 1, manager: 1, payed: 1, user: 1},
			 limit: 20,
			 sort: {active: -1, count: -1}
		 });
	 }
	 // else
		//  return OrdersList.find({user: this.userId},{fields: {active: 1, count: 1, manager: 1, payed:1, user: 1}, limit: 20, sort: {active: -1,count: -1}});
});

Meteor.publish('OrdersUserAllList', function() {
	if (!this.userId) {
		return this.ready();
	}

	if(this.user)
		return OrdersList.find({manager: this.userId});
	else
		return OrdersList.find({user: this.userId});
});


Meteor.publish('Orders', function(type) {
	if (!this.userId) {
		return this.ready();
	}


	if(Meteor.user().roles == 'admin')
		return OrdersList.find();
	if(Meteor.user().roles == 'user')
		return OrdersList.find({user: this.userId});
});
