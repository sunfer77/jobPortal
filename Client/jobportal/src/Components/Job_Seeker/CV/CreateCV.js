import React, { useContext } from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import axios from 'axios';
import { CandidateContext } from '../JobSeeker_Login/UserContext';

import '../form.css';

function CreateCV() {
	const { userData } = useContext(CandidateContext);

	const submitForm = (data) => {
		axios
			.post('http://localhost:3001/jobSeeker/createCV', {
				...data,
				id: userData.id,
			})
			.then((response) => {
				console.log(response);
			});
		console.log(data);
	};

	// * Yup Form starts here
	const schema = yup.object().shape({
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
		city: yup
			.string()
			.required()
			.min(2)
			.matches(/^[A-Za-z\s]+$/, 'Invalid format'),
		region: yup.string().required().min(2),
		aboutMe: yup.string().required().min(10).max(5000),
	});

	const { register, handleSubmit, errors } = useForm({
		mode: 'onTouched',
		resolver: yupResolver(schema),
	});

	return (
		<div className='form-container'>
			<form className='form' onSubmit={handleSubmit(submitForm)}>
				<h1>Create Your CV </h1>
				{/*+++++++++First Name  +++++++++++++++++++++++++++++++++++++++++++++*/}

				<input
					type='text'
					name='firstName'
					ref={register}
					placeholder='First Name *'
				/>
				{errors.firstName?.type === 'required' && <span>Required</span>}
				{errors.firstName?.type === 'min' && (
					<span>Please minLength is 2 </span>
				)}
				{errors.firstName?.type === 'matches' && <span>invalid format</span>}

				{/*+++++++++ Last Name +++++++++++++++++++++++++++++++++++++++++++++*/}

				<input
					type='text'
					name='lastName'
					ref={register}
					placeholder='Last Name *'
				/>
				{errors.lastName?.type === 'required' && <span>Required</span>}
				{errors.lastName?.type === 'min' && <span>Last name is too short</span>}
				{errors.lastName?.type === 'matches' && <span>invalid format</span>}

				{/* +++++++++ City +++++++++++++++++++++++++++++++++++++++++++++ */}

				<input type='text' name='city' ref={register} placeholder='City *' />
				{errors.city?.type === 'required' && <span>Required</span>}
				{errors.city?.type === 'min' && <span> too short</span>}
				{errors.city?.type === 'matches' && <span>invalid format</span>}

				{/*++++++++++++++++++++++++++ region  ++++++++++++++++++++++++++++++*/}

				<input
					type='text'
					name='region'
					ref={register}
					placeholder='Region *'
				/>
				{errors.region?.type === 'required' && <span>Required</span>}

				{/*+++++++++++++++++++++++++ About Me ++++++++++++++++++++++++++++++++++++++++++*/}

				<textarea
					className='text'
					name='aboutMe'
					ref={register}
					placeholder='About you *'
				/>
				{errors.cv?.type === 'required' && <span>Required</span>}
				{errors.cv?.type === 'min' && <span>Too Short!</span>}
				<input id='submit' type='submit' />
			</form>
		</div>
	);
}

export default CreateCV;
