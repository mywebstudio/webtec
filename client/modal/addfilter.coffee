
Template.addfilter.events
  'click .save': (e, t) ->
    e.preventDefault()
    e.stopPropagation()

    userData = {}
    userData.name = $('#filter-name1').val();
    userData.active = true;


    Meteor.call 'addFilter', userData, (err, res) ->
      if res
        UIkit.notification
          message: 'Фильтр создан!',
          status: 'primary',
          pos: 'top-right',
          timeout: 5000
        modal = UIkit.modal("#addfilter")
        modal.hide()
        FlowRouter.go("managefilter",  { id: res._id })

      if err
        UIkit.notification
          message: err,
          status: 'error',
          pos: 'top-right'

