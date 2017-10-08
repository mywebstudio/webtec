Meteor.methods({
	setProjectDeadline(id, value) {

		check(id, String);
		check(value, String);



			const currentApplication = Projects.findOne(id);
			if (currentApplication == null) {
				throw new Meteor.Error('error-application-not-found', 'Application not found', {method: 'setProjectDeadline'});
			}
			if (currentApplication.user != this.userId && currentApplication.manager != this.userId && Meteor.user().roles != 'admin') {
				throw new Meteor.Error('error-application-not-found', 'Нет доступа', {method: 'setProjectDeadline'});
			}

			Projects.update(id, {
				$set: {
					"deadline._d": value
				}
			});

			// Добавляем того же куратора к о всем задачам проекта
			var tasks = Tasks.find({project: id}).fetch();
			for(var i=0; i< tasks.length; i++){
				
				Tasks.update(tasks[i],{
					$set: {
						manager: value
					}
				})
			}
		
			
			return Meteor.call('sendProjectDeadline', id, value);

	}
});
