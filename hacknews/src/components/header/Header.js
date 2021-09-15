import { Link } from 'react-router-dom';
import './header.css';
import Logo from '../../assets/img/Logo.png';
import Entry from '../../assets/img/addEntry.svg';
import useLog from '../../utils/hooks/useLog';

function Header() {
	const { isLogged, logout, userName, idUser } = useLog();

	return (
		<div className='navBar'>
			<div className='navList'>
				<div>
					<Link to='/'>
						<img className='logo' src={Logo} alt='logo' />
					</Link>
				</div>

				{isLogged ? (
					<div className='navList'>
						<Link to='/newEntry'>
							<img className='addEntry' src={Entry} alt='entry' />
						</Link>
						<Link to={`/users/${idUser}`} className='button--brown'>
							{userName}
						</Link>
						<div onClick={logout} className='button--brown'>
							LogOut
						</div>
					</div>
				) : (
					<div className='navList'>
						<Link to='/registration'>
							<div className='button--brown'>SingUp</div>
						</Link>
						<Link to='/login'>
							<div className='button--brown'>SingIn</div>
						</Link>
					</div>
				)}
			</div>
		</div>
	);
}

export default Header;
