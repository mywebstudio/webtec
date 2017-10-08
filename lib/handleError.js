import toastr from 'toastr';

this.handleError = function(error, useToastr = true) {
	if (_.isObject(error.details)) {
		for (const key in error.details) {
			if (error.details.hasOwnProperty(key)) {
				error.details[key] =  error.details[key];
			}
		}
	}
	return error.error, error.details;
};
