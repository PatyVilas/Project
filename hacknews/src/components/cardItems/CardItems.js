import Modal from '../modal/Modal';
import ComentModal from '../comentModal/ComentModal';
import ReportModal from '../reportModal/ReportModal';
import Coment from '../../assets/img/coments.svg';
import Share from '../../assets/img/share.svg';
import Report from '../../assets/img/report.svg';
import useModal from '../../utils/hooks/useModal';
import ShareModal from '../shareModal/ShareModal';

export default function CardItems({ entry }) {
	const [isOpenComent, openModalComent, closeModalComent] = useModal(false);
	const [isOpenShare, openModalShare, closeModalShare] = useModal(false);
	const [isOpenReport, openModalReport, closeModalReport] = useModal(false);

	return (
		<div className='cardItems'>
			<div>
				<img
					className='cardIcon'
					src={Coment}
					alt='coment'
					onClick={openModalComent}
				/>
				<Modal isOpen={isOpenComent} closeModal={closeModalComent}>
					<ComentModal idEntry={entry.id} />
				</Modal>
			</div>
			<div>
				<img
					className='cardIcon'
					src={Share}
					alt='share'
					onClick={openModalShare}
				/>
				<Modal isOpen={isOpenShare} closeModal={closeModalShare}>
					<ShareModal idEntry={entry.id} />
				</Modal>
			</div>
			<div>
				<img
					className='cardIcon'
					src={Report}
					alt='report'
					onClick={openModalReport}
				/>
				<Modal isOpen={isOpenReport} closeModal={closeModalReport}>
					<ReportModal idEntry={entry.id} />
				</Modal>
			</div>
		</div>
	);
}
