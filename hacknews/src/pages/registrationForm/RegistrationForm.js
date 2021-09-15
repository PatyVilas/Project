import axios from 'axios';
import { useState } from 'react';
import { Link } from 'react-router-dom';

function RegistrationForm() {
	const [name, setName] = useState('');
	const [lastName, setLastName] = useState('');
	const [country, setCountry] = useState('');
	const [address, setAddress] = useState('');
	const [cp, setCp] = useState('');
	const [userName, setUserName] = useState('');
	const [email, setEmail] = useState('');
	const [repEmail, setRepEmail] = useState('');
	const [password, setPassword] = useState('');
	const [repPassword, setRepPassword] = useState('');
	const [bio, setBio] = useState('');
	const [error, setError] = useState();
	const [checkEmail, setCheckEmail] = useState();

	function onSubmitRegistration(e) {
		e.preventDefault();

		if (!userName || !email || !repEmail || !password || !repPassword) {
			throw new Error('The fields are required');
		}
		if (email !== repEmail) {
			throw new Error('Passwords must match');
		}
		if (password !== repPassword) {
			throw new Error('Passwords must match');
		}

		if (error) {
			setError(error);
		}

		async function perfomRegistration() {
			try {
				const body = {
					name,
					lastName,
					country,
					address,
					cp,
					userName,
					email,
					repEmail,
					password,
					repPassword,
					bio,
				};

				const res = await axios.post(
					'http://localhost:4000/users',
					body
				);
				const data = res.config.data;
				console.log(data);

				setCheckEmail(
					`Validate your account at the email address: ${email}`
				);
			} catch (error) {
				console.error(error);
			}
		}
		perfomRegistration();
		setError('');
		setName('');
		setLastName('');
		setCountry('');
		setAddress('');
		setCp('');
		setUserName('');
		setEmail('');
		setRepEmail('');
		setPassword('');
		setRepPassword('');
		setBio('');
	}

	return (
		<div>
			<div className='formComponent' onSubmit={onSubmitRegistration}>
				<h1 className='titleForm'> Formulario de Registro</h1>
				<form className='form'>
					<fieldset className='fieldsetForm'>
						<legend className='legendForm'>Datos personales</legend>
						<label>
							Nombre{' '}
							<input
								className='inputLabel'
								type='text'
								value={name}
								onChange={(e) => setName(e.target.value)}
							/>
						</label>
						<label>
							Apellidos{' '}
							<input
								className='inputLabel'
								type='text'
								value={lastName}
								onChange={(e) => setLastName(e.target.value)}
							/>
						</label>
						<label>
							País{' '}
							<input
								className='inputLabel'
								type='text'
								value={country}
								onChange={(e) => setCountry(e.target.value)}
							/>
						</label>
						<label>
							Dirección{' '}
							<input
								className='inputLabel'
								type='text'
								value={address}
								onChange={(e) => setAddress(e.target.value)}
							/>
						</label>
						<label>
							Código Postal{' '}
							<input
								className='inputLabel'
								type='text'
								value={cp}
								onChange={(e) => setCp(e.target.value)}
							/>
						</label>
					</fieldset>
					<fieldset className='fieldsetForm'>
						<legend className='legendForm'>Datos de Usuario</legend>
						<label>
							Nombre de Usuario*{' '}
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
						<label>
							Repetir Email*{' '}
							<input
								className='inputLabel'
								type='email'
								value={repEmail}
								onChange={(e) => setRepEmail(e.target.value)}
								required
							/>
						</label>
						<label>
							Contraseña*{' '}
							<input
								className='inputLabel'
								type='password'
								value={password}
								onChange={(e) => setPassword(e.target.value)}
								required
							/>
						</label>
						<label>
							Repetir Contraseña*{' '}
							<input
								className='inputLabel'
								type='password'
								value={repPassword}
								onChange={(e) => setRepPassword(e.target.value)}
								required
							/>
						</label>
					</fieldset>
					<fieldset className='fieldsetForm'>
						<legend className='legendForm'>Biografia</legend>
						<textarea
							className='textarea'
							placeholder='Escribe aquí una breve descripción biográfica'
							value={bio}
							onChange={(e) => setBio(e.target.value)}
							rows=''
							cols='auto'></textarea>
					</fieldset>
					<div>
						<input
							className='button--brown'
							type='submit'
							value='Register'
						/>
						<Link to='/login' className='button--brown'>
							Login
						</Link>
					</div>
					{checkEmail && <div>{checkEmail}</div>}
					{error && <div className='error'>{error}</div>}
				</form>
			</div>
		</div>
	);
}

export default RegistrationForm;


