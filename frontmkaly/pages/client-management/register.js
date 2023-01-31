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

import en from '../../public/languages/en';
import es from '../../public/languages/es';

const RegisterClient = () => {
	const router = useRouter();
	const {user, isUserAuthenticated} = useContext(UserContext);

	const {locale}= router
	const t = locale === 'en' ? en : es

	console.log(user);

	// useEffect(() => {
	// 	if (!isUserAuthenticated()) {
	// 		// router.push('/');

	// 		if (user.role !== 'operator') {
	// 			router.push('/dashboard');
	// 		}
	// 	}
	// }, [user]);

	return <ClientForm title={t.Dashboar.operatorD.registerCli} />;
};

export default RegisterClient;
