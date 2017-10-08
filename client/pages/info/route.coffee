FlowRouter.route '/info',
  name: 'info'
  action: () ->
    Session.set 'current', 'dash'
    BlazeLayout.render 'main',
      center: 'info'
      header: 'header'
      footer: 'footer'
      login: 'loginForm'
      