import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { AccountsServer } from 'meteor/accounts-base'
import {SimpleChat} from 'meteor/cesarve:simple-chat/config'

import './publications/Sections.js';
import './publications/Items.js';
import './publications/FiltersList.js';
import './publications/NewsList.js';
import './publications/OrdersList.js';
import './publications/userData.js';


Meteor.startup(() => {
    Sortable.collections = ["tasks",'items'];
    
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

    SimpleChat.configure ({
        texts:{
            loadMore: 'Показать ещё',
            placeholder: 'Ваше сообщение ...',
            button: 'Отпр.',
            join: 'Присоединился к ',
            left: 'Покинул',
            room: 'room at'
        },
        limit: 10,
        beep: true,
        showViewed: true,
        showReceived: true,
        showJoined: false,

        allow: function(message, roomId, username, avatar, name){
            //here the context is the same for a Methods, thats mean you hace access to this.userId also
            // for example
            if(this.userId)
                return true;
            else {
                UIkit.notification({
                    message: 'Что бы оставить сообщение необходимо  зарегистрироваться',
                    status: 'error',
                    pos: 'top-left',
                    timeout: 5000
                });
                return false
            }
        }
    });

    
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
    Meteor.call('sendWelcomeEmail', user);

    user.roles = 'user';
    user.balance = 300;



    var admin = Meteor.users.findOne({roles: 'admin'});
    var room = {};
    room.users = [user.username, admin.username ];
    
    RoomsList.insert(room);

    user.manager = admin._id;

    return user;
});