import React, {useContext} from 'react';
import {useRouter} from 'next/router';
import Image from 'next/image';
import Login_background from '../assets/images/backgrounds/login_image.png';
import Logo from '../assets/Icons/logo-Mkaly.png';
import {Container, Paper, Box, Typography, Stack, TextField, Button, styled, useMediaQuery, useTheme} from '@mui/material';
import FeatherIcon from 'feather-icons-react';
import styles from '../styles/Login.module.css';
import {UserContext} from '../src/context/UserContext';

export default function Login() {
	const router = useRouter();
	const {user, setUser} = useContext(UserContext);
	const theme = useTheme();
	const isMatch = useMediaQuery(theme.breakpoints.down('sm'));
	// const isMatchLaptop = useMediaQuery(theme.breakpoints.down('lg'))

	console.log(user);
	return (
		<>
			{/* <div className={styles.container}> */}

			<Container maxWidth="lg" sx={{display: 'flex', justifyContent: 'center'}}>
				<Image
					src={Login_background}
					layout="fill"
					// objectFit='cover'
				/>
				{isMatch ? (
					<></>
				) : (
					<>
						<Box
							sx={{backgroundColor: 'rgba(250, 214, 67, 90%)', position: 'absolute', width: '55%', height: '55%', top: '20%', zIndex: 1, borderRadius: 3}}
						>
							<Stack fullwidth direction="column" justifyContent="center" alignItems="center" spacing={2} sx={{paddingLeft: '60%', height: '100%'}}>
								<FeatherIcon stroke="#00296B" icon="speaker" height="3em" width="3em" />
								<Typography variant="h2">haven't registered yet?</Typography>
								<Typography sx={{maxWidth: '70%'}}>Come to the nearest points and our operators will help you</Typography>
								<Typography sx={{maxWidth: '70%', textAlign: 'center'}}>
									Or get in touch with us through our main line:
									<a href="tel://+573158680329" style={{textDecoration: 'none', color: '#000000'}}>
										{' '}
										+57 315 868 0329
									</a>
								</Typography>
							</Stack>
						</Box>
					</>
				)}
				<Box
					sx={{
						minWidth: isMatch ? '100%' : '36%',
						height: '90%',
						backgroundColor: '#00408F',
						paddingTop: isMatch ? '10%' : '7%',
						paddingBottom: isMatch ? '0%' : '7%',
						borderRadius: 3,
						zIndex: 2,
						position: 'relative',
						left: isMatch ? '' : '-12%',
						minHeight: '600px',
					}}
				>
					<Stack direction="column" justifyContent="center" alignItems="center" spacing={4} sx={{position: 'relative'}}>
						<div>
							<Image className="logo-Login" width={150} height={100} src={Logo} />
						</div>
						<Typography
							sx={{
								fontSize: {lg: '20px', md: '20px', sm: '20px', xs: '20px'},
								color: '#FFF',
								fontWeight: 'bold',
							}}
						>
							LOGIN
						</Typography>
						<Box>
							<Stack direction={'row'} spacing={1} sx={{paddingBottom: 1}}>
								<FeatherIcon stroke="#fff" icon="user" />
								<Typography sx={{color: '#FFF'}}> User Name</Typography>
							</Stack>
							<TextField id="outlined-basic" label="" variant="outlined" size="small" sx={{borderRadius: 2, backgroundColor: '#CAF0F8', width: '100%'}} />
						</Box>
						<Box>
							<Stack direction={'row'} spacing={1} sx={{paddingBottom: 1}}>
								<FeatherIcon stroke="#fff" icon="lock" />
								<Typography sx={{color: '#FFF'}}> Password</Typography>
							</Stack>
							<TextField id="outlined-basic" label="" variant="outlined" size="small" sx={{borderRadius: 2, backgroundColor: '#CAF0F8'}} />
						</Box>

						<Button
							onClick={() => {
								setUser({email: 'pepito@gmail.com', name: 'pepito', password: '123', rol: 'admin', id: '123'});
								router.push('/dashboard');
							}}
							size="medium"
							variant="contained"
							fullwidth
							sx={{background: '#FDC500', color: '#000000', fontWeight: 'bold', width: '11rem'}}
						>
							<Typography>Log In</Typography>
						</Button>
						{isMatch ? (
							<>
								<Box
									sx={{
										width: '105%',
										height: '30%',
										backgroundColor: '#FAD643',
										borderRadius: 3,
										zIndex: 2,
										textAlign: 'center',
										margin: '10%',
									}}
								>
									<Stack fullwidth direction="column" justifyContent="center" alignItems="center" spacing={1} sx={{margin: '5%'}}>
										<Typography variant="h3" sx={{fontWeight: 'bold'}}>
											Haven't registered?
										</Typography>
										<Typography>Come to the nearest points and our operators will help you</Typography>
										<Typography>
											Or get in touch with us through our main line:
											<a href="tel://+573158680329" style={{textDecoration: 'none', color: '#000000'}}>
												{' '}
												+57 315 868 0329
											</a>
										</Typography>
									</Stack>
								</Box>
							</>
						) : (
							<></>
						)}
					</Stack>
				</Box>
			</Container>
			{/* </div> */}
		</>
	);
}
