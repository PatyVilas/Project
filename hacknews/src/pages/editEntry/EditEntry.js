import { useEffect, useState } from 'react';
import useLog from '../../utils/hooks/useLog';
import Add from '../../assets/img//addImg.svg';
import axios from 'axios';
import { useHistory, useParams } from 'react-router';
import { Link } from 'react-router-dom';
import Post from '../../assets/img/add.svg';

function EditEntry() {
	const { token, isLogged } = useLog();
	const { idEntry, idUser } = useParams();
	const history = useHistory();
	const [photo1, setPhoto1] = useState(null);
	const [photo2, setPhoto2] = useState(null);
	const [photo3, setPhoto3] = useState(null);
	const [them, setThem] = useState('');
	const [place, setPlace] = useState('');
	const [title, setTitle] = useState('');
	const [lead, seatLead] = useState('');
	const [description, setDescription] = useState('');
	const [error, setError] = useState();

	useEffect(() => {
		if (!isLogged) {
			history.push('/login');
		}
	}, [isLogged, history]);

	const handleSubmit = async (e) => {
		try {
			e.preventDefault();
			setError('');

			//enviar los datos de la entrada

			try {
				const response = await axios(
					`http://localhost:4000/entries/${idEntry}`,
					{
						method: 'PUT',
						headers: {
							Authorization: token,
						},
						data: {
							them,
							place,
							title,
							lead,
							description,
						},
					}
				);

				// y recoger el id con el que fue creada
				const { id } = response.data.data;

				// creamos el array de fotos manualmente que queremos subir y descarto los nulos
				const photos = [photo1, photo2, photo3].filter(
					(photo) => photo !== null
				);

				for (const photo of photos) {
					const payload = new FormData();
					payload.append('photo', photo);

					await axios(`http://localhost:4000/entries/${id}/photos`, {
						method: 'POST',
						headers: {
							Authorization: token,
						},
						data: payload,
					});
				}

				history.push(`/users/${idUser}`);
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
									Delete photo
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
									Delete photo
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
									Delete photo
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
										value={them}
										onChange={(e) =>
											setThem(e.target.value)
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
									<Link
										to={`entries/${idEntry}`}
										className='entryButton'>
										Volver
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
