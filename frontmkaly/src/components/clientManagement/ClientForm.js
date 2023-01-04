import React, {useEffect, useState} from 'react';
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
import {registerUser, updateUser} from '../../functions/requests';

const ClientForm = ({title, initialUserData}) => {
	const [showPassword, setShowPassword] = useState(false);
	const [isSuccess, setIsSuccess] = useState(null);
	const [isWarning, setIsWarning] = useState(null);

	console.log(initialUserData);

	const [userData, setUserData] = React.useState({
		first_name_user: '',
		sec_name_user: '',
		first_lastname_user: '',
		sec_lastname_user: '',
		email: '',
		password: '',
		username: '',
		role: 'client',
		type_card: '',
		id_card: 0,
		city: '',
		phone_number: '',
		is_active: true,
		is_superuser: false,
		is_admin: false,
	});

	const handleChangeUser = (value, type) => setUserData({...userData, [type]: value});

	const handleClickShowPassword = () => setShowPassword((show) => !show);

	const handleMouseDownPassword = (event) => {
		event.preventDefault();
	};

	const handleRegisterUser = async () => {
		try {
			const res = await registerUser(userData);
			console.log(res);
			setIsSuccess('Client was created successfully');
		} catch (err) {
			setIsWarning('There was an error, try again later.');
		}
	};

	const handleUpdateUser = async () => {
		try {
			const res = await updateUser(userData.id, userData);
			console.log(res);
			setIsSuccess('Client was updated successfully');
		} catch (err) {
			setIsWarning('There was an error, try again later.');
		}
	};

	// Set initial user data
	useEffect(() => {
		if (initialUserData) {
			setUserData({...initialUserData, role: 'client'});
		}
	}, []);

	return (
		<>
			<h1 className="font-black text-4xl ml-16">{title}</h1>
			<form>
				<Grid container justifyContent="space-evenly" alignItems="center">
					<Grid item xs={5} sx={{m: 2}}>
						<TextField
							value={userData.first_name_user}
							onChange={(e) => handleChangeUser(e.target.value, 'first_name_user')}
							id="first_name"
							label="First Name"
							variant="outlined"
							fullWidth
						/>
					</Grid>
					<Grid item xs={5} sx={{m: 2}}>
						<TextField
							value={userData.sec_name_user}
							onChange={(e) => handleChangeUser(e.target.value, 'sec_name_user')}
							id="second_name"
							label="Second Name"
							variant="outlined"
							fullWidth
						/>
					</Grid>
					<Grid item xs={5} sx={{m: 2}}>
						<TextField
							value={userData.first_lastname_user}
							onChange={(e) => handleChangeUser(e.target.value, 'first_lastname_user')}
							id="first_last_name"
							label="First Last Name"
							variant="outlined"
							fullWidth
						/>
					</Grid>
					<Grid item xs={5} sx={{m: 2}}>
						<TextField
							value={userData.sec_lastname_user}
							onChange={(e) => handleChangeUser(e.target.value, 'sec_lastname_user')}
							id="second_last_name"
							label="Second Last Name"
							variant="outlined"
							fullWidth
						/>
					</Grid>
					<Grid item xs={5} sx={{m: 2}}>
						<TextField
							value={userData.phone_number}
							onChange={(e) => handleChangeUser(e.target.value, 'phone_number')}
							id="phone_number"
							label="Phone Number"
							type="number"
							variant="outlined"
							fullWidth
						/>
					</Grid>
					<Grid item xs={5} sx={{m: 2}}>
						<TextField
							value={userData.email}
							onChange={(e) => handleChangeUser(e.target.value, 'email')}
							id="email"
							label="Email"
							variant="outlined"
							fullWidth
						/>
					</Grid>
					<Grid item xs={5} sx={{m: 2}}>
						<TextField
							value={userData.username}
							onChange={(e) => handleChangeUser(e.target.value, 'username')}
							id="clientname"
							label="Client name"
							variant="outlined"
							fullWidth
						/>
					</Grid>
					<Grid item xs={5} sx={{m: 2}}>
						{!initialUserData && (
							<FormControl fullWidth variant="outlined">
								<InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
								<OutlinedInput
									disabled={initialUserData ? true : false}
									value={userData.password}
									onChange={(e) => handleChangeUser(e.target.value, 'password')}
									id="outlined-adornment-password"
									type={showPassword ? 'text' : 'password'}
									endAdornment={
										<InputAdornment position="end">
											<IconButton aria-label="toggle password visibility" onClick={handleClickShowPassword} onMouseDown={handleMouseDownPassword} edge="end">
												{showPassword ? <p>♪</p> : <p>↕</p>}
											</IconButton>
										</InputAdornment>
									}
									label="Password"
								/>
							</FormControl>
						)}
					</Grid>
					<Grid item xs={5} sx={{m: 2}}>
						<FormControl fullWidth>
							<InputLabel id="type_id">Type of Document</InputLabel>
							<Select
								value={userData.idType}
								onChange={(e) => handleChangeUser(e.target.value, 'idType')}
								labelId="type_id"
								id="type_id"
								label="Type of Document"
							>
								<MenuItem value="cc">C.C.</MenuItem>
								<MenuItem value="ce">C.E.</MenuItem>
								<MenuItem value="nip">N.I.P.</MenuItem>
								<MenuItem value="nit">N.I.T.</MenuItem>
								<MenuItem value="ti">T.I.</MenuItem>
								<MenuItem value="pap">P.A.P.</MenuItem>
							</Select>
						</FormControl>
					</Grid>
					<Grid item xs={5} sx={{m: 2}}>
						<TextField
							value={userData.id_card}
							onChange={(e) => handleChangeUser(e.target.value, 'id_card')}
							id="id_number"
							label="ID Number"
							type="number"
							variant="outlined"
							fullWidth
						/>
					</Grid>
					<Grid item xs={5} sx={{m: 2}}>
						<Autocomplete
							value={userData.city}
							onChange={(event, value) => handleChangeUser(value, 'city')}
							disablePortal
							id="city"
							options={['Cali', 'Jamundi', 'Bogota', 'Cartagena']}
							fullWidth
							renderInput={(params) => <TextField {...params} label="City" />}
						/>
					</Grid>
					<Grid item xs={12} sx={{m: 2}} align="center">
						<Button size="large" variant="contained" onClick={() => (initialUserData ? handleUpdateUser() : handleRegisterUser())}>
							{initialUserData ? 'Update' : 'Register'}
						</Button>
						{isSuccess && <Alert severity="success">{isSuccess}</Alert>}
						{isWarning && <Alert severity="error">{isWarning}</Alert>}
					</Grid>
				</Grid>
			</form>
		</>
	);
};

export default ClientForm;
