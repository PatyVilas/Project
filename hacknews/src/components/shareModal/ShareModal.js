import LinkedIn from '../../assets/img/linkedin (1).svg';
import Facebook from '../../assets/img/facebook (1).svg';
import Email from '../../assets/img/email.svg';
import Instagram from '../../assets/img/instagram.svg';

export default function ShareModal() {
	return (
		<div className='formComponent'>
			<form className='form'>
				<fieldset className='fieldsetForm'>
					<legend className='legendForm'>Share this entry</legend>
					<div className='modalShare'>
						<a href='https://outlook.live.com/' className='link'>
							Email
							<img
								className='shareIcon'
								src={Email}
								alt='email'
							/>
						</a>
						<a href='https://www.linkedin.com' className='link'>
							LinkedIn
							<img
								className='shareIcon'
								src={LinkedIn}
								alt='linkedin'
							/>
						</a>
						<a href='https://www.facebook.com' className='link'>
							Facebook
							<img
								className='shareIcon'
								src={Facebook}
								alt='facebook'
							/>
						</a>
						<a href='https://www.instagram.com' className='link'>
							Instagram
							<img
								className='shareIcon'
								src={Instagram}
								alt='instagram'
							/>
						</a>
					</div>
				</fieldset>
			</form>
		</div>
	);
}
