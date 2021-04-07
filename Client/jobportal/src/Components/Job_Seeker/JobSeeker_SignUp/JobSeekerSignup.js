import React, { useState } from 'react';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import './JobSeekerSignUp.css';

function JobseekerSignUp() {
	const [message, setMessage] = useState([]);
	const submitForm = (data) => {
		axios
			.post('http://localhost:3001/jobSeeker/sign_up', data)
			.then((response) => {
				console.log(response.data);
				setMessage(response.data);
			})
			.catch((err) => {
				console.log(err.message);
			});
	};

	const schema = yup.object().shape({
		userName: yup
			.string()
			.required()
			.min(2)
			.matches(/^[A-Za-z\s]+$/, 'Invalid format'),
		email: yup.string().email().required(),
		password: yup.string().required().min(8),
	});

	const { register, handleSubmit, errors } = useForm({
		mode: 'onTouched',
		resolver: yupResolver(schema),
	});

	// * Yup Form ends here

	return (
		<div className='form-container'>
			<form className='form' onSubmit={handleSubmit(submitForm)}>
				<h1>Sign Up </h1>

				<input name='userName' ref={register} placeholder='user name*' />
				{errors.userName?.type === 'required' && <span>Required!</span>}
				{errors.userName?.type === 'min' && <span>too short</span>}
				{errors.userName?.type === 'matches' && <span>invalid format</span>}

				{/* +++++++++ City +++++++++++++++++++++++++++++++++++++++++++++ */}

				<input type='text' name='email' ref={register} placeholder='email *' />
				{errors.email?.type === 'required' && <span>Required!</span>}
				{errors.email?.type === 'min' && <span> too short</span>}
				{errors.email?.type === 'email' && <span>invalid format</span>}

				{/*++++++++++++++++++++++++++ E-mail  ++++++++++++++++++++++++++++++*/}

				<input
					type='password'
					name='password'
					ref={register}
					placeholder='password *'
				/>
				{errors.password?.type === 'required' && <span>Required!</span>}
				{errors.password?.type === 'min' && <span>too short</span>}
				<input id='submit' type='submit' />
				<span>{message}</span>
			</form>
		</div>
	);
}

export default JobseekerSignUp;
