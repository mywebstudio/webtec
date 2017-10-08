Meteor.methods
  galleryImgUpdate: (img, orgId) ->
    if not Meteor.user.roles == 'admin'
      throw new Meteor.Error 'error-not-allowed', 'Not allowed', { method: 'galleryImgUpdate' }

    currentApplication = Items.findOne(orgId)
    if not currentApplication?
      throw new Meteor.Error 'error-application-not-found', 'Application not found', { method: 'galleryImgUpdate' }


    Items.setGalleryImg(orgId, img)

    return true

