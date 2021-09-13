import { Loading } from '../Loading';
import './themesList.css';

const photoRandom = 'https://source.unsplash.com/800x400/?food';

function ThemsList({ entries, loading }) {
	if (loading) return <Loading />;

	if (!entries) return null;

	return (
		<div className='themList'>
			{entries.map((entry) => (
				<div key={entry.id}>
					<div className='themCard'>
						<h3 className='them'>{entry.theme}</h3>
						{/* <Link to={entry.id}></Link> */}
						<img
							className='themPhoto'
							src={
								entry.photo
									? `http://localhost:4000/uploads/${entry.photo}`
									: photoRandom
							}
							alt='entryPhoto'
						/>
						<p className='themTitle'>{entry.title}</p>
					</div>
				</div>
			))}
			;
		</div>
	);
}

export default ThemsList;
