import React, {useContext, useState, useEffect} from 'react';
import {
	Box,
	Container,
	Grid,
	Stack,
	TextField,
	FormControl,
	InputLabel,
	InputAdornment,
	OutlinedInput,
	IconButton,
	Autocomplete,
	MenuItem,
	Select,
	Button,
} from '@mui/material';
import {UserForm} from '../../src/components';

import {UserContext} from '../../src/context/UserContext';
import {useRouter} from 'next/router';

const RegisterUser = () => {
	const router = useRouter();
	const {user, isUserAuthenticated} = useContext(UserContext);

	useEffect(() => {
		if (!isUserAuthenticated()) {
			router.push('/');
		} else if (user.role != 'admin') {
			router.push('/dashboard');
		}
	}, [user]);

	return <UserForm title="User Registration" />;
};

export default RegisterUser;
