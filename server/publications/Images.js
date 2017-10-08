Meteor.publish('Images', function() {
    return Images.find();
});
Meteor.publish('Avatars', function() {
    return Avatars.find();
});

Meteor.publish('Gallery', function() {
    return Gallery.find();
});
