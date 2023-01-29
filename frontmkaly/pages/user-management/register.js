import React, {useContext, useState, useEffect} from 'react';
import { useRouter } from 'next/router';
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

import en from '../../public/languages/en';
import es from '../../public/languages/es';

const RegisterUser = () => {
	const router = useRouter()
	const {locale}= router
	const t = locale === 'en' ? en : es
	// const router = useRouter();
	// const {user, isUserAuthenticated} = useContext(UserContext);

	// useEffect(() => {
	// 	if (!isUserAuthenticated()) {
	// 		router.push('/');
	// 	} else if (user.role != 'admin') {
	// 		router.push('/dashboard');
	// 	}
	// }, [user]);

	return <UserForm title={t.userRegistration} />;
};

export default RegisterUser;
