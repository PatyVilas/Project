import axios from 'axios';
import { useEffect, useState } from 'react';
import './slider.css';
import SliderShow from './SliderShow';
import { Link } from 'react-router-dom';

const photoRandom = 'https://source.unsplash.com/200x100/?nature,water';

function Slider() {
	const [entries, setEntries] = useState([]);

	useEffect(() => {
		const getEntries = async () => {
			try {
				const response = await axios.get(
					'http://localhost:4000/entries?order=votes'
				);
				const entries = response.data.data;
				setEntries(entries);
				console.log(entries);
			} catch (error) {
				console.log(error);
			}
		};
		getEntries();
	}, []);

	if (!entries) return null;

	return (
		<SliderShow>
			{entries.map((entry) => (
				<div key={entry.id} className='sliderCard'>
					<Link to={`/entries/${entry.id}`}>
						<div>
							<img
								className='sliderImg'
								src={
									entry.photo
										? `http://localhost:4000/uploads/${entry.photo}`
										: photoRandom
								}
								alt='entryPhoto'
							/>
						</div>
						<div>
							<h5 className='sliderTitle'>{entry.title}</h5>
						</div>
					</Link>
				</div>
			))}
			;
		</SliderShow>
	);
}

export default Slider;
