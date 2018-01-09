
Settings = new Mongo.Collection('settings');

Meteor.publish('SettingsAll', function() {
	return Settings.find();
});
