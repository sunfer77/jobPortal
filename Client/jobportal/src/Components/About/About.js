import React from 'react';
import './About.css';

function About() {
	return (
		<div className='main-container'>
			<div className='div-one'>
				<i class='fas fa-search'></i>
				<h4>Trova il lavoro giusto per te</h4>
			</div>
			<div className='div-one'>
				<i class='far fa-building'></i>
				<h4>Aziende che si occupano di ricerca</h4>
			</div>
			<div className='div-one'>
				<i class='fas fa-euro-sign'></i>
				<h4>Confronta gli stipendi</h4>
			</div>
			<div className='div-one'>
				<i class='far fa-file'></i>
				<h4>Candidati alle offerte di lavoro</h4>
			</div>
		</div>
	);
}

export default About;
