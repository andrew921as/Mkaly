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
	CircularProgress,
} from '@mui/material';
import { useRouter } from 'next/router';
import {registerUser, updateUserAdmin, updateUserOperator, updateUserManager, updateUserClient} from '../../functions/requests';
import {UserContext} from '../../context/UserContext';
import userimg from '../../../assets/images/users/user2.jpg';
import Image from 'next/image';
import axios from 'axios';

import en from '../../../public/languages/en';
import es from '../../../public/languages/es';

const ProfileForm = ({title}) => {
	const {user, setUser, initiateUser, logout} = useContext(UserContext);
	const [showPassword, setShowPassword] = React.useState(false);
	const [isSuccess, setIsSuccess] = useState(null);
	const [isWarning, setIsWarning] = useState(null);
	const [isLoading, setIsLoading] = useState(false);
	// const [selectedImage, setSelectedImage] = useState(null);

	const [userData, setUserData] = React.useState({
		username: user.username,
		image: user.image,
	});

	const router = useRouter()
	const {locale}= router
	const t = locale === 'en' ? en : es

	const handleChangeUser = (value, type) => setUserData({...userData, [type]: value});

	const handleClickShowPassword = () => setShowPassword((show) => !show);

	const handleMouseDownPassword = (event) => {
		event.preventDefault();
	};

	const handleUpdateUser = async () => {
		try {
			// let image = await uploadImage();

			let res = null;

			if (user.role === 'admin') {
				console.log('EDIT ADMIN', userData);
				res = await updateUserAdmin(user.id, {...userData});
			}

			if (user.role === 'client') {
				res = await updateUserClient(user.id, {...userData});
			}

			if (user.role === 'manager') {
				res = await updateUserOperator(user.id, {...userData});
			}

			if (user.role === 'operator') {
				res = await updateUserManager(user.id, {...userData});
			}

			setIsLoading(false);
			initiateUser({...user, ...userData});
			console.log(res);
			setIsSuccess('User was updated successfully');
		} catch (err) {
			setIsWarning('There was an error, try again later.');
			setIsLoading(false);
		}
	};

	const uploadImage = async (file) => {
		setIsLoading(true);
		const formData = new FormData();

		if (!file) {
			return;
		}

		formData.append('file', file);
		formData.append('upload_preset', 'pf0gmt8s');

		try {
			let response = await axios.post('https://api.cloudinary.com/v1_1/dvm5lesco/image/upload', formData);
			setUserData({...userData, image: response.data.url});
			setIsLoading(false);
			return;
			// return response.data.url;
		} catch (err) {
			console.error('There was an error');
			setIsLoading(false);
		}
	};

	useEffect(() => {
		console.log(userData);
	}, [userData]);

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
							label={t.Form.userName}
							variant="outlined"
							fullWidth
						/>
					</Grid>
					<Grid item xs={5} sx={{m: 2}}>
						<FormControl fullWidth variant="outlined">
							<InputLabel htmlFor="outlined-adornment-password">{t.Form.password}</InputLabel>
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
						<Image src={userData.image} alt={userimg} width="128" height="128" className="roundedCircle" />
					</Grid>

					<Grid item xs={12} sx={{m: 10, marginTop: 0, flexDirection: 'column'}} align="center">
						<Button variant="outlined" component="label">
							{t.EditProfil.upProPic}
							<input
								hidden
								accept="image/*"
								multiple
								type="file"
								onChange={(e) => {
									uploadImage(e.target.files[0]);
								}}
							/>
						</Button>
					</Grid>

					<Grid item xs={12} sx={{m: 2}} align="center">
						{isLoading ? (
							<CircularProgress />
						) : (
							<Button size="large" variant="contained" onClick={() => handleUpdateUser()}>
								{t.EditProfil.update}
							</Button>
						)}
						{isSuccess && <Alert severity="success">{isSuccess}</Alert>}
						{isWarning && <Alert severity="error">{isWarning}</Alert>}
					</Grid>
				</Grid>
			</form>
		</>
	);
};

export default ProfileForm;
