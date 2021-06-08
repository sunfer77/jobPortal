import React, { useContext } from 'react';
import { Redirect, Link } from 'react-router-dom';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { CandidateContext } from './UserContext';
import '../form.css';

function JobSeekerLogin() {
	const { submitForm, userData } = useContext(CandidateContext);

	const schema = yup.object().shape({
		userName: yup
			.string()
			.required()
			.matches(/^[A-Za-z\s]+$/, 'Invalid format'),
		password: yup.string().required(),
	});

	const { register, handleSubmit, errors } = useForm({
		mode: 'onTouched',
		resolver: yupResolver(schema),
	});

	// * Yup Form ends here

	return (
		<div className='form-container'>
			<form className='form' onSubmit={handleSubmit(submitForm)}>
				<div className='login'>
					<h2>
						<i className='fas fa-sign-in-alt'></i>Login
					</h2>
				</div>

				<input name='userName' ref={register} placeholder='user name*' />
				{errors.userName?.type === 'required' && <span>Required!</span>}
				{errors.userName?.type === 'min' && <span>too short</span>}
				{errors.userName?.type === 'matches' && <span>invalid format</span>}

				{/* +++++++++ City +++++++++++++++++++++++++++++++++++++++++++++ */}

				<input
					type='password'
					name='password'
					ref={register}
					placeholder='password *'
				/>
				{errors.password?.type === 'required' && <span>Required!</span>}
				{errors.password?.type === 'min' && <span>too short</span>}
				<input id='submit' type='submit' />
				<span>{userData.message}</span>

				<Link to='/JobSeekerSignup'>
					<p>Stil don't have a account?</p>
				</Link>
			</form>

			{/* Redirect User to the Homepage after logged in */}
			{userData.isAuthenticated && (
				<Redirect
					to={{
						pathname: '/',
					}}
				/>
			)}
		</div>
	);
}

export default JobSeekerLogin;
