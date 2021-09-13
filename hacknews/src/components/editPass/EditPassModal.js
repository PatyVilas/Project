import axios from 'axios';
import { useState } from 'react';
import useLog from '../../utils/hooks/useLog';

export default function EditPassModal() {
	const { token, idUser } = useLog();
	const [password, setPassword] = useState('');
	const [repPassword, setRpePassword] = useState('');

	function onSubmitChangePass(e) {
		e.preventDefault();
		console.log(password, repPassword);

		const changePass = async () => {
			const res = await axios(
				`http://localhost:4000/users/${idUser}/password`,
				{
					method: 'PUT',
					headers: {
						Authorization: token,
					},
					data: {
						password,
						repPassword,
					},
				}
			);
			console.log(res);
		};
		changePass();
	}

	return (
		<div className='formComponent' onSubmit={onSubmitChangePass}>
			<form className='form'>
				<fieldset className='fieldsetForm'>
					<legend>Change password</legend>
					<label>
						Password*{' '}
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
