
Template.sidebar.onCreated(function() {
 
});

Template.sidebar.onCreated(function() {
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

    // this.autorun(() => {
    //     var type;
    //     if(Meteor.user().roles == 'admin') type = 'admin';
    //     else type = 'user';
    //     var subscription2 = this.subscribe('Orders', type);
    //     if (subscription2.ready() )
    //         this.order.set(true);
    // });

    //
    // Meteor.setTimeout(function() {
    //     if (Meteor.user().manager)
    //         // instance.subscribe('managerShortInfo', Meteor.user().manager);
    //     instance.subscribe('OrdersUserAllList');
    //     this.orderCounter = function(){
    //         var order = OrdersList.findOne({active: true, user: Meteor.userId()});
    //         var count = 0;
    //         for (var item in order.items) {
    //             if (item)  count++;
    //         }
    //         return count;
    //     };
    // }, 1100);

    // this.orders = function(){
    //     return OrdersList.findOne({active: true, manager: Meteor.userId()})
    // };

    // HTTP.get('https://www.cbr-xml-daily.ru/daily_json.js', function(req, res) {
    //     if (res) {
    //         var r = JSON.parse(res.content);
    //         Session.set('dol', Number(r.Valute.USD.Value));
    //         Session.set('cur', Number(r.Valute.EUR.Value));
    //     }
    // })
});



Template.sidebar.helpers({
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
    ordercounter(){
        var order = OrdersList.findOne({active: true, user: Meteor.userId()});
        if(order.count)
            return order.count;
    },
    projectcounter(){
        var order = Projects.find().fetch();
        if(order.length)
            return order.length;
    },
    taskscounter(){
        var order = Tasks.find().fetch();
        if(order.length)
            return order.length;
    },
    chats(){
        return Meteor.users.find({manager: Meteor.userId()}).fetch();
    },
    user() {
        if (Meteor.userId() != null) return Meteor.user();
    },
    manager(){
        if(Meteor.user() && Meteor.user().manager) {
            return Meteor.users.findOne(Meteor.user().manager)
        }
    },
    curCat(val) {
        if (Session.get('curSet') == val) return 'uk-active';
        else return '';
    },
    orders(){
        return OrdersList.find({active: true},{sort: {count: -1}}).fetch();
    },
    news(){
        return NewsList.find({active: true, category: 'Акции'}).fetch();
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

Template.sidebar.events({
    'click #isAdmin'() {
        Session.set('isAdmin', true);
        Session.set('isClient', false);
        // console.log(Session.get('isAdmin'));
    },
    'click .curset'(e) {

        Session.set('curSet', e.currentTarget.id);
    },
    'click #isClient'() {
        Session.set('isAdmin', false);
        Session.set('isClient', true);
        // console.log(Session.get('isClient'));
    },
    'click #logout'(event) {
        event.preventDefault();

        return Meteor.logout(function() {
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
            return FlowRouter.go('home');
        });
    },
    'change #search'(event) {
        Session.set('search', event.currentTarget.value );
        // return FlowRouter.go('searchlist', {search: event.currentTarget.value});
        return FlowRouter.go('searchlist');
    }
});