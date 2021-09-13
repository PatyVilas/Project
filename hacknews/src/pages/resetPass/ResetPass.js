import axios from 'axios';
import { useState } from 'react';
import { useParams } from 'react-router';

export default function ResetPass() {
	const [password, setPassword] = useState('');
	const [repPassword, setRpePassword] = useState('');
	const [error, setError] = useState();
	const recoverCode = useParams();

	const handleSubmit = async (e) => {
		e.preventDefault();
		console.log(password, repPassword, recoverCode);
		setError('');

		if (password !== repPassword) {
			throw new Error('Passwords must match!!');
		}

		try {
			const res = await axios(
				`http://localhost:4000/users/password/reset`,
				{
					method: 'PUT',
					data: {
						password,
					},
				}
			);
			console.log(res);
		} catch (error) {
			console.error(error);
			setError(error);
		}
	};

	return (
		<div className='formComponent' onSubmit={handleSubmit}>
			{error ? <p className='error'>{error}</p> : null}
			<form className='form'>
				<fieldset className='fieldsetForm'>
					<legend>Change password</legend>
					<label>
						New Password*{' '}
						<input
							className='inputLabel'
							type='password'
							value={password}
							onChange={(e) => setPassword(e.target.value)}
							required
						/>
					</label>
					<label>
						Repeat Password*{' '}
						<input
							className='inputLabel'
							type='password'
							value={repPassword}
							onChange={(e) => setRpePassword(e.target.value)}
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
