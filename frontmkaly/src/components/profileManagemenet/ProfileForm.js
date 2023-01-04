import React, {useContext, useEffect, useState} from 'react';
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
import {UserContext} from '../../context/UserContext';
import userimg from '../../../assets/images/users/user2.jpg';
import Image from 'next/image';

const ProfileForm = ({title}) => {
	const {user, setUser, logout} = useContext(UserContext);
	const [showPassword, setShowPassword] = React.useState(false);
	const [isSuccess, setIsSuccess] = useState(null);
	const [isWarning, setIsWarning] = useState(null);

	const [userData, setUserData] = React.useState({
		password: '',
		username: user.username,
	});

	const handleChangeUser = (value, type) => setUserData({...userData, [type]: value});

	const handleClickShowPassword = () => setShowPassword((show) => !show);

	const handleMouseDownPassword = (event) => {
		event.preventDefault();
	};

	const handleUpdateUser = async () => {
		try {
			const res = await updateUser(userData.id, userData);
			console.log(res);
			setIsSuccess('User was updated successfully');
		} catch (err) {
			setIsWarning('There was an error, try again later.');
		}
	};

	return (
		<>
			<h1 className="font-black text-4xl ml-16">{title}</h1>
			<form>
				<Grid container justifyContent="space-evenly" alignItems="center">
					<Grid item xs={5} sx={{m: 2}}>
						<TextField
							value={userData.username}
							onChange={(e) => handleChangeUser(e.target.value, 'username')}
							id="username"
							label="Username"
							variant="outlined"
							fullWidth
						/>
					</Grid>
					<Grid item xs={5} sx={{m: 2}}>
						<FormControl fullWidth variant="outlined">
							<InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
							<OutlinedInput
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
					</Grid>

					<Grid item xs={12} sx={{m: 2, flexDirection: 'column'}} align="center">
						<Image src={userimg} alt={userimg} width="128" height="128" className="roundedCircle" />
					</Grid>

					<Grid item xs={12} sx={{m: 10, marginTop: 0, flexDirection: 'column'}} align="center">
						<Button variant="outlined" component="label">
							Upload Profile Picture
							<input hidden accept="image/*" multiple type="file" />
						</Button>
					</Grid>

					<Grid item xs={12} sx={{m: 2}} align="center">
						<Button size="large" variant="contained" onClick={() => handleUpdateUser()}>
							Update
						</Button>
						{isSuccess && <Alert severity="success">{isSuccess}</Alert>}
						{isWarning && <Alert severity="error">{isWarning}</Alert>}
					</Grid>
				</Grid>
			</form>
		</>
	);
};

export default ProfileForm;
