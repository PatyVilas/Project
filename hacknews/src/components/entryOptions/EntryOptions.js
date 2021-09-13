import { Link } from 'react-router-dom';
import useModal from '../../utils/hooks/useModal';
import DeleteModal from '../deleteModal/DeleteModal';
import Modal from '../modal/Modal';
import Edit from '../../assets/img/edit.svg';
import Delete from '../../assets/img/delete.svg';

export default function EntryOptions({ entry }) {
	const [isOpenDelete, openModalDelete, closeModalDelete] = useModal(false);

	return (
		<div className='entryOptions'>
			<div>
				<Link to={`/editEntry/${entry.id}`}>
					<img className='optionsIcon' src={Edit} alt='edit' />
				</Link>
			</div>
			<div>
				<img
					className='optionsIcon'
					src={Delete}
					alt='delte'
					onClick={openModalDelete}
				/>
				<Modal isOpen={isOpenDelete} closeModal={closeModalDelete}>
					<DeleteModal entry={entry} closeModal={closeModalDelete} />
				</Modal>
			</div>
		</div>
	);
}
