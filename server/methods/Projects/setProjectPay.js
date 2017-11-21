Meteor.methods({
	setProjectPay(id, value) {

		check(id, String);
		check(value, Number);



			const currentApplication = Projects.findOne(id);
			if (currentApplication == null) {
				throw new Meteor.Error('error-application-not-found', 'Application not found', {method: 'setProjectPay'});
			}
			if (currentApplication.user != this.userId) {
				throw new Meteor.Error('error-application-not-found', 'Нет доступа', {method: 'setProjectPay'});
			}
			if (Meteor.user().balance < value) {
				throw new Meteor.Error( 'Недостаточно средств. Пополтите баланс', {method: 'setProjectPay'});
			}
			if (value < 100) {
				throw new Meteor.Error( 'Минимальный платёж 100 руб', {method: 'setProjectPay'});
			}

			var payed = currentApplication.payed;

			payed = payed + value;

		if (payed > currentApplication.sum) {
			payed = currentApplication.sum - currentApplication.payed;
			value = payed;


			Projects.update(id, {
				$set: {
					payed: currentApplication.sum
				}
			});
		}
		else
			Projects.update(id, {
				$set: {
					payed: payed
				}
			});


			Meteor.call('sendProjectPayed', id, value );

			return Meteor.call('userBalanceMinus', this.userId, value );

	}
});
