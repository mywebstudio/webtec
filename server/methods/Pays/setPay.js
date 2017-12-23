Meteor.methods({
	setPay(id, value, method) {

		check(id, String);
		check(method, String);
		check(value, Number);
		
			const currentUser = Meteor.users.findOne(id);
			if (currentUser == null) {
				throw new Meteor.Error('error-application-not-found', 'Нет такого пользователя', {method: 'setPay'});
			}
		
			if (Meteor.user().roles != 'admin') {
				throw new Meteor.Error('error-application-not-found', 'Нет доступа', {method: 'setPay'});
			}
		
		
		var pay = {};
		pay.count = value;
		pay._createdAt = new Date();
		pay.user = id;
		pay.method = method;
		pay.adminId = this.userId;
			
		var pid = Pays.insert(pay);

		if(pid) 
			Meteor.call('setBalance', id, value );
		
		return true;

	}
});
