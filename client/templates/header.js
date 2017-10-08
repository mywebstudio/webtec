

Template.header.helpers({
    isReady() {
        return Template.instance().ready.get();
    },
    isAdmin() {
        if(Meteor.user() && Meteor.user().roles == 'admin') return true;
        else return false;
    }
});

Template.header.events({
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
});