Meteor.methods({
	removeTicketList(id, index, check) {

		var currestTicket = Tasks.findOne(id);
		if(!currestTicket) {
			throw new Meteor.Error('error-invalid-arguments', 'Такого тикета не существует', { method: 'removeTicketList' });
		}

		if (currestTicket.user == this.userId || Meteor.user().roles == 'admin') {
			var list = currestTicket.list;

			list[index].check = check;
			
			return Tasks.update(id, {
				$set: {
					list: list
				}
			});
		}
		else throw new Meteor.Error('error-application-not-allowed', 'Нет доступа', { method: 'removeTicketList' });

	}
});
