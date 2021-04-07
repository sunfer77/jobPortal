import React from 'react';
import './About.css';
import image from './code.jpg';

function About() {
	return (
		<section>
			<div className='row'>
				<div className='left'>
					<h1 className='titleText'>
						<span>A</span>bout Us
					</h1>
					<p>
						Lorem ipsum, dolor sit amet consectetur adipisicing elit. Nihil
						alias labore quos sapiente sed, commodi est! Asperiores, minima
						sapiente magni debitis hic accusamus nihil accusantium mollitia
						aspernatur fugit rerum odio. <br />
						<br />
						Lorem ipsum dolor sit amet consectetur adipisicing elit. Unde, quas
						molestias. Rem dicta aspernatur veritatis possimus pariatur,
						ratione, quaerat necessitatibus autem tempore quae, repellat nisi
						similique dolorum omnis temporibus laboriosam. <br />
						Lorem ipsum, dolor sit amet consectetur adipisicing elit. Nihil
						alias labore quos sapiente sed, commodi est! Asperiores, minima
						sapiente magni debitis hic accusamus nihil accusantium mollitia
						aspernatur fugit rerum odio.
						<br />
						Lorem ipsum, dolor sit amet consectetur adipisicing elit. Nihil
						alias labore quos sapiente sed, commodi est! Asperiores, minima
						sapiente magni debitis hic accusamus nihil accusantium mollitia
						aspernatur fugit rerum odio.
					</p>
				</div>
				<div className='right'>
					<div className='image-container'>
						<img src={image} alt='' />
					</div>
				</div>
			</div>
		</section>
	);
}

export default About;
