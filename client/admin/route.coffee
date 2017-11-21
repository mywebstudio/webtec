FlowRouter.route '/manage/items',
  name: 'manageitems'
  action: () ->
    if Meteor.user() and Meteor.user().roles == 'admin'
      Session.set 'current', 'item'
      BlazeLayout.render 'main',
        center: 'manageList'
        header: 'header'
        footer: 'footer'
        login: 'loginForm'
        pageTemplate: 'manageList'

      
FlowRouter.route '/manage/filters',
  name: 'managefilters'
  action: () ->
    if Meteor.user() and Meteor.user().roles == 'admin'
      Session.set 'current', 'filter'
      BlazeLayout.render 'main',
        center: 'manageFilters'
        header: 'header'
        footer: 'footer'
        login: 'loginForm'
        pageTemplate: 'manageFilters'


FlowRouter.route '/manage/filters/:id?',
  name: 'managefilter'
  action: (params) ->
    if Meteor.user() and Meteor.user().roles == 'admin'
      Session.set 'current', 'filter'
      BlazeLayout.render 'main',
        center: 'manageFilter'
        header: 'header'
        footer: 'footer'
        login: 'loginForm'
        pageTemplate: 'manageFilter'
        params: params


FlowRouter.route '/manage/catalog',
  name: 'manageCatalogList'
  action: (params) ->
    if Meteor.user() and Meteor.user().roles == 'admin'
      Session.set 'current', 'category'
      BlazeLayout.render 'main',
        center: 'manageCatalogList'
        header: 'header'
        footer: 'footer'
        pageTemplate: 'manageCatalogList'
        params: params

FlowRouter.route '/manage/catalog/:id?',
  name: 'managecatalog'
  action: (params) ->
    if Meteor.user() and Meteor.user().roles == 'admin'
      Session.set 'current', 'order'
      BlazeLayout.render 'main',
        center: 'managecatalog'
        header: 'header'
        footer: 'footer'
        login: 'loginForm'
        pageTemplate: 'managecatalog'
        params: params

FlowRouter.route '/orders',
  name: 'orders'
  action: () ->
    Session.set 'current', 'order'
    BlazeLayout.render 'main',
      center: 'orders'
      header: 'header'
      footer: 'footer'
      login: 'loginForm'
      pageTemplate: 'orders'
      
FlowRouter.route '/orders/:id?',
  name: 'manageorders'
  action: (params) ->
    Session.set 'current', 'order'
    BlazeLayout.render 'main',
      center: 'manageOrders'
      header: 'header'
      footer: 'footer'
      login: 'loginForm'
      pageTemplate: 'manageOrders'
      params: params



FlowRouter.route '/manage/:id?',
  name: 'manageitemsedit'
  action: (params) ->
    if Meteor.user() and Meteor.user().roles == 'admin'
      Session.set 'current', 'item'
      BlazeLayout.render 'main',
        center: 'manageItem'
        header: 'header'
        footer: 'footer'
        login: 'loginForm'
        pageTemplate: 'manageItem'
        params: params


FlowRouter.route '/manageusers',
  name: 'manageusres'
  action: () ->
    Session.set 'current', 'users'
    BlazeLayout.render 'main',
      center: 'manageUsers'
      header: 'header'
      footer: 'footer'
      login: 'loginForm'
      pageTemplate: 'manageUsers'


FlowRouter.route '/manageusers/:id?',
  name: 'manageusersedit'
  action: (params) ->
    Session.set 'current', 'account'
    BlazeLayout.render 'main',
      center: 'manageUser'
      header: 'header'
      footer: 'footer'
      login: 'loginForm'
      pageTemplate: 'manageUser'
      params: params

FlowRouter.route '/editprofile',
  name: 'editprofile'
  action: (params) ->
    Session.set 'current', 'account'
    BlazeLayout.render 'main',
      center: 'manageUser'
      header: 'header'
      footer: 'footer'
      login: 'loginForm'
      pageTemplate: 'manageUser'
      params: params
