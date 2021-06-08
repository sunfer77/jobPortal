import React, { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { Redirect } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';
import { userContext } from './JobSearchProvider';
import '../About/About';
import * as yup from 'yup';

import './JobSearch.css';
import About from '../About/About';

function JobSearch() {
	const { findJobs, fireRedirect } = useContext(userContext);

	const schema = yup.object().shape({
		jobName: yup.string().required().min(2),
		city: yup.string().required().min(2),
	});

	const { register, handleSubmit, errors } = useForm({
		mode: 'onTouched',
		resolver: yupResolver(schema),
	});
	return (
		<>
			<div className='content'>
				<div>
					<h3>We help you find your Dream Job!</h3>
					<h3>
						Only at Monster. Get insights into real jobs with video job
						descriptions from hiring managers.
					</h3>
				</div>
				<div>
					<form>
						<input
							type='text'
							name='jobName'
							ref={register}
							placeholder='Keyword'
						/>
						{errors.jobName?.type === 'required' && <p>required!</p>}
						{errors.jobName?.type === 'min' && <p>minLength is 2 </p>}

						<input type='text' name='city' ref={register} placeholder='city' />
						{errors.city?.type === 'required' && <p>required</p>}
						{errors.city?.type === 'min' && <p> minLength is 2 </p>}
					</form>
				</div>
				<div>
					<button className='btn' onClick={handleSubmit(findJobs)}>
						Search
					</button>
					{fireRedirect && (
						<Redirect
							to={{
								pathname: '/ListOfJobs',
							}}
						/>
					)}
				</div>
			</div>
			<div>
				<About />
			</div>
		</>
	);
}

export default JobSearch;
