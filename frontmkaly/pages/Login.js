import {React, useState, useEffect} from 'react';
import Image from 'next/image';
import Login_background from '../assets/images/backgrounds/login_image.png';
import Logo from '../assets/Icons/logo-Mkaly.png';
import { Container, Paper, Box, Typography, Stack, TextField, Button, styled, useMediaQuery, useTheme } from '@mui/material';
import FeatherIcon from 'feather-icons-react';
import styles from '../styles/Login.module.css';

export default function Login() {
	const xSmall = '400px' 
	const theme = useTheme();
	const isMatch = useMediaQuery(theme.breakpoints.down('sm'));
	const isMatchXs = useMediaQuery(theme.breakpoints.down('xSmall'))

	function getWindowSize() {
		const {innerWidth, innerHeight} = window;
		return {innerWidth, innerHeight};
	}

	const [windowSize, setWindowSize] = useState(getWindowSize());

	useEffect(() => {
	  function handleWindowResize() {
		setWindowSize(getWindowSize());
	  }
  
	  window.addEventListener('resize', handleWindowResize);
  
	  return () => {
		window.removeEventListener('resize', handleWindowResize);
	  };
	}, []);

	return (
		<>
			{/* <div className={styles.container}> */}

			<Container maxWidth="lg" sx={{ display: 'flex', justifyContent: 'center' }}>
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
								sx={{
									backgroundColor: 'rgba(250, 214, 67, 90%)',
									position: 'absolute',
									width: '55%',
									height: '45%',
									top: '0',
									bottom: '0',
									right: '0',
									left: '0',
									margin: 'auto',
									zIndex: 1,
									borderRadius: 3
								}}
							>
								<Stack fullwidth direction="column" justifyContent="center" alignItems="center" spacing={2} sx={{ paddingLeft: '60%', height: '100%' }}>
									<FeatherIcon stroke="#00296B" icon="speaker" height="3em" width="3em" />
									<Typography variant="h2">haven't registered yet?</Typography>
									<Typography sx={{ maxWidth: '70%' }}>Come to the nearest points and our operators will help you</Typography>
									<Typography sx={{ maxWidth: '70%', textAlign: 'center' }}>
										Or get in touch with us through our main line:
										<a href="tel://+573158680329" style={{ textDecoration: 'none', color: '#000000' }}>
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
						//	minWidth: isMatch ? '100%' : '36%',
							width: isMatch ? '100%' : '23%',
							height: isMatch ? '100%' : '75%',
							backgroundColor: '#00408F',
						//	paddingTop: isMatch ? '10%' : '7%',
						//	paddingBottom: isMatch ? '0%' : '7%',
							padding: isMatch ? '10px' : '0%',
							borderRadius: 3,
							zIndex: 2,
							position: 'absolute',
							top: '0',
							bottom: '0',
							right: '0',
							left: isMatch ? '0' : '-15%',
						//	minHeight: '600px',
							margin: 'auto',
							display: 'flex',
							justifyContent: 'center'
						}}
					>
						<Stack direction="column" justifyContent="center" alignItems="center" spacing={4.5} sx={{ position: 'relative' }}>
							{windowSize.innerWidth > 400 ? 
							<div>
							<Image className="logo-Login" width={190} height={125} src={Logo} />
						</div>
							: 
							''
							}

							<Typography
								sx={{
									fontSize: { lg: '20px', md: '20px', sm: '20px', xs: '20px' },
									color: '#FFF',
									fontWeight: 'bold',
								}}
							>
								LOGIN
							</Typography>
							<Box>
								<Stack direction={'row'} spacing={1} sx={{ paddingBottom: 1 }}>
									<FeatherIcon stroke="#fff" icon="user" />
									<Typography sx={{ color: '#FFF' }}> User Name</Typography>
								</Stack>
								<TextField id="outlined-basic" label="" variant="outlined" size="small" sx={{ borderRadius: 2, backgroundColor: '#CAF0F8', width: '100%' }} />
							</Box>
							<Box>
								<Stack direction={'row'} spacing={1} sx={{ paddingBottom: 1 }}>
									<FeatherIcon stroke="#fff" icon="lock" />
									<Typography sx={{ color: '#FFF' }}> Password</Typography>
								</Stack>
								<TextField id="outlined-basic" label="" variant="outlined" size="small" sx={{ borderRadius: 2, backgroundColor: '#CAF0F8' }} />
							</Box>

							<Button size="medium" variant="contained" fullwidth sx={{ background: '#FDC500', color: '#000000', fontWeight: 'bold', width: '11rem' }}>
								<Typography sx={{fontWeight: 'bold'}}>Log In</Typography>
							</Button>
							{isMatch ? (
								<>
									<Box
										sx={{
											width: '105%',
											height: '25%',
											backgroundColor: '#FAD643',
											borderRadius: 3,
											zIndex: 2,
											textAlign: 'center',
											margin: '10%',
											display: 'flex',
											justifyContent:'center'
										}}
									>
										<Stack fullwidth direction="column" justifyContent="center" alignItems="center" spacing={1} sx={{ margin: '5%'}}>
											<Typography variant="h3" sx={{ fontWeight: 'bold' }}>
												Haven't registered yet?
											</Typography>
											<Typography>Come to the nearest points and our operators will help you</Typography>
											<Typography>
												Or get in touch with us through our main line:
												<a href="tel://+573158680329" style={{ textDecoration: 'none', color: '#000000' }}>
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
