import axios from 'axios';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import EditPassModal from '../../components/editPass/EditPassModal';
import Modal from '../../components/modal/Modal';
import useLog from '../../utils/hooks/useLog';
import useModal from '../../utils/hooks/useModal';

export default function EditUser() {
	const [name, setName] = useState('');
	const [surnames, setSurnames] = useState('');
	const [country, setCountry] = useState('');
	const [address, setAddress] = useState('');
	const [cp, setCp] = useState('');
	const [userName, setUserName] = useState('');
	const [email, setEmail] = useState('');
	const [bio, setBio] = useState('');
	const { token, idUser } = useLog();
	const [isOpenPass, openModalPass, closeModalPass] = useModal(false);

	function onSubmitChanges(e) {
		e.preventDefault();

		const performChanges = async () => {
			const res = await axios(`http://localhost:4000/users/${idUser}`, {
				method: 'PUT',
				headers: {
					Authorization: token,
				},
				data: {
					name,
					surnames,
					country,
					address,
					cp,
					userName,
					email,
					bio,
				},
			});
			console.log(res);
		};
		performChanges();
	}

	return (
		<div>
			<div className='formComponent' onSubmit={onSubmitChanges}>
				<h1 className='titleForm'> Edita tu perfil</h1>
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
								value={surnames}
								onChange={(e) => setSurnames(e.target.value)}
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
							Password
							<button
								className='button--brown'
								onClick={openModalPass}>
								Change
							</button>
							<Modal
								isOpen={isOpenPass}
								closeModal={closeModalPass}>
								<EditPassModal />
							</Modal>
						</label>
					</fieldset>
					<fieldset className='fieldsetForm'>
						<legend className='legendForm'>Biografia</legend>
						<textarea
							className='textarea'
							placeholder='Escribe aquí una breve descripción biográfica'
							value={bio}
							onChange={(e) => setBio(e.target.value)}
							rows='5'
							cols='auto'></textarea>
					</fieldset>
					<div>
						<input
							className='button--brown'
							type='submit'
							value='Save Changes'
						/>
						<Link to={`/users/${idUser}`} className='button--brown'>
							Volver
						</Link>
					</div>
				</form>
			</div>
		</div>
	);
}
