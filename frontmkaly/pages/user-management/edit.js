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
import {UserForm} from '../../src/components';

import {UserContext} from '../../src/context/UserContext';
import {useRouter} from 'next/router';
import {getUser} from '../../src/functions/requests';

const EditUser = () => {
	const [userData, setUserData] = React.useState(null);
	const [userId, setUserId] = useState(null);
	const [isSuccess, setIsSuccess] = useState(null);
	const [isWarning, setIsWarning] = useState(null);
	const router = useRouter();
	const {user, isUserAuthenticated} = useContext(UserContext);

	const handleSearchUser = async () => {
		try {
			const {data} = await getUser(userId);
			setUserData(data.user);
		} catch (err) {
			console.log(err);
			setIsWarning('User not found.');
		}
	};

	// useEffect(() => {
	// 	if (!isUserAuthenticated()) {
	// 		router.push('/');
	// 	} else if (user.role != 'admin') {
	// 		router.push('/dashboard');
	// 	}
	// }, [user]);

	if (userData) {
		return <UserForm title="Edit User Profile" initialUserData={userData} />;
	}

	return (
		<div>
			<h1 className="font-black text-4xl ml-16">Edit User Profile</h1>
			<Grid container align="center">
				<Grid item xs={12} sx={{m: 2}}>
					Write down the Id number of the user you are willing to edit
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
						Search
					</Button>
				</Grid>
				{isSuccess && <Alert severity="success">{isSuccess}</Alert>}
				{isWarning && <Alert severity="error">{isWarning}</Alert>}
			</Grid>
		</div>
	);
};

export default EditUser;
