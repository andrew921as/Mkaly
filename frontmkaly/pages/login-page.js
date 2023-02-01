import {React, useState, useEffect, useRef, useContext} from 'react';
import {useRouter} from 'next/router';
import Image from 'next/image';
import Login_background from '../assets/images/backgrounds/login_image.png';
import Logo from '../assets/Icons/logo-Mkaly.png';
import {Container, Paper, Box, Typography, Stack, TextField, Button, styled, useMediaQuery, useTheme} from '@mui/material';
import FeatherIcon from 'feather-icons-react';
import styles from '../styles/Login.module.css';
import {UserContext} from '../src/context/UserContext';
import {Navbar} from '../src/layouts/navBar/navVar';
//Diccionaries
import en from '../public/languages/en';
import es from '../public/languages/es';
import ReCAPTCHA from 'react-google-recaptcha';

export default function Login() {
	const router = useRouter();
	const {locale} = router;
	const t = locale === 'en' ? en : es;

	const {user, setUser, login} = useContext(UserContext);

	//Refs
	const captcha = useRef(null);

	// States
	const [userData, setUserData] = useState({username: '', password: ''});
	const [warning, setWarning] = useState(null);
	const [validCaptcha, setValidCaptcha] = useState(null);

	const xSmall = '400px';
	const theme = useTheme();
	const isMatch = useMediaQuery(theme.breakpoints.down('sm'));
	const isMatchXs = useMediaQuery(theme.breakpoints.down('xSmall'));
	const [windowSize, setWindowSize] = useState({innerWidth: 1920, innerHeight: 1080});

	const handleLogin = async () => {
		if (!captcha.current.getValue()) {
			setWarning('Please do the captcha');
			return;
		}

		const res = await login(userData.username, userData.password);

		if (res.ok) {
			router.push('/dashboard');
		} else {
			setWarning(res.message);
		}
	};

	function getWindowSize() {
		if (typeof window !== 'undefined') {
			const {innerWidth, innerHeight} = window;
			return {innerWidth, innerHeight};
		}
	}

	/**
	 * Verifies captcha
	 */
	const handleCaptcha = () => {
		if (captcha.current.getValue()) {
			console.log('You are not cromed');
		}
	};

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
			<Navbar />

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
								borderRadius: 3,
							}}
						>
							<Stack direction="column" justifyContent="center" alignItems="center" spacing={2} sx={{paddingLeft: '60%', height: '100%'}}>
								<FeatherIcon stroke="#00296B" icon="speaker" height="3em" width="3em" />
								<Typography variant="h2">{t.LoginP.NoRegis}</Typography>
								<Typography sx={{maxWidth: '70%'}}>{t.LoginP.NoRegisP1}</Typography>
								<Typography sx={{maxWidth: '70%', textAlign: 'center'}}>
									{t.LoginP.NoRegisP2}
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
						justifyContent: 'center',
					}}
				>
					<Stack direction="column" justifyContent="center" alignItems="center" spacing={3} sx={{position: 'relative'}}>
						{windowSize.innerWidth > 400 ? (
							<div>
								<Image className="logo-Login" width={150} height={90} src={Logo} />
							</div>
						) : (
							''
						)}

						<Typography
							sx={{
								fontSize: {lg: '20px', md: '20px', sm: '20px', xs: '20px'},
								color: '#FFF',
								fontWeight: 'bold',
							}}
						>
							{t.LoginP.Title}
						</Typography>
						<Box>
							<Stack direction={'row'} spacing={1} sx={{paddingBottom: 1}}>
								<FeatherIcon stroke="#fff" icon="user" />
								<Typography sx={{color: '#FFF'}}> {t.Form.userName}</Typography>
							</Stack>
							<TextField
								onChange={(e) => setUserData({...userData, username: e.target.value})}
								id="outlined-basic"
								label=""
								variant="outlined"
								size="small"
								sx={{borderRadius: 2, backgroundColor: '#CAF0F8', width: '100%'}}
							/>
						</Box>
						<Box>
							<Stack direction={'row'} spacing={1} sx={{paddingBottom: 1}}>
								<FeatherIcon stroke="#fff" icon="lock" />
								<Typography sx={{color: '#FFF'}}> {t.Form.password}</Typography>
							</Stack>
							<TextField
								onChange={(e) => setUserData({...userData, password: e.target.value})}
								id="outlined-basic"
								label=""
								variant="outlined"
								size="small"
								sx={{borderRadius: 2, backgroundColor: '#CAF0F8'}}
								type="password"
							/>
						</Box>

						{/* 6LeD3M8jAAAAAGoZqCSD7goIK5GM6zwqjYZ72e-9 */}
						{/* 6LeD3M8jAAAAAIYUbFNoNmMDPvZZpld7jApZStBe */}

						<ReCAPTCHA ref={captcha} sitekey="6LcO7c8jAAAAAL22zlVwnEBB6tw6WT5LXZ4DVmlT" onChange={handleCaptcha} />

						<Button
							onClick={() => {
								handleLogin();
								// setUser({email: 'pepito@gmail.com', name: 'pepito', password: '123', rol: 'admin', id: '123'});
								// router.push('/dashboard');
							}}
							size="medium"
							variant="contained"
							sx={{background: '#FDC500', color: '#000000', fontWeight: 'bold', width: '11rem'}}
						>
							<Typography sx={{fontWeight: 'bold'}}>{t.LoginP.LoginB}</Typography>
						</Button>

						{warning && <Typography sx={{fontWeight: 'bold', color: 'red'}}>{warning}</Typography>}
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
										justifyContent: 'center',
									}}
								>
									<Stack direction="column" justifyContent="center" alignItems="center" spacing={1} sx={{margin: '5%'}}>
										<Typography variant="h3" sx={{fontWeight: 'bold'}}>
											{t.LoginP.NoRegis}
										</Typography>
										<Typography>{t.LoginP.NoRegisP1}</Typography>
										<Typography>
											{t.LoginP.NoRegisP2}
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
