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
	Alert,
} from '@mui/material';
import {ClientForm} from '../../src/components';
import {UserContext} from '../../src/context/UserContext';
import {useRouter} from 'next/router';
import {getUser} from '../../src/functions/requests';

import en from '../../public/languages/en';
import es from '../../public/languages/es';

const EditClient = () => {
	const router = useRouter();
	const {user, isUserAuthenticated} = useContext(UserContext);
	const [userId, setUserId] = useState(null);
	const [userData, setUserData] = useState(null);
	const [isSuccess, setIsSuccess] = useState(null);
	const [isWarning, setIsWarning] = useState(null);
	const {locale}= router
	const t = locale === 'en' ? en : es
	/*
manager
client
*/

	const handleSearchUser = async () => {
		try {
			const {data} = await getUser(userId);
			const {user} = data;
			if (user.role === 'client') {
				setUserData(user);
			} else {
				setIsWarning(t.EditClient.warningNotCli);
			}
		} catch (err) {
			console.log(err);
			setIsWarning(t.EditClient.warningNotFou);
		}
	};

	// useEffect(() => {
	// 	if (!isUserAuthenticated()) {
	// 		router.push('/');
	// 	} else if (user.role != 'operator') {
	// 		router.push('/dashboard');
	// 	}
	// }, [user]);

	if (userData) {
		return <ClientForm title={t.EditClient.Title} initialUserData={userData} />;
	}

	return (
		<div>
			<h1 className="font-black text-4xl ml-16">{t.EditClient.Title}</h1>
			<Grid container align="center">
				<Grid item xs={12} sx={{m: 2}}>
				{t.EditClient.description}
				</Grid>
				<Grid item xs={12} sx={{m: 2}}>
					<TextField
						onChange={(e) => setUserId(e.target.value)}
						id="id_number"
						label="ID Number"
						variant="outlined"
						InputProps={{
							startAdornment: <InputAdornment position="start">#</InputAdornment>,
						}}
						fullWidth
					/>
				</Grid>
				<Grid item xs={12} sx={{m: 2}}>
					<Button size="large" variant="contained" color="warning" onClick={() => handleSearchUser()}>
					{t.EditClient.search}
					</Button>
				</Grid>
				{isSuccess && <Alert severity="success">{isSuccess}</Alert>}
				{isWarning && <Alert severity="error">{isWarning}</Alert>}
			</Grid>
		</div>
	);
};

export default EditClient;
