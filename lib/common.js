import fs from 'fs';


var createThumb = function(fileObj, readStream, writeStream) {
    var size = '360';
    gm(readStream).autoOrient().resize('360','360').gravity('Center').background('transparent').extent(size).stream('png').pipe(writeStream);
};

var reduseImage = function(fileObj, readStream, writeStream) {
    var size = '800';
    gm(readStream).autoOrient().resize('800','600').gravity('Center').extent(size).stream('JPG').pipe(writeStream);
};
var reduseAvatars = function(fileObj, readStream, writeStream) {
    var size = '200';
    gm(readStream).autoOrient().resize('200','200').gravity('Center').extent(size).stream('JPG').pipe(writeStream);
};

Images = new FS.Collection("images", {
    stores: [
        // new FS.Store.GridFS ("images", {
        //     transformWrite: reduseImage
        // }),
        new FS.Store.GridFS("thumbs", {
            transformWrite: createThumb
        })
    ],
    filter: {
        allow: {
            contentTypes: ['image/*']
        }
    }
});

Avatars = new FS.Collection("avatars", {
    stores: [
        new FS.Store.GridFS ("avatars", {
            transformWrite: reduseAvatars
        })
    ],
    filter: {
        allow: {
            contentTypes: ['image/*']
        }
    }
});
Gallery = new FS.Collection("gallery", {
    stores: [
        new FS.Store.GridFS ("galleryImages", {
            transformWrite: reduseImage
        }),
        new FS.Store.GridFS("galleryThumbs", {
            transformWrite: createThumb
        })
    ],
    filter: {
        allow: {
            contentTypes: ['image/*']
        }
    }
});
if (Meteor.isServer) {


    Images.allow({
        insert: function () {
            // add custom authentication code here
            return true;
        },
        remove: function () {
            // add custom authentication code here
            return true;
        },
        download: function (userId, fileObj) {
            return true;
        }
    });
    Avatars.allow({
        insert: function () {
            // add custom authentication code here
            return true;
        },
        remove: function () {
            // add custom authentication code here
            return true;
        },
        download: function (userId, fileObj) {
            return true;
        }
    });
    Gallery.allow({
        insert: function () {
            // add custom authentication code here
            return true;
        },
        remove: function () {
            // add custom authentication code here
            return true;
        },
        download: function (userId, fileObj) {
            return true;
        }
    });
} 

if(Meteor.isClient) {
    Meteor.subscribe('myUserData');
    Meteor.subscribe('adminData');
    Meteor.subscribe('Rooms');
    Meteor.subscribe('Images');
    Meteor.subscribe('Gallery');
    Meteor.subscribe('Avatars');
    Meteor.subscribe('Sections');
    Meteor.subscribe('ProjectsSmart');
    Meteor.subscribe('ItemsAllCounter');
}