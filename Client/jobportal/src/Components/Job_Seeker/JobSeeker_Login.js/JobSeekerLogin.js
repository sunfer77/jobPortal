// import React, { useContext } from 'react';
// import * as yup from 'yup';
// import { yupResolver } from '@hookform/resolvers/yup';
// import userContext from './UserContext';

// function JobSeekerLogin() {
// 	const { submitForm, userData } = useContext(userContext);
// 	const schema = yup.object().shape({
// 		userName: yup
// 			.string()
// 			.required()
// 			.min(2)
// 			.matches(/^[A-Za-z\s]+$/, 'Invalid format'),
// 		password: yup.string().required().min(8),
// 	});

// 	const { register, handleSubmit, errors } = useForm({
// 		mode: 'onTouched',
// 		resolver: yupResolver(schema),
// 	});

// 	// * Yup Form ends here

// 	return (
// 		<div className='form-container'>
// 			<form className='form' onSubmit={handleSubmit(submitForm)}>
// 				<h1>Login</h1>

// 				<input name='userName' ref={register} placeholder='user name*' />
// 				{errors.userName?.type === 'required' && <span>Required!</span>}
// 				{errors.userName?.type === 'min' && <span>too short</span>}
// 				{errors.userName?.type === 'matches' && <span>invalid format</span>}

// 				{/* +++++++++ City +++++++++++++++++++++++++++++++++++++++++++++ */}

// 				<input
// 					type='password'
// 					name='password'
// 					ref={register}
// 					placeholder='password *'
// 				/>
// 				{errors.password?.type === 'required' && <span>Required!</span>}
// 				{errors.password?.type === 'min' && <span>too short</span>}
// 				<input id='submit' type='submit' />
// 				{/* <span>{message}</span> */}
// 			</form>
// 		</div>
// 	);
// }

// export default JobSeekerLogin;
