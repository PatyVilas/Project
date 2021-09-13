import axios from 'axios';
import './readEntry.css';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router';
import CardItems from '../../components/cardItems/CardItems';
import IconsLike from '../../components/iconsLike/IconsLike';
import useLog from '../../utils/hooks/useLog';
import { photoRandom } from '../../utils/helpers';
import EntryOptions from '../../components/entryOptions/EntryOptions';

function ReadEntry() {
	const [entry, setEntry] = useState();
	const { idEntry } = useParams();
	const { isLogged } = useLog();

	useEffect(() => {
		const getEntry = async () => {
			try {
				const response = await axios.get(
					`http://localhost:4000/entries/${idEntry}`
				);
				const entry = response.data.data;
				setEntry(entry);
				console.log(entry);
			} catch (error) {
				console.log(error);
			}
		};
		getEntry();
	}, [idEntry]);

	if (!entry) return null;

	return (
		<div className='readComponent'>
			{isLogged ? (
				<div className='readCard'>
					<h1 className='readTitle'>{entry.title}</h1>
					<h3 className='readLead'>{entry.lead}</h3>
					<IconsLike entry={entry} />
					{entry.photos.map((photo) => (
						<img
							key={photo.id}
							className='readPhoto'
							src={
								photo.photo
									? `http://localhost:4000/uploads/${photo.photo}`
									: photoRandom
							}
							alt='entryPhoto'
						/>
					))}
					<EntryOptions entry={entry} />
					<div>
						<p className='readInfo'>{entry.theme}</p>
						<p className='readInfo'>{entry.place}</p>
						<p className='readInfo'>{entry.description}</p>
					</div>
					<CardItems entry={entry} />
				</div>
			) : (
				<div className='readCard'>
					<h1>{entry.title}</h1>
					<h3>{entry.lead}</h3>

					{entry.photos.map((photo) => (
						<img
							key={photo.id}
							className='readPhoto'
							src={`http://localhost:4000/uploads/${photo.photo}`}
							alt='entryPhoto'
						/>
					))}
					<p>{entry.them}</p>
					<p>{entry.place}</p>
					<p>{entry.description}</p>
				</div>
			)}
		</div>
	);
}

export default ReadEntry;
