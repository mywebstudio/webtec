/* globals toolbarSearch, menu, isRtl, fireGlobalEvent, CachedChatSubscription */
import Clipboard from 'clipboard';

import '/lib/ru.js';

import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import moment from 'moment'
moment.locale('ru');



Template.main.onCreated(function() {
    var instance;
    instance = this;

    this.order = new ReactiveVar(false);
    this.ready = new ReactiveVar(false);

    this.subscribe('ProjectsSmart');
    this.subscribe('TasksSmart');

    this.autorun(() => {
        var subscription1 = this.subscribe('userData');
        if (subscription1.ready() ) {
            this.ready.set(true);
            var type;
            if (Meteor.user().roles == 'admin') type = 'admin';
            else type = 'user';
            var subscription2 = this.subscribe('Orders', type);
            if (subscription2.ready())
                this.order.set(true);
        }
    });
});


Template.main.helpers({
    isReady() {
        return Template.instance().ready.get();
    },
    isAdmin() {
        if(Meteor.user() && Meteor.user().roles == 'admin') return true;
        else return false;
    },
    isManager() {
        if(Meteor.user() && (Meteor.user().roles == 'admin' || Meteor.user().roles == 'manager' || Meteor.user().roles == 'developer' || Meteor.user().roles == 'desinger')) return true;
        else return false;
    },
    isUser() {
        if(Meteor.user() && (Meteor.user().roles == 'user')) return true;
        else return false;
    },
    orderReady() {
        return Template.instance().order.get();
    },
    userId(){
        return Meteor.userId()
    },
    orderId(){
        if(Meteor.user() &&  Meteor.user().roles == 'admin' ){
            var order = OrdersList.findOne({active: true});
            return order._id;
        } else {
            var order = OrdersList.findOne({active: true, user: Meteor.userId()});
            if(order)
                return order._id;
        }
    },
    projectcounter(){
        var order = Projects.find().fetch();
        if(Meteor.user() && (Meteor.user().roles != 'user'))
        if(order.length)
            return order.length;
    },
    taskscounter(){
        var order = Tasks.find().fetch();
        if(order.length)
            return order.length;
    },
    user() {
        if (Meteor.userId() != null) return Meteor.user();
    },
    manager(){
        if(Meteor.user() && Meteor.user().manager) {
            return Meteor.users.findOne(Meteor.user().manager)
        }
    },
    orders(){
        return OrdersList.find({active: true},{sort: {count: -1}}).fetch();
    },
    usercounter(){
        var x = Meteor.users.find({roles: 'user'}).fetch();
        return x.length;
    },
    itemscounter(){
        Meteor.subscribe('ItemsAllCounter');
        var x = Items.find({moder: false}).fetch();
        return x.length;
    }
});

Template.main.events({
    'click #isAdmin'() {
        Session.set('isAdmin', true);
        Session.set('isClient', false);
        // console.log(Session.get('isAdmin'));
    },
    'click .currentselector'(e) {
        Session.set('current', e.currentTarget.id);
    },
    'click #logout'(event) {
        event.preventDefault();
        Session.set('current', false);

        return Meteor.logout(function() {
            FlowRouter.go('/');
            var order = OrdersList.findOne(FlowRouter.getParam('id'));
            if(order && order.items.length){
                for (var i =0; i < order.items.length; i++) {
                    var itemObj = Items.findOne(order.items[i]);
                    var section = Sections.findOne({redirectUri: itemObj.category});
                    if(section.radio && !itemObj.quant) {
                        Session.set('ordered-' + item, false);
                        Session.set('section-ordered-' + section._id, false);
                    }
                    else
                        Session.set('ordered-' + item, false);
                }}
        });
    },
    'change #search'(event) {
        Session.set('search', event.currentTarget.value );
        // return FlowRouter.go('searchlist', {search: event.currentTarget.value});
        return FlowRouter.go('searchlist');
    }
});