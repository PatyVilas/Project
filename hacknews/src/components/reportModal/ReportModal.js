import axios from 'axios';
import { useState } from 'react';
import { useHistory } from 'react-router';
import useLog from '../../utils/hooks/useLog';

function ReportModal({ idEntry }) {
	const [userName, setUserName] = useState('');
	const [email, setEmail] = useState('');
	const [report, setReport] = useState('');
	const [error, setError] = useState();
	const { token } = useLog();
	const history = useHistory();

	const onSubmitReport = async (e) => {
		e.preventDefault();
		setError('');
		if (!userName || !email || !report) {
			throw new Error('The field is required!!');
		}
		console.log('userName:', userName, 'email:', email, 'report:', report);

		try {
			const res = await axios(
				`http://localhost:4000/entries/${idEntry}/reports`,
				{
					method: 'POST',
					headers: {
						Authorization: token,
					},
					data: { userName, email, report },
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
		<div className='formComponent' onSubmit={onSubmitReport}>
			<form className='form'>
				<fieldset className='fieldsetForm'>
					<legend className='legendForm'>
						¿Quieres reportar esta noticia?
					</legend>
					<label>
						Nombre Usuario*{' '}
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
					<legend className='legendForm'>Incidencia</legend>
					<textarea
						className='textarea'
						placeholder='¿Porqué quieres reportar esta noticia?'
						value={report}
						onChange={(e) => setReport(e.target.value)}
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

export default ReportModal;
