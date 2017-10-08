 
NewsList = new Mongo.Collection('rocketchat_news_list');

Meteor.publish('NewsList', function() {

	return NewsList.find();
});

Meteor.publish('NewsOne', function(alias) {

	return NewsList.find({alias: alias});
});

Meteor.publish('MainAction', function() {

	return NewsList.find({category: 'Акции', active: true});
});
