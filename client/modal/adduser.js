
Template.adduser1.events({
    'click .save2': function (e, t) {
        var userData;
        e.preventDefault();
        e.stopPropagation();
        userData = {};
        userData.email = $('#emailu').val();
        userData.verified = 1;
        userData.password = $('#passwordu').val();
        userData.username = $("#usernameu").val();
        userData.roles = 'user';
        if(userData.email && userData.password && userData.username ) {
            Meteor.call('insertOrUpdateUser', userData, function (err, res) {

                if (res) {
                    UIkit.notification({
                        message: 'Пользователь создан!',
                        status: 'primary',
                        pos: 'top-right',
                        timeout: 5000
                    });

                    Meteor.call('setPas', res, userData.password);

                    var modal = UIkit.modal("#adduser1");
                    modal.hide();
                    FlowRouter.go('manageusersedit', {id: res});
                }
                if (err) {
                    return UIkit.notification({
                        message: err,
                        status: 'error',
                        pos: 'top-right',
                        timeout: 5000
                    });
                }
            });
        }
    }
});