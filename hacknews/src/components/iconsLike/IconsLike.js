import useModal from '../../utils/hooks/useModal';
import LikeModal from '../voteModal/LikeModal';
import Modal from '../modal/Modal';
import Like from '../../assets/img/like.svg';
import NoLikeModal from '../voteModal/NoLikeModal';

export default function IconsLike({ entry }) {
	const [isOpenLike, openLike, closeLike] = useModal(false);
	const [isOpenNoLike, openNoLike, closeNoLike] = useModal(false);

	return (
		<div className='cardIconLike'>
			<img
				className='cardIcon'
				id='like'
				src={Like}
				alt='like'
				value='like'
				onClick={openLike}
			/>
			<Modal isOpen={isOpenLike} closeModal={closeLike}>
				<LikeModal idEntry={entry.id} />
			</Modal>
			<img
				className='cardIcon'
				id='noLike'
				src={Like}
				alt='nolike'
				value='noLike'
				onClick={openNoLike}
			/>
			<Modal isOpen={isOpenNoLike} closeModal={closeNoLike}>
				<NoLikeModal idEntry={entry.id} />
			</Modal>
		</div>
	);
}
