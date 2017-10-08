Template.addnews1.events({
    'click .save4': function(event, template) {
        var userData;
        userData = {};
        userData.name = $('#namenews').val();
        userData.category = $('#category2 option:selected').val();

        return Meteor.call('addNews', userData, function(err, res) {
            var modal;
            if (res) {
                UIkit.notification({
                    message: 'Материал добавлен!',
                    status: 'primary',
                    pos: 'top-right',
                    timeout: 5000
                });
                modal = UIkit.modal("#addnews1");
                modal.hide();
                FlowRouter.go('news-item', { alias: res._id } );
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
});