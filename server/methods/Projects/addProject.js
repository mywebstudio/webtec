Meteor.methods({
	addProject(oid) {

		const order = OrdersList.findOne(oid);
		if (!order){
			throw new Meteor.Error('error-invalid-name', 'Счёт не существует', { method: 'addProject' });
		}

		if (order && order.payed){
			throw new Meteor.Error('error-invalid-name', 'Этот счёт уже оформлен', { method: 'addProject' });
		}


		if (!order.items.length){
			throw new Meteor.Error('error-invalid-name', 'Заказ пуст', { method: 'addProject' });
		}
		
		// Проверяем положительный баланс пользователя 
		if (Meteor.user().balance < 0){
			throw new Meteor.Error('Недостаточно средств', 'Пополните баланс', { method: 'addProject' });
		}

		// Награждаем пользователя за оформление проекта сегодня
		var s = Settings.findOne({alias: "bonus-za-pervyj-proekt"});
		if(s.active){
			if (Meteor.user().balance == 300){
				Meteor.call('userBalancePlus', this.userId, 300 )
			}
		}

		

		//Считаем сколько проектов создавать

		var items1 = [];
		var items2 = [];
		for(var i = 0; i < order.items.length; i++){
			var item = Items.findOne(order.items[i]);
			if(item.type == 'regular') items2.push(item);
			else items1.push(item);
		}


		//Создаём чат проекты
		if(items1.length) {

			var project = {};
			project.name = order.name;
			project.status = 'Ожидаем предоплату'; 
			project.progress = 1;
			project.short = 'Дополнительное описание';
			project.customTZ = order.tehzadanie;
			project.brif = order.spec;


			var admin = Meteor.users.findOne({roles: 'admin'});
			const colors = ['#9b59b6', '#16a085', '#2980b9', '#e67e22', '#fbfff6', '#e6261e', '#e6261e', '#fbfff6', '#e67e22', '#2980b9', '#16a085'];
			project.bill = [oid];
			project.items = order.items;
			project.user = this.userId;
			project.manager = admin.manager;
			project._createdAt = new Date;
			project.deadline = moment().add(30, 'days');
			project.type = 'general';
			project.payed = 0;
			var id = Projects.insert(project);
			var sum = 0;
			//Создаём задачи и тикеты
			for (i = 0; i < items1.length; i++) {
					item = items1[i];
					var cat = Sections.findOne({redirectUri: item.category});
					var task = {};
					task.user = this.userId;
					task.title = item.name;
					task.img = item.img;
					task.project = id;
					task.projectname = order.name;
					task.order = i;
					task.start = moment().format('MM/DD/YYYY');
					task.end = moment().add(item.time, 'days').format('MM/DD/YYYY');
					task.manager = project.manager;
					task.devstatus = 0;
					task.desstatus = 0;
					task.color = colors[cat.sort];
					task.time = Number(item.time);
					task.teh = item.teh;
					task.sub = [{date: new Date(), text: item.teh, status: 0, user: this.userId}];
					task.sum = item.price;
					task.level = 'general';
					sum = sum + item.price;
					task._createdAt = new Date;
					var thisid = Random.id();
					task._id = thisid;
					task.labels = [thisid];
					task.color2 = colors[cat.sort]+'24';
					Tasks.insert(task);
			}
			Projects.update(id, {
				$set: {sum: sum}
			});

			Meteor.call('sendNewProj', id);
		}


		// При наличии ежемесечных услуг созздаем ещё один проект
		if(items2.length) {
			var project = {};
			project.name = 'Регулярный проект';
			project.status = 'Ожидаем предоплату';
			project.progress = 1;
			project.short = 'Дополнительное описание';
			project.brif = order.spec;

			var admin = Meteor.users.findOne({roles: 'admin'});
			const colors = ['#9b59b6', '#16a085', '#2980b9', '#e67e22', '#2980b9', '#27ae60', '#e67e22', '#e74c3c', '#16a085', '#9b59b6', '#2980b9'];
			project.bill = [oid];
			project.items = order.items;
			project.user = this.userId;
			project.manager = admin.manager;
			project._createdAt = new Date;
			project.deadline = moment().add(30, 'days');
			project.type = 'regular';
			project.payed = 0;

			var id = Projects.insert(project);
			var sum = 0;
			//Создаём задачи
			for (i = 0; i < items2.length; i++) {
					item = items2[i];
					var cat = Sections.findOne({redirectUri: item.category});
					var task = {};
					task.user = this.userId;
					task.title = item.name;
					task.project = id;
					task.order = i;
					task.start = moment().format('MM/DD/YYYY');
					task.end = moment().add(30, 'days').format('MM/DD/YYYY');
					task.manager = project.manager;
					task.devstatus = 0;
					task.desstatus = 0;
					task.color = colors[cat.sort];
					task.finished = false;
					task.teh = item.teh;
					task.sum = item.price;
					task.level = 'general';
					sum = sum + item.price;
					task._createdAt = new Date;
					var thisid = Random.id();
					task._id = thisid;
					task.labels = [thisid];
					task.color2 = colors[cat.sort]+'24';
					Tasks.insert(task);

			}
			Projects.update(id, {
				$set: {sum: sum}
			});

			Meteor.call('sendNewProj', id);
		}

		return true;
	}
});
