const yup = require('yup');

const schema = yup.object().shape({
	userName: yup
		.string()
		.required()
		.min(2)
		.matches(/^[A-Za-z\s]+$/, 'Invalid format'),
	email: yup.string().email().required(),
	password: yup.string().required().min(8),
});

const form_validation = () => async (req, res, next) => {
	try {
		await schema.validate(req.body);
		return next();
	} catch (error) {
		res.send(error.message);
		console.log(error);
	}
};
module.exports = form_validation;
