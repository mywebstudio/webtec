Template.info.events({

  'click .vk'() {
    Meteor.loginWithVk({}, function (err, res) {
      if (Meteor.userId()) {
        if (Session.get('partner')) {
          Meteor.call('sendNewPartner', Session.get('partner'));
        }
        FlowRouter.go('home');
      }

      if (err) {
        console.log(err);
        UIkit.notification({
          message: err,
          status: 'error',
          pos: 'top-right',
          timeout: 5000
        });
      }
    });
  },
  'click .fb'() {
    Meteor.loginWithFacebook({}, function (err, res) {
      if (Meteor.userId()) {
        if (Session.get('partner')) {
          Meteor.call('sendNewPartner', Session.get('partner'));
        }
        FlowRouter.go('home');
      }

      if (err) {
        console.log(err);
        UIkit.notification({
          message: err,
          status: 'error',
          pos: 'top-right',
          timeout: 5000
        });
      }
    });
  }
});