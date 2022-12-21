import React, {useContext, useState} from 'react';
import {useRouter} from 'next/router';
import {experimentalStyled, useMediaQuery, Container, Box} from '@mui/material';
import Header from './header/Header';
import Sidebar from './sidebar/Sidebar';
import Footer from './footer/Footer';
import {UserContext} from '../context/UserContext';

const MainWrapper = experimentalStyled('div')(() => ({
	display: 'flex',
	minHeight: '100vh',
	overflow: 'hidden',
	width: '100%',
}));

const PageWrapper = experimentalStyled('div')(({theme}) => ({
	display: 'flex',
	flex: '1 1 auto',
	overflow: 'hidden',

	backgroundColor: theme.palette.background.default,
	[theme.breakpoints.up('lg')]: {
		paddingTop: '64px',
	},
	[theme.breakpoints.down('lg')]: {
		paddingTop: '64px',
	},
}));

const FullLayout = ({children}) => {
	const router = useRouter();
	const [isSidebarOpen, setSidebarOpen] = useState(true);
	const [isMobileSidebarOpen, setMobileSidebarOpen] = useState(false);
	const {isUserAuthenticated} = useContext(UserContext);
	const lgUp = useMediaQuery((theme) => theme.breakpoints.up('lg'));

	return (
		<MainWrapper>
			{isUserAuthenticated() && (
				<>
					<Header
						sx={{
							paddingLeft: isSidebarOpen && lgUp ? '265px' : '',
							backgroundColor: '#fbfbfb',
						}}
						toggleMobileSidebar={() => setMobileSidebarOpen(true)}
					/>
					<Sidebar isSidebarOpen={isSidebarOpen} isMobileSidebarOpen={isMobileSidebarOpen} onSidebarClose={() => setMobileSidebarOpen(false)} />
				</>
			)}

			<PageWrapper>
				<Container
					maxWidth={false}
					sx={{
						paddingTop: '20px',
						paddingLeft: isSidebarOpen && lgUp && isUserAuthenticated() ? '280px!important' : '',
					}}
				>
					<Box sx={{minHeight: 'calc(100vh - 170px)'}}>{children}</Box>
					{router.pathname !== '/login' && <Footer />}
				</Container>
			</PageWrapper>
		</MainWrapper>
	);
};

export default FullLayout;
