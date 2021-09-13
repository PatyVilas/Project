import axios from 'axios';
import { useCallback, useState, createContext } from 'react';

export const AuthContext = createContext();

export function AuthContextProvider({ children }) {
	const existingUser = localStorage.getItem('user');
	const [isLogged, setIsLogged] = useState(Boolean(existingUser));
	const [user, setUser] = useState(
		existingUser ? JSON.parse(existingUser) : null
	);

	const [state, setState] = useState({ loading: false, error: false });

	const login = useCallback(({ email, password }) => {
		const body = { email, password };
		setState({ loading: true, error: false });

		const performLogin = async () => {
			setState({ loading: true, error: false });
			try {
				const res = await axios.post(
					'http://localhost:4000/users/login',
					body
				);
				const loggedUser = res.data.data;
				setUser(loggedUser);
				setIsLogged(true);

				localStorage.setItem('user', JSON.stringify(loggedUser));
			} catch (error) {
				console.log(error);
				setState({ loading: false, error: true });
				localStorage.removeItem('user');
			}
		};
		performLogin();
	}, []);

	const logout = useCallback(() => {
		setUser(null);
		localStorage.removeItem('user');
		setIsLogged(false);
	}, []);

	return (
		<AuthContext.Provider
			value={{
				isLogged,
				isLoginLoading: state.loading,
				hasLoginError: state.error,
				token: user?.token,
				idUser: user?.idUser,
				userName: user?.userName,
				login,
				logout,
			}}>
			{children}
		</AuthContext.Provider>
	);
}
