import './newEntry.css';
import Post from '../../assets/img/add.svg';
import Add from '../../assets/img//addImg.svg';
import { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import useLog from '../../utils/hooks/useLog';
import axios from 'axios';

function NewEntry() {
	const history = useHistory();
	const { token, isLogged } = useLog();

	useEffect(() => {
		if (!isLogged) {
			history.push('/login');
		}
	}, [isLogged, history]);

	const [photo1, setPhoto1] = useState(null);
	const [photo2, setPhoto2] = useState(null);
	const [photo3, setPhoto3] = useState(null);
	const [theme, setTheme] = useState('');
	const [place, setPlace] = useState('');
	const [title, setTitle] = useState('');
	const [lead, seatLead] = useState('');
	const [description, setDescription] = useState('');
	const [error, setError] = useState('');

	const handleSubmit = async (e) => {
		try {
			e.preventDefault();
			setError('');

			if (!theme || !place || !title || !lead || !description) {
				throw new Error('Todos los campos son Obligatorios');
			}

			try {
				const response = await axios('http://localhost:4000/entries', {
					method: 'POST',
					headers: {
						Authorization: token,
					},
					data: {
						theme,
						place,
						title,
						lead,
						description,
					},
				});

				const { id } = response.data.data;
				const idEntry = id;

				const photos = [photo1, photo2, photo3].filter(
					(photo) => photo !== null
				);

				for (const photo of photos) {
					const payload = new FormData();
					payload.append('photo', photo);

					await axios(
						`http://localhost:4000/entries/${idEntry}/photos`,
						{
							method: 'POST',
							headers: {
								Authorization: token,
							},
							data: payload,
						}
					);
				}

				history.push(`/entries/${idEntry}`);
			} catch (error) {
				console.error(error);
				throw new Error(
					'Error del servidor inténtalo de nuevo más tarde'
				);
			}
		} catch (error) {
			setError(error.message);
		}
	};

	return (
		<div>
			<div className='entryComponent'>
				{error ? <p className='error'>{error}</p> : null}
				<div className='entryCard'>
					<div className='photo-list'>
						<div>
							<label>
								<img
									className='addIcon'
									src={
										photo1
											? URL.createObjectURL(photo1)
											: Add
									}
									alt='add'
								/>
								<input
									type='file'
									accept='.jpg,.png,.wepb,.gif'
									className='photo-input'
									onChange={(e) => {
										setPhoto1(e.target.files[0]);
									}}
								/>
							</label>
							{photo1 ? (
								<button
									className='entryButton'
									onClick={() => setPhoto1(null)}>
									Delete
								</button>
							) : null}
						</div>
						<div>
							<label>
								<img
									className='addIcon'
									src={
										photo2
											? URL.createObjectURL(photo2)
											: Add
									}
									alt='add'
								/>
								<input
									type='file'
									accept='.jpg,.png,.wepb,.gif'
									className='photo-input'
									onChange={(e) => {
										setPhoto2(e.target.files[0]);
									}}
								/>
							</label>
							{photo2 ? (
								<button
									className='entryButton'
									onClick={() => setPhoto2(null)}>
									Delete
								</button>
							) : null}
						</div>
						<div>
							<label>
								<img
									className='addIcon'
									src={
										photo3
											? URL.createObjectURL(photo3)
											: Add
									}
									alt='add'
								/>
								<input
									type='file'
									accept='.jpg,.png,.wepb,.gif'
									className='photo-input'
									onChange={(e) => {
										setPhoto3(e.target.files[0]);
									}}
								/>
							</label>
							{photo3 ? (
								<button
									className='entryButton'
									onClick={() => setPhoto3(null)}>
									Delete
								</button>
							) : null}
						</div>
					</div>

					<div>
						<form className='form'>
							<fieldset className='fieldsetForm'>
								<legend className='legendForm'>Noticia</legend>
								<label>
									Tema
									<select
										className='selecThem'
										name='temas'
										value={theme}
										onChange={(e) =>
											setTheme(e.target.value)
										}>
										<option>Escoge tema...</option>
										<option value='science'>
											Ciencias
										</option>
										<option value='culture'>Cultura</option>
										<option value='leisure'>Ocio</option>
										<option value='political'>
											Política
										</option>
										<option value='technology'>
											Tecnología
										</option>
										<option value='sports'>Deportes</option>
									</select>
								</label>
								<label className='entryLabel'>
									{' '}
									Lugar
									<textarea
										className='textarea'
										placeholder='Lugar'
										rows='1'
										cols='auto'
										value={place}
										onChange={(e) =>
											setPlace(e.target.value)
										}></textarea>
								</label>
								<label className='entryLabel'>
									{' '}
									Título
									<textarea
										className='textarea'
										placeholder='Escribe un título'
										rows='2'
										cols='auto'
										value={title}
										onChange={(e) =>
											setTitle(e.target.value)
										}></textarea>
								</label>
								<label className='entryLabel'>
									{' '}
									Entradilla
									<textarea
										className='textarea'
										placeholder='Escribe la entradilla de la noticia'
										rows='auto'
										cols='auto'
										value={lead}
										onChange={(e) =>
											seatLead(e.target.value)
										}></textarea>
								</label>
								<label className='entryLabel'>
									{' '}
									Noticia
									<textarea
										className='textarea'
										placeholder='Escribe la descripción de la noticia'
										rows='auto'
										cols='auto'
										value={description}
										onChange={(e) =>
											setDescription(e.target.value)
										}></textarea>
								</label>
							</fieldset>
							<div className='entryDiv'>
								<div>
									<img
										className='entryIcon'
										src={Post}
										alt='post'
									/>
									<input
										type='submit'
										className='entryButton'
										value='Post'
										onClick={handleSubmit}
									/>
								</div>
								<div>
									<Link to='/' className='entryButton'>
										Back
									</Link>
								</div>
							</div>
						</form>
					</div>
				</div>
			</div>
		</div>
	);
}

export default NewEntry;
