import { useEffect, useState } from 'react';
import useLog from '../../utils/hooks/useLog';
import Add from '../../assets/img/addImg.svg';
import axios from 'axios';
import { useHistory, useParams } from 'react-router';
import { Link } from 'react-router-dom';
import Post from '../../assets/img/add.svg';

function EditEntry() {
	const { token, isLogged } = useLog();
	const { idEntry } = useParams();
	const history = useHistory();

	const [currentPhoto1, setCurrentPhoto1] = useState(null);
	const [currentPhoto2, setCurrentPhoto2] = useState(null);
	const [currentPhoto3, setCurrentPhoto3] = useState(null);

	const [photo1, setPhoto1] = useState(null);
	const [photo2, setPhoto2] = useState(null);
	const [photo3, setPhoto3] = useState(null);
	const [place, setPlace] = useState('');
	const [title, setTitle] = useState('');
	const [lead, seatLead] = useState('');
	const [theme, setTheme] = useState('');
	const [description, setDescription] = useState('');
	const [error, setError] = useState();

	useEffect(() => {
		if (!isLogged) {
			history.push('/login');
		}
	}, [isLogged, history]);

	useEffect(() => {
		const getEntry = async () => {
			try {
				const response = await axios.get(
					`http://localhost:4000/entries/${idEntry}`
				);
				const entry = response.data.data;
				setTheme(entry.theme);
				setPlace(entry.place);
				seatLead(entry.lead);
				setDescription(entry.description);
				setTitle(entry.title);

				if (entry.photos[0]) setCurrentPhoto1(entry.photos[0]);
				if (entry.photos[1]) setCurrentPhoto2(entry.photos[1]);
				if (entry.photos[2]) setCurrentPhoto3(entry.photos[2]);
			} catch (error) {
				console.log(error);
			}
		};
		getEntry();
	}, [idEntry]);

	const handleSubmit = async (e) => {
		try {
			e.preventDefault();
			setError('');

			try {
				await axios(`http://localhost:4000/entries/${idEntry}`, {
					method: 'PUT',
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

				const payload = new FormData();
				if (photo1) {
					if (currentPhoto1) {
						await axios(
							`http://localhost:4000/entries/${idEntry}/photo/${currentPhoto1.id}`,
							{
								method: 'DELETE',
								headers: {
									Authorization: token,
								},
							}
						);
					}
					payload.append('photo', photo1);

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

				if (photo2) {
					if (currentPhoto2) {
						await axios(
							`http://localhost:4000/entries/${idEntry}/photo/${currentPhoto2.id}`,
							{
								method: 'DELETE',
								headers: {
									Authorization: token,
								},
							}
						);
					}
					payload.append('photo', photo2);

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

				if (photo3) {
					if (currentPhoto3) {
						await axios(
							`http://localhost:4000/entries/${idEntry}/photo/${currentPhoto3.id}`,
							{
								method: 'DELETE',
								headers: {
									Authorization: token,
								},
							}
						);
					}
					payload.append('photo', photo3);

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
				<div className='entryCard'>
					<div className='photo-list'>
						<div>
							{currentPhoto1 ? (
								<img
									src={`http://localhost:4000/uploads/${currentPhoto1.photo}`}
									alt='Foto actual 1'
									className='photoEntry'
								/>
							) : null}
							<label>
								<img
									className={
										photo1 ? 'photoEntry' : 'addIcon'
									}
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
							{currentPhoto2 ? (
								<img
									src={`http://localhost:4000/uploads/${currentPhoto2.photo}`}
									alt='Foto actual 2'
									className='photoEntry'
								/>
							) : null}
							<label>
								<img
									className={
										photo2 ? 'photoEntry' : 'addIcon'
									}
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
							{currentPhoto3 ? (
								<img
									src={`http://localhost:4000/uploads/${currentPhoto3.photo}`}
									alt='Foto actual 3'
									className='photoEntry'
								/>
							) : null}
							<label>
								<img
									className={
										photo3 ? 'photoEntry' : 'addIcon'
									}
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
								{error ? (
									<p className='error'>{error}</p>
								) : null}
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
									<Link
										to={`/entries/${idEntry}`}
										className='entryButton'>
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

export default EditEntry;
