import {AppBar, Toolbar, Typography, Button, Stack, Menu, MenuItem, useMediaQuery, useTheme, Box} from '@mui/material';
import Image from 'next/image';
import Link from 'next/link';
import logoMkaly from '../../../assets/Icons/logo-Mkaly.png';
import UK from '../../../assets/Icons/united-kingdom.png';
import Col from '../../../assets/Icons/colombia.png';
import {useRouter} from 'next/router';
import {useState} from 'react';
//Diccionarios
import en from '../../../public/languages/en';
import es from '../../../public/languages/es';

export const Navbar = () => {
	{
		/**Esta es la parte para cambiar de idioma */
	}
	const router = useRouter();
	const {asPath, locale} = router;
	const t = locale === 'en' ? en : es;

	const [anchorEl, setAnchorEl] = useState(null);
	const [anchorBill, setAnchorBill] = useState(null);

	const open = Boolean(anchorEl);
	const openBill = Boolean(anchorBill);
	const handleClick = (event) => {
		setAnchorEl(event.currentTarget);
	};
	const handleClickBill = (event) => {
		setAnchorBill(event.currentTarget);
	};
	const handleClose = () => {
		setAnchorEl(null);
	};
	const handleCloseBill = () => {
		setAnchorBill(null);
	};
	const theme = useTheme();
	const isMatch = useMediaQuery(theme.breakpoints.down('md'));
	return (
		<AppBar position="fixed" sx={{backgroundColor: '#00408F'}}>
			<Toolbar>
				{isMatch ? (
					<>
						<Stack direction="row" justifyContent="space-between" alignItems="center" spacing={3} sx={{width: '100%'}}>
							<Button
								id="demo-positioned-button"
								aria-controls={open ? 'demo-positioned-menu' : undefined}
								aria-haspopup="true"
								aria-expanded={open ? 'true' : undefined}
								onClick={handleClick}
							>
								<Image src={logoMkaly} width={50} height={35} />
							</Button>
							<Box>
								<Button>
									<Link href={asPath} locale="en">
										<Image src={UK} width={40} height={35} />
									</Link>
								</Button>
								<Button>
									<Link href={asPath} locale="es">
										<Image src={Col} width={40} height={35} />
									</Link>
								</Button>
							</Box>
						</Stack>
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
								<Link href="/consultBill">
									<Button href="#Start">{t.LandingP.Menu.Consult}</Button>
								</Link>
							</MenuItem>
							<MenuItem onClick={handleClose}>
								<Link href="/downlaodBill">
									<Button href="#Start">{t.LandingP.Menu.Download}</Button>
								</Link>
							</MenuItem>
							<MenuItem onClick={handleClose}>
								<Link href="/login-page">
									<Button color="inherit">{t.LandingP.Menu.Login}</Button>
								</Link>
							</MenuItem>
						</Menu>
					</>
				) : (
					<>
						<Image src={logoMkaly} width={60} height={40} />
						<Typography variant="h2" component="div" sx={{flexGrow: 1, paddingLeft: 2}} color={'#ffffff'}>
							MKALY
						</Typography>
						<Stack direction="row" spacing={2}>
							<Link href="/">
								<Button href="#Start"> {t.LandingP.Menu.Start}</Button>
							</Link>
							<Button href="#AboutUs">{t.LandingP.Menu.About}</Button>
							<Button href="#newProjects">{t.LandingP.Menu.New}</Button>
							<Button href="#contact-us">{t.LandingP.Menu.Contact}</Button>
							<Button
								id="basic-menu-bill"
								aria-controls={open ? 'basic-menu-bill' : undefined}
								aria-haspopup="true"
								aria-expanded={open ? 'true' : undefined}
								onClick={handleClickBill}
							>
								{t.LandingP.Menu.Consult}
							</Button>
							<Menu
								id="basic-menu-bill"
								anchorEl={anchorBill}
								open={openBill}
								onClose={handleCloseBill}
								MenuListProps={{
									'aria-labelledby': 'basic-menu-bill',
								}}
							>
								<MenuItem onClick={handleCloseBill}>
									<Link href="/consultBill">{t.LandingP.Menu.Consult}</Link>
								</MenuItem>
								<MenuItem onClick={handleCloseBill}>
									<Link href="/downlaodBill">{t.LandingP.Menu.Download}</Link>
								</MenuItem>
							</Menu>
							<Button
								id="basic-button"
								aria-controls={open ? 'basic-menu' : undefined}
								aria-haspopup="true"
								aria-expanded={open ? 'true' : undefined}
								onClick={handleClick}
							>
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
								<MenuItem onClick={handleClose}>
									<Link href={asPath} locale="es">
										ES
									</Link>
								</MenuItem>
								<MenuItem onClick={handleClose}>
									<Link href={asPath} locale="en">
										EN
									</Link>
								</MenuItem>
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
