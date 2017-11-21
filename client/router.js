/* globals KonchatNotification */

Blaze.registerHelper('pathFor', function(path, kw) {
	return FlowRouter.path(path, kw.hash);
});

BlazeLayout.setRoot('body');

// FlowRouter.subscriptions = function() {
// 	Tracker.autorun(() => {
// 		if (Meteor.userId()) {
// 			this.register('userData', Meteor.subscribe('userData'));
// 		}
// 	});
// };

//
// FlowRouter.route('/', {
// 	name: 'index',
// 	action() {
// 		BlazeLayout.render('main', { center: 'loading' });
// 		if (!Meteor.userId()) {
// 			return FlowRouter.go('home');
// 		}
//
// 		Tracker.autorun(function(c) {
// 			if (FlowRouter.subsReady() === true) {
// 				Meteor.defer(function() {
//
// 						FlowRouter.go('home');
//
// 				});
// 				c.stop();
// 			}
// 		});
// 	}
// });


FlowRouter.route('/login', {
	name: 'login',

	action() {
		Session.set('current', false);
		BlazeLayout.render('loginForm');
	}
});

FlowRouter.route('/', {
	name: 'first',
	action(params, queryParams) {
		Session.set('current', false);
		Session.set('partner', queryParams.p);
			BlazeLayout.render('first');
	}
}); 

FlowRouter.route('/catalog', {
	name: 'home',

	action(params, queryParams) {
		Session.set('current', 'catalog');
			BlazeLayout.render('main', {center: 'home'});
	}
}); 


FlowRouter.route('/projects', {
	name: 'manageProjects',

	action(params, queryParams) {
		Session.set('current', 'project');
			BlazeLayout.render('main', {center: 'manageProjects', header: 'header', footer: 'footer'});
	}
}); 


FlowRouter.route('/projects/:id?', {
	name: 'manageProject',

	action(params) {
		Session.set('current', 'project');
			BlazeLayout.render('main', {center: 'manageProject', header: 'header', footer: 'footer', params: params});
	}
});

