/*globals OnePassword, device, setLanguage */
import toastr from 'toastr';
Template.loginForm.onCreated(function() {

	this.state = new ReactiveVar('login');

});

Template.loginForm.onRendered(function() {
	Session.set('loginDefaultState');
	return Tracker.autorun(() => {

		switch (this.state.get()) {
			case 'login':
			case 'forgot-password':
			case 'email-verification':
				return Meteor.defer(function() {
					return $('input[name=email]').select().focus();
				});
			case 'register':
				return Meteor.defer(function() {
					return $('input[name=name]').select().focus();
				});
		}
	});
});

Template.loginForm.helpers({
	userName() {
		const user = Meteor.user();
		return user && user.username;
	},
	showFormLogin() {
		return true;
	},
	state(...state) {
		return state.indexOf(Template.instance().state.get()) > -1;
	},
	requirePasswordConfirmation() {
		return false;
	}
});

Template.loginForm.events({
	'click .login'(event, instance) {
		event.preventDefault();
		$(event.target).find('button.login').focus();
		var formData = {};
		formData.emailOrUsername = $('#emailOrUsername').val();
		formData.pass = $('#pass').val();
		formData.email = $('#email').val();


		const state = instance.state.get();
		if (formData) {
			if (state === 'email-verification') {
				Meteor.call('sendConfirmationEmail', formData.email, () => {

					UIkit.notification({
						message: 'We_have_sent_registration_email',
						status: 'error',
						pos: 'top-right',
						timeout: 5000});

					return instance.state.set('login');
				});
				return;
			}
			if (state === 'register' && formData.email && formData.emailOrUsername && formData.pass) {

				const createUser = {
					username: formData.emailOrUsername,
					password: formData.pass,
					email: formData.email,
					verified: false
				};

				const _id = Accounts.createUser(createUser);
				if(_id) {

					 Meteor.loginWithPassword(formData.username, formData.password);
					if (Session.get('partner')) {
						Meteor.call('sendNewPartner', Session.get('partner'));
					}
					FlowRouter.go('home');
				}

			}
			if (state === 'forgot-password') {
				Meteor.call('sendForgotPasswordEmail', formData.email, (err) => {
					if (err) {
						handleError(err);
						return instance.state.set('login');
					} else {
						instance.loading.set(false);
						UIkit.notification({
							message: 'If_this_email_is_registered',
							status: 'error',
							pos: 'top-right',
							timeout: 5000});

						return instance.state.set('login');
					}
				});
				return;
			}
			 else {
				if (formData.emailOrUsername && formData.pass) {
					let loginMethod = 'loginWithPassword';

					// FlowRouter.go('home');
					Meteor[loginMethod](formData.emailOrUsername, formData.pass, function (error, result) {

						if(Meteor.userId()) {
							if (Session.get('partner')) {
								Meteor.call('sendNewPartner', Session.get('partner'));
							}
							FlowRouter.go('home');
						}



						if (error != null) {
							if (error.error === 'no-valid-email') {
								instance.state.set('email-verification');
							} else {
								UIkit.notification({
									message: 'User_not_found_or_incorrect_password',
									status: 'error',
									pos: 'top-right',
									timeout: 5000
								});
							}
						}
					});
				}
			}
		}
	},
	'click .vk'() {
		Meteor.loginWithVk({}, function(err, res){
			if(Meteor.userId())  {
				if (Session.get('partner')) {
					Meteor.call('sendNewPartner', Session.get('partner'));
				}
				FlowRouter.go('home');
			}

			if (err) {
				console.log(err);
				UIkit.notification({
					message: err,
					status: 'error',
					pos: 'top-right',
					timeout: 5000
				});
			}
		});
	},
	'click .fb'() {
		Meteor.loginWithFacebook({}, function(err, res){
			if(Meteor.userId()) {
				if (Session.get('partner')) {
					Meteor.call('sendNewPartner', Session.get('partner'));
				}
				FlowRouter.go('home');
			}

			if (err) {
				console.log(err);
				UIkit.notification({
					message: err,
					status: 'error',
					pos: 'top-right',
					timeout: 5000
				});
			}
		});
	},
	'click .tw'() {
		Meteor.loginWithTwitter({force_login: true}, function(err, res){
			if (err) {
				console.log(err)
			}
			if (res) {
				console.log(res)
			}
		});
		FlowRouter.go('home')

	},
	'click .back-to-login'() {
		Template.instance().state.set('login');
	},
	'click .forgot-password'() {
		Template.instance().state.set('forgot-password');
	},
	'click .regist'() {
		Template.instance().state.set('register');
	}
});

