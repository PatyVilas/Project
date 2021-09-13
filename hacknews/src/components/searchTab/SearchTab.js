import { useState } from 'react';
import Search from '../../assets/img/search.svg';
import './searchTab.css';

function SearchTab({ setThemeURL, setCardURL, searchEntries }) {
	const [visible, setVisible] = useState(false);
	const open = () => setVisible(true);
	const close = () => setVisible(false);
	const [search, setSearch] = useState('');

	const themes = [
		{
			label: 'Ciencias',
			value: 'science',
		},
		{
			label: 'Cultura',
			value: 'culture',
		},
		{
			//
			label: 'Ocio',
			value: 'leisure',
		},
		{
			label: 'Política',
			value: 'political',
		},
		{
			label: 'Tecnología',
			value: 'technology',
		},
		{
			label: 'Deportes',
			value: 'sports',
		},
	];

	return (
		<div className='searchTab'>
			<div className='searchItems'>
				<div>
					<img
						className={`imgSearch ${visible && 'visible'}`}
						src={Search}
						alt='search'
						onClick={open}
					/>
					<div className={`divSearch ${visible && 'visible'}`}>
						<input
							type='search'
							value={search}
							className='inputLabel'
							onChange={(e) => setSearch(e.target.value)}
						/>
						<input
							type='submit'
							value='↪️'
							onClick={() => searchEntries(search)}
							className='closeSearch'
						/>
						<button className='closeSearch' onClick={close}>
							X
						</button>
					</div>
				</div>
				<div className='searchButton'>
					<div
						className='button--beig'
						onClick={() => {
							setCardURL(
								'http://localhost:4000/entries/?order=createdAt'
							);
						}}>
						News
					</div>
					<div
						className='button--beig'
						onClick={() => {
							setCardURL('http://localhost:4000/entries/');
						}}>
						+Voted
					</div>
				</div>
				<div>
					<select
						id='temas'
						name='temas'
						onChange={(e) =>
							setThemeURL(
								`http://localhost:4000/entries?search=${e.target.value}`
							)
						}>
						<option>Choose theme</option>
						{themes.map((themes) => (
							<option key={themes.value} value={themes.value}>
								{themes.label}
							</option>
						))}
					</select>
				</div>
			</div>
		</div>
	);
}

export default SearchTab;
