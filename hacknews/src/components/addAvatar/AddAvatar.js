import axios from 'axios';
import { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import useLog from '../../utils/hooks/useLog';
import Add from '../../assets/img/addImg.svg';

export default function AddAvatar() {
	const { token, idUser, isLogged } = useLog();
	const [avatar, setAvatar] = useState(null);
	const history = useHistory();

	useEffect(() => {
		if (!isLogged) {
			history.push('/login');
		}
	}, [isLogged, history]);

	const handleSubmit = async (e) => {
		e.preventDefault();

		if (!avatar) return null;

		try {
			const payload = new FormData();
			payload.append('avatar', avatar);

			const res = await axios(
				`http://localhost:4000/users/${idUser}/avatar`,
				{
					method: 'POST',
					headers: {
						Authorization: token,
					},
					data: payload,
				}
			);
			console.log(res);
			setAvatar(avatar);
			if (res.status === 200) {
				history.push(`/users/${idUser}`);
			}
		} catch (error) {
			console.error(error);
			throw new Error('Error del servidor inténtalo de nuevo más tarde');
		}
	};

	return (
		<div>
			<div className='modalDiv'>
				<form className='modalform'>
					<fieldset className='fieldsetForm'>
						<legend className='legendForm'>
							Change your avatar
						</legend>
						<div className='modalIcons'>
							<label>
								<img
									className='addIcon'
									src={
										avatar
											? URL.createObjectURL(avatar)
											: Add
									}
									alt='add'
								/>
								<input
									type='file'
									accept='.jpg,.png,.wepb,.gif'
									className='photo-input'
									onChange={(e) => {
										setAvatar(e.target.files[0]);
									}}
								/>
							</label>
							{avatar ? (
								<button
									className='entryButton'
									onClick={() => setAvatar(null)}>
									Delete avatar
								</button>
							) : null}
							<input
								type='submit'
								className='entryButton'
								value='Save'
								onClick={handleSubmit}
							/>
						</div>
					</fieldset>
				</form>
			</div>
		</div>
	);
}
