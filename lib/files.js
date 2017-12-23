
import { FilesCollection } from 'meteor/ostrio:files';
import Grid from 'gridfs-stream';
import { MongoInternals } from 'meteor/mongo';


let gfs;
if (Meteor.isServer) {
    gfs = Grid(
        MongoInternals.defaultRemoteCollectionDriver().mongo.db,
        MongoInternals.NpmModule
    );
}

export const Files = new FilesCollection({
    collectionName: 'files',
    storagePath: '/home/stuurgurs/uploads/files',
    downloadRoute: '/files/files',
    // permissions: 0755,
    allowClientCode: true,
    cacheControl: 'public, max-age=31536000',

    debug: false,
    onBeforeUpload(file) {
        if (file.size <= 1024 * 1024 * 20 && /png|jpe?g|pdf|mp3|docx?|xlsx?|txt|zip|rar|tiff?|xml/i.test(file.extension)) {
            return true;
        }
        return 'Please upload image, with size equal or less than 20MB, formats - png|jpeg|pdf|mp3|docx|xlsx|txt|zip|rar|tiff|xml';
    },
    onBeforeRemove(){
        if(Meteor.user().roles == 'admin' ) return true;
        return 'Please be admin';
    },
    downloadCallback(fileObj) {
        if (this.params.query.download == 'true') {
            // Increment downloads counter
            Files.update(fileObj._id, {$inc: {'meta.downloads': 1}});
        }
        // Must return true to continue download
        return true;
    }
});

if (Meteor.isServer) {
    // Audio.denyClient();
    Meteor.publish('files', function() {
        return Files.find().cursor;
    });
}

if(Meteor.isClient) {
    Meteor.subscribe('files');
}
