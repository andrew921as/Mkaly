import {createContext, useState} from 'react';
import {loginRequest} from '../functions/requests';

export const initialUserState = {
	name: '',
	email: '',
	password: '',
	role: '',
	id: '',
};

export const UserContext = createContext({});
const {Provider} = UserContext;

// export const UserInitialState = () => {
// 	const [user, setUser] = useState(null);
// 	return {
// 		user,
// 		setUser,
// 	};
// };

export const UserProvider = ({children}) => {
	const [user, setUser] = useState(initialUserState);

	// const setUserAuthInfo = ({data}) => {
	// 	const token = localStorage.setItem('token', data.data);

	// 	setAuthState({
	// 		token,
	// 	});
	// };

	// checks if the user is authenticated or not
	const isUserAuthenticated = () => {
		if (!user.id) {
			return false;
		} else {
			return true;
		}
	};

	const login = async (username, password) => {
		// Some backend functions
		const {data} = await loginRequest(username, password);

		if (data.ok) {
			setUser(data.user);
			localStorage.setItem('user', JSON.stringify(data.user));
			return data;
		} else {
			return data;
		}

		// setUser({...initialUserState, email, password});
	};

	const initiateUser = async (initialUser) => {
		localStorage.setItem('user', JSON.stringify(initialUser));
		setUser(initialUser);
		return;
	};

	const logout = () => {
		localStorage.removeItem('user');
		setUser(initialUserState);
	};

	return (
		<Provider
			value={{
				user,
				initiateUser,
				isUserAuthenticated,
				logout,
				login,
			}}
		>
			{children}
		</Provider>
	);
};
