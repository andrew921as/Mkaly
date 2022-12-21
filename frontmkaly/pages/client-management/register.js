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
import ClientForm from '../../src/components/clientManagement/ClientForm';

import {UserContext} from '../../src/context/UserContext';
import {useRouter} from 'next/router';

const RegisterClient = () => {
	const router = useRouter();
	const {user, isUserAuthenticated} = useContext(UserContext);

	console.log(user);

	useEffect(() => {
		if (!isUserAuthenticated()) {
			// router.push('/');

			if (user.role !== 'operator') {
				router.push('/dashboard');
			}
		}
	}, [user]);

	return <ClientForm title="Client Registration" />;
};

export default RegisterClient;
