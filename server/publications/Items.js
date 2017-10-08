
Items = new Mongo.Collection('items');


Meteor.publish('Items', function() {
	return Items.find();
});

Meteor.publish('catalogItemShortList', function(category, limit) {

	if(limit) var fields = {fields: {name: 1, category: 1, img: 1, price: 1, price2: 1, nacenka: 1, val: 1, farray: 1, hit: 1, quant1: 1,redirectUri: 1, articul: 1}, limit: (limit + 1), sort: {price: 1, farray: 1}};
	else var fields = {fields: {name: 1, category: 1, img: 1, price: 1, price2: 1, val: 1, nacenka: 1, farray: 1, hit: 1, quant1: 1,redirectUri: 1, articul: 1}, sort: {price: 1}};


	return Items.find(
		{category: category, active: true}, fields);
	
});

Meteor.publish('catalogItemShortList2', function() {

	var fields = {fields: {name: 1, category: 1, img: 1, price: 1, price2: 1,nacenka: 1, val: 1, farray: 1, hit: 1, quant1: 1,redirectUri: 1, articul: 1}, sort: {price: 1}};

	return Items.find(
		{active: true}, fields);
	
});
 
Meteor.publish('ItemsAll', function() {
	return Items.find({},{sort: {sort: 1}});
});

Meteor.publish('ItemsAllCounter', function() {
	if (!this.userId) {
		return this.ready();
	}
	else if(Meteor.user().roles == 'admin') {
		return Items.find({moder: false},{fields: {name: 1}});
	}

});

Meteor.publish('ItemsCatalog', function() {
	return Items.find({active: true},{sort: {sort: 1}});
});

Meteor.publish('ItemOneAlias', function(item) {
	return Items.find({alias: item});
});

Meteor.publish('ItemOne', function(id) {

	return Items.find({_id: id});
});

Meteor.publish('ItemsOrder', function(orderId) {
	var order = OrdersList.findOne(orderId);
	if(order && order.items)
		return Items.find({$or: [{order: orderId}, {_id: {$in: order.items}}]});
	else return this.ready();
});
