import axios from 'axios';
import { useState } from 'react';
import { useHistory } from 'react-router';
import useLog from '../../utils/hooks/useLog';

function ComentModal({ idEntry }) {
	const [userName, setUserName] = useState('');
	const [email, setEmail] = useState('');
	const [coment, setComent] = useState('');
	const [error, setError] = useState();
	const { token } = useLog();
	const history = useHistory();

	const onSubmitComent = async (e) => {
		e.preventDefault();
		setError('');

		if (!email || !userName || !coment) {
			throw new Error('El campo es requerido');
		}
		try {
			const res = await axios(
				`http://localhost:4000/entries/${idEntry}/coments`,
				{
					method: 'POST',
					headers: {
						Authorization: token,
					},
					data: { email, userName, coment },
				}
			);
			const data = res.config.data;
			console.log(data);
			console.log(res.status);

			history.push('/login');
		} catch (error) {
			console.log(error);
		}
		setError('');
	};

	return (
		<div className='formComponent' onSubmit={onSubmitComent}>
			<form className='form'>
				<fieldset className='fieldsetForm'>
					<legend className='legendForm'>Leave your comment</legend>
					<label>
						User Name*{' '}
						<input
							className='inputLabel'
							type='text'
							value={userName}
							onChange={(e) => setUserName(e.target.value)}
							required
						/>
					</label>
					<label>
						Email*{' '}
						<input
							className='inputLabel'
							type='email'
							value={email}
							onChange={(e) => setEmail(e.target.value)}
							required
						/>
					</label>
					<legend className='legendForm'>Coment</legend>
					<textarea
						className='textarea'
						placeholder='Escribe aquí tu comentario'
						value={coment}
						onChange={(e) => setComent(e.target.value)}
						rows='5'
						cols='10'></textarea>
				</fieldset>
				<div>
					<input
						className='button--brown'
						type='submit'
						value='Send'
					/>
				</div>
				{error && <div className='error'>{error}</div>}
			</form>
		</div>
	);
}

export default ComentModal;
