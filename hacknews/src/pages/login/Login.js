import { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import ForgotPass from '../../components/forgotPass/ForgotPass';
import Modal from '../../components/modal/Modal';
import useLog from '../../utils/hooks/useLog';
import useModal from '../../utils/hooks/useModal';
import './login.css';

export default function Login() {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [isOpenForgot, openModalForgot, closeModalForgot] = useModal();
	const { login, isLoginLoading, hasLoginError, isLogged } = useLog();
	let history = useHistory();

	useEffect(() => {
		if (isLogged) {
			console.log('logueado');
			history.push('/');
		}
	}, [isLogged, history]);

	const handleSubmit = (e) => {
		console.log('submit form');
		e.preventDefault();
		login({ email, password });
	};

	return (
		<div>
			{isLoginLoading && <strong>Checking credentials...</strong>}
			{!isLoginLoading && (
				<form className='loginForm' onSubmit={handleSubmit}>
					<fieldset className='fieldsetForm'>
						<legend className='legendForm'>Login</legend>
						<p>Login to access as a registered user</p>
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
						<label>
							Password*
							<input
								className='inputLabel'
								type='password'
								value={password}
								onChange={(e) => setPassword(e.target.value)}
								required
							/>
						</label>
						<div>
							<input
								className='button--brown'
								type='submit'
								value='Login'
							/>
							<p className='link' onClick={openModalForgot}>
								Forgot password?
							</p>
						</div>
						<p>
							Don't have an account? click
							<Link to='/registration'> here </Link>
							to register.
						</p>
					</fieldset>
				</form>
			)}
			<Modal isOpen={isOpenForgot} closeModal={closeModalForgot}>
				<ForgotPass />
			</Modal>
			{hasLoginError && <p className='error'>Credential are invalid</p>}
		</div>
	);
}
