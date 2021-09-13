import './notFound.css';
import Plug from '../../assets/img/european-plug.png';
import Four from '../../assets/img/4.svg';
import Zero from '../../assets/img/forbidden.svg';
import { useHistory } from 'react-router';

export default function NotFound() {
	const history = useHistory();
	setTimeout(() => {
		history.push('/');
	}, 3000);

	return (
		<div className='notFoundComponent'>
			<div className='numDiv'>
				<img src={Four} alt='four' className='numImg' />
				<img src={Zero} alt='zero' className='numImg' />
				<img src={Four} alt='four' className='numImg' />
			</div>
			<h2>Opps!! Page Not Found</h2>
			<div>
				<img src={Plug} alt='plug' className='plugImg' />
			</div>
		</div>
	);
}
