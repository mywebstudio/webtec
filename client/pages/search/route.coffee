FlowRouter.route '/search:search?',
  name: 'searchlist'
  action: (params, queryParams) ->
    Session.set 'curSet', 'catalogs'
    BlazeLayout.render 'main',
      center: 'searchlist'
      header: 'header'
      footer: 'footer'
      search: params.search
      params: params


