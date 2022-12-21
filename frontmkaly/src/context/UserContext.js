import {createContext, useState} from 'react';

export const initialUserState = {
	name: '',
	email: '',
	password: '',
	rol: '',
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

	const login = (email, password) => {
		// Some backend functions

		setUser({...initialUserState, email, password});
	};

	const logout = () => {
		setUser(initialUserState);
	};

	return (
		<Provider
			value={{
				user,
				setUser,
				isUserAuthenticated,
				logout,
				login,
			}}
		>
			{children}
		</Provider>
	);
};
