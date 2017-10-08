
Template.searchlist.onCreated ->

    this.subscribe('Sections')
    this.ready = new ReactiveVar true
    this.subscribe 'catalogItemLightList'

    @items = ->
        escapeRegExp = require('lodash.escaperegexp')
        sort =
            sort:
                price: 1
        query = {}

        if Session.get 'search'
            filter = Session.get 'search'
            filterReg = new RegExp(escapeRegExp(filter), 'i')
            query = $or: [
                { name: filterReg }
                { price: filterReg }
                { category: filterReg }
            ]

#        filters = @filterIds.get()
#        if filters
#            query = filters

        return Items.find(query).fetch()


Template.searchlist.helpers
    title: ->
        return Session.get 'search'

    isReady: ->
        return Template.instance().ready.get()

    isAdmin: ->
        if Meteor.user().roles == 'admin'
            return true

    items: ->
        return Template.instance().items()


Template.searchlist.events

    'click .cart': (e, t) ->
        e.preventDefault()
        e.stopPropagation()

        Meteor.call 'addOrder', e.currentTarget.id, (err, res) ->
            if res
                UIkit.notification
                    message: "Товар добавлен"
                    status: 'primary'
                    pos: 'top-right'
                    timeout: 5000
            if err
                UIkit.notification
                    message: err
                    status: 'error'
                    pos: 'top-right'
                    timeout: 5000
