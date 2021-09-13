import axios from 'axios';
import { useState } from 'react';
import { useHistory } from 'react-router';

function RecoverPass() {
	let history = useHistory();
	const [recoverCode, setRecoverCode] = useState('');
	const [error, setError] = useState('');

	const handleSubmit = async (e) => {
		e.preventDefault();
		console.log(recoverCode);
		setError('');

		if (recoverCode) {
			throw new Error('RecoverCode is required!');
		}

		try {
			const response = await axios.put(
				`http://localhost:4000/users/password/recover`,
				recoverCode
			);
			console.log(response);

			await response.json();

			if (response.status === 200) {
				history.push('/resetPass');
			}
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<div className='formComponent' onSubmit={handleSubmit}>
			{error ? <p className='error'>{error}</p> : null}
			<form className='form'>
				<fieldset className='fieldsetForm'>
					<legend>Change password</legend>
					<label>
						RecoverCode*{' '}
						<input
							className='inputLabel'
							type='text'
							value={recoverCode}
							onChange={(e) => setRecoverCode(e.target.value)}
							required
						/>
					</label>
				</fieldset>
				<div>
					<input className='button--brown' type='submit' value='Ok' />
				</div>
			</form>
		</div>
	);
}

export default RecoverPass;
