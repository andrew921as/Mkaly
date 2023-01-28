import { AppBar, Toolbar, Typography, Button, Stack, Menu, MenuItem, useMediaQuery, useTheme } from '@mui/material';
import Image from 'next/image';
import Link from 'next/link';
import logoMkaly from '../../../assets/Icons/logo-Mkaly.png';
import { useRouter } from 'next/router';
import { useState } from 'react';
//Diccionarios
import en from '../../../public/languages/en';
import es from '../../../public/languages/es';

export const Navbar = () => {
	{/**Esta es la parte para cambiar de idioma */ }
	const router = useRouter()
	const { asPath, locale } = router
	const t = locale === 'en' ? en : es

	const [anchorEl, setAnchorEl] = useState(null);
	const open = Boolean(anchorEl);
	const handleClick = (event) => {
		setAnchorEl(event.currentTarget);
	};
	const handleClose = () => {
		setAnchorEl(null);
	};
	const theme = useTheme();
	const isMatch = useMediaQuery(theme.breakpoints.down('md'));
	return (
		<AppBar position="fixed" sx={{ backgroundColor: '#00408F' }}>
			<Toolbar>
				{isMatch ? (
					<>
						<Button
							id="demo-positioned-button"
							aria-controls={open ? 'demo-positioned-menu' : undefined}
							aria-haspopup="true"
							aria-expanded={open ? 'true' : undefined}
							onClick={handleClick}
						>
							<Image src={logoMkaly} width={50} height={35} />
						</Button>
						<Menu
							id="demo-positioned-menu"
							aria-labelledby="demo-positioned-button"
							//anchorEl={anchorEl}
							open={open}
							onClose={handleClose}
							anchorOrigin={{
								vertical: 'top',
								horizontal: 'left',
							}}
							transformOrigin={{
								vertical: 'top',
								horizontal: 'center',
							}}
						>
							<MenuItem onClick={handleClose}>
								<Link href="/">
									<Button href="#Start">{t.LandingP.Menu.Start}</Button>
								</Link>
							</MenuItem>
							<MenuItem onClick={handleClose}>
								<Button href="#AboutUs">{t.LandingP.Menu.About}</Button>
							</MenuItem>
							<MenuItem onClick={handleClose}>
								<Button href="#newProjects">{t.LandingP.Menu.New}</Button>
							</MenuItem>
							<MenuItem onClick={handleClose}>
								<Button href="#contact-us">{t.LandingP.Menu.Contact}</Button>
							</MenuItem>
							<MenuItem onClick={handleClose}>
								<Button href="#Start">{t.LandingP.Menu.Consult}</Button>
							</MenuItem>
							<MenuItem onClick={handleClose}>
								<Button href="#" locale="en">{t.LandingP.Menu.Language}</Button>
							</MenuItem>
							<MenuItem onClick={handleClose}>
								<Link href="/login-page">
									<Button color="inherit">{t.LandingP.Menu.Consult}</Button>
								</Link>
							</MenuItem>
						</Menu>
					</>
				) : (
					<>
						<Image src={logoMkaly} width={60} height={40} />
						<Typography variant="h2" component="div" sx={{ flexGrow: 1, paddingLeft: 2 }} color={'#ffffff'}>
							MKALY
						</Typography>
						<Stack direction="row" spacing={2}>
							<Link href="/">
								<Button href="#Start"> {t.LandingP.Menu.Start}</Button>
							</Link>
							<Button href="#AboutUs">{t.LandingP.Menu.About}</Button>
							<Button href="#newProjects">{t.LandingP.Menu.New}</Button>
							<Button href="#contact-us">{t.LandingP.Menu.Contact}</Button>
							<Button>{t.LandingP.Menu.Consult}</Button>
							<Button
								id="basic-button"
								aria-controls={open ? 'basic-menu' : undefined}
								aria-haspopup="true"
								aria-expanded={open ? 'true' : undefined}
								onClick={handleClick}>
								{t.LandingP.Menu.Language}
							</Button>
							<Menu
								id="basic-menu"
								anchorEl={anchorEl}
								open={open}
								onClose={handleClose}
								MenuListProps={{
									'aria-labelledby': 'basic-button',
								}}
							>
								<MenuItem onClick={handleClose}><Link href={asPath} locale='es'>ES</Link></MenuItem>
								<MenuItem onClick={handleClose}><Link href={asPath} locale='en'>EN</Link></MenuItem>

							</Menu>
							<Link href="/login-page">
								<Button color="inherit">{t.LandingP.Menu.Login}</Button>
							</Link>
						</Stack>
					</>
				)}
			</Toolbar>
		</AppBar>
	);
};
