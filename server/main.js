import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { AccountsServer } from 'meteor/accounts-base'

import { Random } from 'meteor/random'

import './publications/Sections.js';
import './publications/Items.js';
import './publications/FiltersList.js';
import './publications/NewsList.js';
import './publications/OrdersList.js';
import './publications/userData.js';


Meteor.startup(() => {
    // var pays = Pays.find().fetch();
    // for (var i = 0; i< pays.length; i++) {
    //     Pays.remove(pays[i]._id)
    // }

    Sortable.collections = ["tasks",'items','tickets'];
    
    var admin = Meteor.users.findOne({roles: 'admin'});
    if(!admin) {
        const createUser = {
            username: 'adminuser3243',
            password: '1',
            email: 'stuurgurs@yandex.ua4243',
            verified: true
        };

        const id2 = Accounts.createUser(createUser);
        Meteor.users.update(id2, {
            $set: {
                roles: 'admin',
                super: true,
                'emails.0.verified': true
            }
        });
    }

    
    SyncedCron.start();
    
});



SyncedCron.add({
    name: 'sinc-1s',
    schedule: function(parser) {
        // parser is a later.parse object
        return parser.text('every 1 days');
    },
    job: function() {
        console.log('hello!');
    }
});

Accounts.onCreateUser((options, user) => {

    Meteor.call('sendNewUserAdd', user._id);


    // console.log(user);

    if (user.services.facebook) {

        var em = [{address: user.services.facebook.email, verified: true}];

        user.name = user.services.facebook.name;
        user.username = slugify(user.services.facebook.first_name + '-' + user.services.facebook.last_name);
        user.avatar = "https://graph.facebook.com/" + user.services.facebook.id + "/picture/?type=large";
        user.emails = em;
        user.active = true;
    }

    if (user.services.vk) {

        var em = [{address: user.services.vk.email, verified: true}];

        user.name = user.services.vk.first_name + ' ' + user.services.vk.last_name;
        user.username = slugify(user.services.vk.first_name + '-' + user.services.vk.last_name);
        user.avatar = user.services.vk.photo_big;
        user.emails = em;
        user.active = true;
    }


    
    user.roles = 'user'; 
    user.discont = 0;
   
    user.partner = Random.hexString(5);


    var admin = Meteor.users.findOne({roles: 'manager'});

    user.manager = admin._id;

    Meteor.call('sendWelcomeEmail', user);


    var s = Settings.findOne({alias: "bonus-za-registraciyu"});
    if(s.active){
        var pay = {};
        pay.count = 300;
        pay._createdAt = new Date();
        pay.user = user._id;
        pay.method = 'Бонус за регистрацию';
        Pays.insert(pay);
        user.balance = 300;
    } else user.balance = 0;
   
    return user;
});

ServiceConfiguration.configurations.remove({
    service: 'vk'
});

ServiceConfiguration.configurations.insert({
    service: 'vk',
    appId:   '6226009',       // Your app id
    secret:  'EP32jIc7GvJNCNUvbdj2', // Your app secret
    scope:   'email,status'   // Your app scope
});

ServiceConfiguration.configurations.remove({
    service: 'facebook'
});

ServiceConfiguration.configurations.insert({
    service: 'facebook',
    loginStyle: "popup",
    appId: "129721360983657", // See table below for correct property name!
    secret: "6213de6bc308b9e94ed2888d937ea598",
    cookie     : false,
    xfbml      : true,
    version    : 'v2.8'
});

ServiceConfiguration.configurations.remove({
    service: 'twitter'
});

ServiceConfiguration.configurations.insert(
    { service: 'twitter' },
    {
        $set: {
            loginStyle: "popup",
            consumerKey: "jyvluhZbc99BynNgKmUuKCZvy", // See table below for correct property name!
            secret: "DlztvO4oeyngyv43Ly2bJQ1cHSFjOIxQXzdYYvi2yA3D4DAJkD"
        }
    }
);