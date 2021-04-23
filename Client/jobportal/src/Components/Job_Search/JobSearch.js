import React, { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { Redirect } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';
import { userContext } from './JobSearchProvider';
import * as yup from 'yup';
import About from '../About_Component/About';

import './JobSearch.css';

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
			<section className='main'>
				<div className='content'>
					<h2>
						<span>W</span>e help you find your Dream Job!
					</h2>
					<h3>
						Introducing video job descriptions. Only at Monster. Get insights
						into real jobs with video job descriptions from hiring managers.
					</h3>
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
			</section>
			<About />
		</>
	);
}

export default JobSearch;
