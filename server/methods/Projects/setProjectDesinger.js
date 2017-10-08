Meteor.methods({
	setProjectDesinger(id, value) {

		check(id, String);
		check(value, String);



			const currentApplication = Projects.findOne(id);
			if (currentApplication == null) {
				throw new Meteor.Error('error-application-not-found', 'Application not found', {method: 'setProjectDesinger'});
			}
			if (currentApplication.user != this.userId && currentApplication.manager != this.userId && Meteor.user().roles != 'admin') {
				throw new Meteor.Error('error-application-not-found', 'Нет доступа', {method: 'setProjectDesinger'});
			}

			Projects.update(id, {
				$set: {
					desinger: value
				}
			});

			// Добавляем того же куратора дизайна к о всем задачам проекта
			var tasks = Tasks.find({project: id}).fetch();
			for(var i=0; i< tasks.length; i++){
	
				Tasks.update(tasks[i],{
					$set: {
						desinger: value
					}
				})
			}
			return Meteor.call('sendProjectDesinger', id, value);

	}
});
