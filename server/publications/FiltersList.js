FiltersList = new Mongo.Collection('filters');

Meteor.publish('Filters', function() {

	return FiltersList.find();
});
