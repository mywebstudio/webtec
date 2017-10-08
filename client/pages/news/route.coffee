FlowRouter.route '/news',
  name: 'news-list'
  action: () ->
    Session.set 'curSet', 'news'
    BlazeLayout.render 'main',
      center: 'newsList'
      header: 'header'
      footer: 'footer'
      login: 'loginForm'
      pageTemplate: 'newsList'
      
FlowRouter.route '/newsite',
  name: 'news-list1'
  action: () ->
    Session.set 'curSet', 'news'
    BlazeLayout.render 'main',
      center: 'newsList1'
      header: 'header'
      footer: 'footer'
      login: 'loginForm'
      pageTemplate: 'newsList1'
      


FlowRouter.route '/news/:alias?',
  name: 'news-item'
  action: (params) ->
    Session.set 'curSet', 'news'
    BlazeLayout.render 'main',
      center: 'new'
      header: 'header'
      footer: 'footer'
      login: 'loginForm'
      pageTemplate: 'new'
      params: params

FlowRouter.route '/actions',
  name: 'actions-list'
  action: () ->
    Session.set 'curSet', 'ak'
    BlazeLayout.render 'main',
      center: 'actionsList'
      header: 'header'
      footer: 'footer'
      login: 'loginForm'
      pageTemplate: 'actionsList'


FlowRouter.route '/actions/:alias?',
  name: 'actions-item'
  action: (params) ->
    
    Session.set 'curSet', 'ak'
    BlazeLayout.render 'main',
      center: 'actionsItem'
      header: 'header'
      footer: 'footer'
      login: 'loginForm'
      pageTemplate: 'actionsItem'
      params: params

