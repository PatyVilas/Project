import './card.css';
import { photoRandom } from '../../utils/helpers';
import { Link } from 'react-router-dom';
import CardItems from '../cardItems/CardItems';
import IconsLike from '../iconsLike/IconsLike';
import { Loading } from '../Loading';
import useLog from '../../utils/hooks/useLog';

function Card({ entries, loading }) {
	const { idUser } = useLog();
	if (loading) return <Loading />;
	if (!entries) return null;

	console.log(entries);

	return (
		<div className='cardList'>
			<h1>Noticias</h1>
			{entries.map((entry) => (
				<div key={entry.id}>
					{entry.idUser !== idUser ? (
						<IconsLike entry={entry} />
					) : null}
					<div className='cardEntry'>
						<Link to={`/entries/${entry.id}`}>
							<div>
								<div className='cardDescription'>
									<h3 className='cardTitle'>{entry.title}</h3>
									<p className='cardLead'>{entry.lead}</p>
								</div>
								<div>
									<img
										className='cardPhoto'
										src={
											entry.photo
												? `http://localhost:4000/uploads/${entry.photo}`
												: photoRandom
										}
										alt='entryPhoto'
									/>
								</div>
							</div>
						</Link>
					</div>
					<CardItems entry={entry} />
				</div>
			))}
		</div>
	);
}

export default Card;
