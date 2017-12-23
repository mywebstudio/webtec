
import { Files } from '/lib/files.js';

Meteor.methods({
	removeTicket(id) {

		var currestTicket = Tasks.findOne(id);
		if(!currestTicket) {
			throw new Meteor.Error('error-invalid-arguments', 'Такого тикета не существует', { method: 'removeTicket' });
		}

		if (currestTicket.user == this.userId || Meteor.user().roles == 'admin') {

			if(currestTicket.attach)
				Files.remove(currestTicket.attach);

			return Tasks.remove(id);
		}
		else throw new Meteor.Error('error-application-not-allowed', 'Нет доступа', { method: 'removeTicket' });

	}
});
