import { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';

export default function useLog() {
	const {
		isLogged,
		setIsLogged,
		isLoginLoading,
		hasLoginError,
		token,
		idUser,
		userName,
		login,
		logout,
	} = useContext(AuthContext);

	return {
		isLogged,
		setIsLogged,
		isLoginLoading,
		hasLoginError,
		token,
		idUser,
		userName,
		login,
		logout,
	};
}
