import { Random } from 'meteor/random'

Template.first.helpers({
    isReady() {
        return Template.instance().ready.get();
    },
    video() {
        var video = ['video1.mp4','video2.mp4','video3.mp4'];
        return Random.choice(video);
    }
});

Template.first.events({
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