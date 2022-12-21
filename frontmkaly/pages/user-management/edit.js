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

const EditUser = () => {
	const [userData, setUserData] = React.useState(null);
	const router = useRouter();
	const {user, isUserAuthenticated} = useContext(UserContext);

	useEffect(() => {
		if (!isUserAuthenticated()) {
			router.push('/');
		} else if (user.rol != 'admin') {
			router.push('/dashboard');
		}
	}, [user]);

	if (userData) {
		return <UserForm title="Edit User Profile" />;
	}

	return (
		<div>
			<h1>Edit User Profile</h1>
			<Grid container align="center">
				<Grid item xs={12} sx={{m: 2}}>
					Write down the Id number of the user you are willing to edit
				</Grid>
				<Grid item xs={12} sx={{m: 2}}>
					<TextField
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
					<Button size="large" variant="contained" color="warning" onClick={() => setUserData(123)}>
						Search
					</Button>
				</Grid>
			</Grid>
		</div>
	);
};

export default EditUser;
