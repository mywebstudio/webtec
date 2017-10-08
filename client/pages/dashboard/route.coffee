FlowRouter.route '/dashboard',
  name: 'dashboard'
  action: () ->
    Session.set 'current', 'dash'
    BlazeLayout.render 'main',
      center: 'dashboard'
      header: 'header'
      footer: 'footer'
      login: 'loginForm'
      