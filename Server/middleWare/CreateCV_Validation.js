const yup = require('yup');

const schema = yup.object().shape({
	userName: yup.string().required().min(2),
	firstName: yup
		.string()
		.required()
		.min(2)
		.matches(/^[A-Za-z\s]+$/, 'Invalid format'),
	lastName: yup
		.string()
		.required()
		.min(2)
		.matches(/^[A-Za-z\s]+$/, 'Invalid format'),
	city: yup.string().required().min(2),
	region: yup.string().required().min(2),
	aboutMe: yup.string().required().min(40),
});

const CV_validation = () => async (req, res, next) => {
	try {
		await schema.validate(req.body);
		return next();
	} catch (error) {
		res.send(error.message);
		console.log(error);
	}
};
module.exports = CV_validation;
