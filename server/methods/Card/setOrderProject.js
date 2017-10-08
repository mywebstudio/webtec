Meteor.methods({
	setOrderProject(orderId, projectId) {

		check(orderId, String); 
		check(projectId, String);



		const currentApplication = OrdersList.findOne(orderId);
		if(!currentApplication) {
			throw new Meteor.Error('error-invalid-order', 'Счёт не найден', { method: 'setOrderProject' });
		} 
		
		const currentProject = Projects.findOne(projectId);
		if(!currentProject) {
			throw new Meteor.Error('error-invalid-order', 'Проект не найден', { method: 'setOrderProject' });
		} 

		
		OrdersList.update(orderId, {
			$set: {			
				_payedAt: new Date,
				payed: currentApplication.count,
				active: false
			}
		});

		return true;
		
	}
});
