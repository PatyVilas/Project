import axios from 'axios';
import { useEffect } from 'react';
import { useHistory, useLocation } from 'react-router';

function ValidateUser() {
	const query = new URLSearchParams(useLocation().search);
	let history = useHistory();

	const validateCode = query.get('registrationCode');

	useEffect(() => {
		async function performValidateUaser() {
			try {
				const response = await axios.get(
					'http://localhost:4000/users/validate/:registrationCode',
					validateCode
				);
				console.log(response);

				await response.json();

				if (response.status === 200) {
					history.push('users/login');
				}
			} catch (error) {
				console.log(error);
			}
		}
		performValidateUaser();
	}, [validateCode, history]);

	return <div>Activando usuario...</div>;
}

export default ValidateUser;
