Meteor.methods
  mainImgUpdate: (img, imgMini, orgId) ->
    if not Meteor.user.roles == 'admin'
      throw new Meteor.Error 'error-not-allowed', 'Not allowed', { method: 'mainImgUpdate' }

    currentApplication = Items.findOne(orgId)
    if not currentApplication?
      throw new Meteor.Error 'error-application-not-found', 'Application not found', { method: 'mainImgUpdate' }


    Items.update orgId,
      $set:
        mainImg: img
        mainImgMini: imgMini

    return true
