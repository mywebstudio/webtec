Template.priceDelta.helpers
  price: ->
    x = Number(Template.instance().data.price)
    y = Number(Template.instance().data.price2)
    ret =  100 - (y / x * 100)
    if ret
      return ret.toFixed()


Template.priceRoz.helpers
  price: ->
    if Template.instance().data.val == 'евро'
      xy =  Number(Session.get 'cur') + Number(Session.get 'cur') * 0.02
      ret = xy * Number(Template.instance().data.price)
      return ret.toFixed()

    if Template.instance().data.val == 'долл'
      xy =  Number(Session.get 'dol') + Number(Session.get 'dol') * 0.02
      ret = xy * Number(Template.instance().data.price)
      return ret.toFixed()


    return Number(Template.instance().data.price)


Template.priceOpt.helpers
  price: ->
    if Template.instance().data.val == 'евро'
      xy =  Number(Session.get 'cur') + Number(Session.get 'cur') * 0.02
      ret = xy * Number(Template.instance().data.price)
      return ret.toFixed()

    if Template.instance().data.val == 'долл'
      xy =  Number(Session.get 'dol') + Number(Session.get 'dol') * 0.02
      ret = xy * Number(Template.instance().data.price)
      return ret.toFixed()



    price = Template.instance().data.price
    if price
      return Number(price)
    else
      return 0


Template.filter.onCreated ->
  this.subscribe('FiltersList')
  
Template.filter.helpers
  filters:  ->
    return FiltersList.find({category: { $in: ['0', Template.instance().data.item.category ] } }).fetch()

  sbrand: (filter) ->
    return Template.instance().data.item.farray[filter]