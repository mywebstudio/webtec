
Template.additem1.onCreated ->
    this.subscribe 'Sections'
    

Template.additem1.helpers
    categorys: ->
        return Sections.find()


Template.additem1.events
    'click .save': (e, t) ->
        e.preventDefault()
        e.stopPropagation()
    
        userData = {}
        userData.name = $('#item-name').val();
        userData.category = $("#item-category").val();
        userData.active = true;
    
    
        Meteor.call 'addCatalogItem', userData, (err, res) ->
            if res
                UIkit.notification({
                    message: "Товар создан",
                    status: 'primary',
                    pos: 'top-right',
                    timeout: 5000
                })
                modal = UIkit.modal("#additem1")
                modal.hide()
                FlowRouter.go('manageitemsedit', { id: res._id } );
    
            if err
                UIkit.notification({
                    message: err,
                    status: 'error',
                    pos: 'top-right',
                    timeout: 5000
                })