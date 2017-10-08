
Sections = new Mongo.Collection('sections');
 
Meteor.publish('Sections', function() {

	return Sections.find({}, {sort: {sort: -1}});
});
