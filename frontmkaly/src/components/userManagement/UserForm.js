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
import { useRouter } from 'next/router';
//Diccionaries
import en from '../../../public/languages/en';
import es from '../../../public/languages/es';
const UserForm = ({title, initialUserData}) => {
	const [showPassword, setShowPassword] = React.useState(false);
	const [isSuccess, setIsSuccess] = useState(null);
	const [isWarning, setIsWarning] = useState(null);

	const [userData, setUserData] = React.useState({
		first_name_user: '',
		sec_name_user: '',
		first_lastname_user: '',
		sec_lastname_user: '',
		email: '',
		password: '',
		username: '',
		role: '',
		type_card: '',
		id_card: 0,
		city: '',
		phone_number: '',
		client_type: '',
		headquarters: '',
		is_active: true,
		is_superuser: false,
		is_admin: false,
	});

	const router = useRouter()
	const {locale}= router
	const t = locale === 'en' ? en : es

	const handleChangeUser = (value, type) => setUserData({...userData, [type]: value});

	const handleClickShowPassword = () => setShowPassword((show) => !show);

	const handleMouseDownPassword = (event) => {
		event.preventDefault();
	};

	const handleRegisterUser = async () => {
		try {
			const res = await registerUser(userData);
			console.log(res);
			setIsSuccess(t.UserForm.handleRegisterUser.Success);
		} catch (err) {
			setIsWarning(t.UserForm.handleRegisterUser.Warning);
		}
	};

	const handleUpdateUser = async () => {
		try {
			const res = await updateUser(userData.id, userData);
			console.log(res);
			setIsSuccess(t.UserForm.handleUpdateUser.Success);
		} catch (err) {
			setIsWarning(t.UserForm.handleRegisterUser.Warning);
		}
	};

	// Set initial user data
	useEffect(() => {
		if (initialUserData) {
			setUserData({...initialUserData, password: '123'});
		}
	}, []);

	console.log(userData);

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
							label={t.Form.first_name}
							variant="outlined"
							fullWidth
						/>
					</Grid>
					<Grid item xs={5} sx={{m: 2}}>
						<TextField
							value={userData.sec_name_user}
							onChange={(e) => handleChangeUser(e.target.value, 'sec_name_user')}
							id="second_name"
							label={t.Form.second_name}
							variant="outlined"
							fullWidth
						/>
					</Grid>
					<Grid item xs={5} sx={{m: 2}}>
						<TextField
							value={userData.first_lastname_user}
							onChange={(e) => handleChangeUser(e.target.value, 'first_lastname_user')}
							id="first_last_name"
							label={t.Form.first_last_name}
							variant="outlined"
							fullWidth
						/>
					</Grid>
					<Grid item xs={5} sx={{m: 2}}>
						<TextField
							value={userData.sec_lastname_user}
							onChange={(e) => handleChangeUser(e.target.value, 'sec_lastname_user')}
							id="second_last_name"
							label={t.Form.second_last_name}
							variant="outlined"
							fullWidth
						/>
					</Grid>

					<Grid item xs={5} sx={{m: 2}}>
						<TextField
							value={userData.email}
							onChange={(e) => handleChangeUser(e.target.value, 'email')}
							id="email"
							label={t.Form.Email}
							variant="outlined"
							fullWidth
						/>
					</Grid>
					<Grid item xs={5} sx={{m: 2}}>
						<TextField
							value={userData.username}
							onChange={(e) => handleChangeUser(e.target.value, 'username')}
							id="username"
							label={t.Form.userName}
							variant="outlined"
							fullWidth
						/>
					</Grid>

					{!initialUserData && (
						<Grid item xs={5} sx={{m: 2}}>
							<FormControl fullWidth variant="outlined">
								<InputLabel htmlFor="outlined-adornment-password">{t.Form.password}</InputLabel>
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
									label={t.Form.password}
								/>
							</FormControl>
            </Grid>
						)}
					
					

					<Grid item xs={5} sx={{m: 2}}>
						<FormControl fullWidth>
							<InputLabel id="userRol">User Rol</InputLabel>
							<Select labelId="userRol" id="userRol" value={userData.role} label={t.Form.Rol.Title} onChange={(e) => handleChangeUser(e.target.value, 'role')}>
								<MenuItem value="admin">Admin</MenuItem>
								<MenuItem value="manager">Manager</MenuItem>
								<MenuItem value="operator">Operator</MenuItem>
								<MenuItem value="client">Client</MenuItem>
							</Select>
						</FormControl>
					</Grid>

					{userData.role === 'client' && (
						<>
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
								<FormControl fullWidth>
									<InputLabel id="clientType">Type Of Client</InputLabel>
									<Select
										labelId="clientType"
										id="clientType"
										value={userData.client_type}
										label="Client Type"
										onChange={(e) => handleChangeUser(e.target.value, 'client_type')}
									>
										<MenuItem value="natural">Natural</MenuItem>
										<MenuItem value="business">Business</MenuItem>
									</Select>
								</FormControl>
							</Grid>
						</>
					)}

					{userData.role !== 'client' && (
						<Grid item xs={5} sx={{m: 2}}>
							<FormControl fullWidth>
								<InputLabel id="headquarters">Headquarters</InputLabel>
								<Select
									labelId="headquarters"
									id="headquarters"
									value={userData.headquarters}
									label="Headquarters"
									onChange={(e) => handleChangeUser(e.target.value, 'headquarters')}
								>
									<MenuItem value="north">North</MenuItem>
									<MenuItem value="west">West</MenuItem>
									<MenuItem value="est">Est</MenuItem>
									<MenuItem value="south">South</MenuItem>
								</Select>
							</FormControl>
						</Grid>
					)}

					<Grid item xs={5} sx={{m: 2}}>
						<FormControl fullWidth>
							<InputLabel id="type_id">Type of Document</InputLabel>
							<Select
								value={userData.type_card}
								onChange={(e) => handleChangeUser(e.target.value, 'type_card')}
								labelId="type_id"
								id="type_id"
								label={t.Form.documentType}
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
							label={t.Form.IDNumber}
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
							renderInput={(params) => <TextField {...params} label={t.Form.City} />}
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

export default UserForm;
