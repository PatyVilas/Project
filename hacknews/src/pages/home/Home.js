import axios from 'axios';
import { useEffect, useState } from 'react';
import { Slider, SearchTab, Card, ThemesList } from '../../components';

function Home() {
	const [entries, setEntries] = useState([]);
	const [cardLoading, setCardLoading] = useState(true);
	const [themeEntries, setThemeEntries] = useState([]);
	const [themeLoading, setThemeLoading] = useState(true);
	const [cardURL, setCardURL] = useState(
		'http://localhost:4000/entries/?order=createdAt'
	);

	const [themeURL, setThemeURL] = useState('http://localhost:4000/entries');

	useEffect(() => {
		setCardLoading(true);
		const getEntries = async () => {
			try {
				const response = await axios.get(cardURL);
				const entries = response.data.data;
				setEntries(entries);
				setCardLoading(false);
			} catch (error) {
				console.log(error);
			}
		};
		getEntries();
	}, [cardURL]);

	useEffect(() => {
		setThemeLoading(true);
		const getEntries = async () => {
			try {
				const response = await axios.get(themeURL);
				const entries = response.data.data;
				setThemeEntries(entries);
				console.log(entries);
				setThemeLoading(false);
			} catch (error) {
				console.log(error);
			}
		};
		getEntries();
	}, [themeURL]);

	const searchEntries = async (term) => {
		setCardLoading(true);

		try {
			const response = await axios.get(
				`http://localhost:4000/entries?search=${term}`
			);
			console.log(response);
			const entries = response.data.data;
			setEntries(entries);
			setCardLoading(false);
		} catch (error) {
			console.error(error);
		}
	};

	return (
		<div className='App'>
			<Slider></Slider>
			<SearchTab
				setCardURL={setCardURL}
				setThemeURL={setThemeURL}
				searchEntries={searchEntries}></SearchTab>
			<div className='page'>
				<Card entries={entries} loading={cardLoading}></Card>
				<ThemesList
					entries={themeEntries}
					loading={themeLoading}></ThemesList>
			</div>
		</div>
	);
}

export default Home;
