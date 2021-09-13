//import { useParams } from "react-router-dom";
import './profile.css';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { getRandomImg } from '../../utils/helpers';
import useLog from '../../utils/hooks/useLog';
import { Link } from 'react-router-dom';
import useModal from '../../utils/hooks/useModal';
import Modal from '../../components/modal/Modal';
import AddAvatar from '../../components/addAvatar/AddAvatar';

const photo = `https://source.unsplash.com/200x200/?${getRandomImg()}`;
const avatar = 'https://source.unsplash.com/200x200/?people';

function Profile() {
	const [user, setUser] = useState(null);
	const { token, idUser, userName } = useLog();
	const [isOpenAdd, openModalAdd, closeModalAdd] = useModal(false);

	useEffect(() => {
		const getDataUser = async () => {
			try {
				const res = await axios(
					`http://localhost:4000/users/${idUser}`,
					{
						method: 'GET',
						headers: {
							Authorization: token,
						},
					}
				);
				const entries = res.data.data;
				console.log(entries);
				const { avatar } = res.data.data;
				setUser(entries, avatar);
			} catch (error) {
				console.error(error);
			}
		};
		getDataUser();
	}, [token, idUser]);

	if (!user) return null;

	return (
		<div>
			<div className='profileComponent'>
				<div key='idUser' className='userDiv'>
					<div className='userName'>
						<Link to='/editUser/:iduser' className='link'>
							<h1>{userName}</h1>
						</Link>
					</div>
					<div>
						<img
							className='avatar'
							src={
								user.avatar
									? `http://localhost:4000/uploads/${user.avatar}`
									: avatar
							}
							alt='avatar'
							onClick={openModalAdd}
						/>
						<Modal isOpen={isOpenAdd} closeModal={closeModalAdd}>
							<AddAvatar />
						</Modal>
					</div>
				</div>
				<div className='tableEntry'>
					{user.entries.map((entry) => (
						<div key={entry.id}>
							<div>
								<p className='entryTitle'>{entry.title}</p>
							</div>
							<Link to={`/entries/${entry.id}`}>
								<div>
									<img
										className='imgEntry'
										src={
											entry.photo
												? `http://localhost:4000/uploads/${entry.photo}`
												: photo
										}
										alt='photoEntry'
									/>
								</div>
							</Link>
						</div>
					))}
				</div>
			</div>
		</div>
	);
}

export default Profile;
