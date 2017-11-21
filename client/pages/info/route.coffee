FlowRouter.route '/info',
  name: 'info'
  action: () ->
    Session.set 'current', 'info'
    BlazeLayout.render 'main',
      center: 'info'
      header: 'header'
      footer: 'footer'
      login: 'loginForm'
      