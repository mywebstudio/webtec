
Template.addcat.onCreated ->


Template.addcat.events
  'click .addcat': (e, t) ->
    e.preventDefault()
    e.stopPropagation()

    userData = {}
    userData.name = $('#cat-name').val();
    userData.sort = Number($('#cat-sort').val());
    userData.active = true;

    Meteor.call 'addSection', userData, (err, res) ->
      if res
        UIkit.notification({
          message: 'Раздел создан!',
          status: 'primary',
          pos: 'top-right',
          timeout: 5000
        })
        modal = UIkit.modal("#addcat")
        modal.hide()

      if err
        UIkit.notification
          message: err,
          status: 'error'
          pos: 'top-right'