import axios from 'axios';
import { useState } from 'react';
import { useHistory } from 'react-router';

export default function ForgotPass() {
	const [email, setEmail] = useState('');
	const [error, setError] = useState('');
	const [checkEmail, setCheckEmail] = useState();
	const history = useHistory();

	const handleSubmit = async (e) => {
		e.preventDefault();
		console.log(email);
		setError('');

		if (!email) {
			throw new Error('Email is required');
		}

		try {
			const res = await axios(
				`http://localhost:4000/users/password/recover`,
				{
					method: 'PUT',
					data: email,
				}
			);
			console.log(res);
			const message = res.data.message;
			setCheckEmail(
				`The recovery code has been sent to the ${email}. Check your inbox.`
			);
			console.log(message);

			setTimeout(() => {
				history.push('/recoverPass');
			}, 5000);
		} catch (error) {
			console.error(error);
			setError(error);
		}
	};

	return (
		<div className='formComponent'>
			<form className='loginForm' onSubmit={handleSubmit}>
				{error ? <p className='error'>{error}</p> : null}
				<fieldset className='fieldsetForm'>
					<legend className='legendForm'>Forgot password?</legend>
					<p>Write your email to reset it</p>
					<label>
						Email*
						<input
							className='inputLabel'
							type='email'
							value={email}
							onChange={(e) => setEmail(e.target.value)}
							required
						/>
					</label>
					<div>
						<input
							className='button--brown'
							type='submit'
							value='Reset Password'
						/>
					</div>
				</fieldset>
				{checkEmail && <div>{checkEmail}</div>}
			</form>
		</div>
	);
}
