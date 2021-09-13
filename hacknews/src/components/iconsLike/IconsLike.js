import useModal from '../../utils/hooks/useModal';
import LikeModal from '../voteModal/LikeModal';
import Modal from '../modal/Modal';
import Like from '../../assets/img/like.svg';
import NoLikeModal from '../voteModal/NoLikeModal';
import useLog from '../../utils/hooks/useLog';
import axios from 'axios';

export default function IconsLike({ entry }) {
	const [isOpenLike, openLike, closeLike] = useModal(false);
	const [isOpenNoLike, openNoLike, closeNoLike] = useModal(false);
	const { token, idUser } = useLog();

	const vote = async (value) => {
		try {
			const res = await axios(
				`http://localhost:4000/entries/${entry.id}/votes`,
				{
					method: 'POST',
					headers: {
						Authorization: token,
					},
					data: { idUser, vote: value },
				}
			);
			console.log(res);
			if (value === 1) {
				openLike();
			} else {
				openNoLike();
			}
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<div className='cardIconLike'>
			<img
				className='cardIcon'
				id='like'
				src={Like}
				alt='like'
				value='like'
				onClick={() => vote(1)}
			/>
			<Modal isOpen={isOpenLike} closeModal={closeLike}>
				<LikeModal />
			</Modal>
			<img
				className='cardIcon'
				id='noLike'
				src={Like}
				alt='nolike'
				value='noLike'
				onClick={() => vote(-1)}
			/>
			<Modal isOpen={isOpenNoLike} closeModal={closeNoLike}>
				<NoLikeModal />
			</Modal>
		</div>
	);
}
