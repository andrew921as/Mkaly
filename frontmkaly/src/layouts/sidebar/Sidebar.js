import React, {useContext, useState, useEffect} from 'react';
import NextLink from 'next/link';
import PropTypes from 'prop-types';
import {Box, Drawer, useMediaQuery, List, Link, Button, Typography, ListItem, Collapse, ListItemIcon, ListItemText} from '@mui/material';
import FeatherIcon from 'feather-icons-react';
// import LogoIcon from "../logo/LogoIcon";
import {
	Menuitems,
	ClientMenuItems,
	ManagerMenuItems,
	OperatorMenuItems,
	AdminMenuItems,
	ClientMenuItemsES,
	ManagerMenuItemsES,
	OperatorMenuItemsES,
	AdminMenuItemsES,
} from './MenuItems';
import Buynow from './Buynow';
import {useRouter} from 'next/router';
import {UserContext} from '../../context/UserContext';
import es from '../../../public/languages/es';
import en from '../../../public/languages/en';

const Sidebar = ({isMobileSidebarOpen, onSidebarClose, isSidebarOpen}) => {
	const {user, setUser, isUserAuthenticated} = useContext(UserContext);
	const [open, setOpen] = React.useState(true);
	const [menuItems, setMenuItems] = useState([]);

	const router = useRouter();
	const {locale} = router;
	const t = locale === 'en' ? en : es;

	const lgUp = useMediaQuery((theme) => theme.breakpoints.up('lg'));

	const handleClick = (index) => {
		if (open === index) {
			setOpen((prevopen) => !prevopen);
		} else {
			setOpen(index);
		}
	};
	let curl = useRouter();
	const location = curl.pathname;

	useEffect(() => {
		if (!isUserAuthenticated()) {
			curl.push('/');
		} else {
			switch (user.role) {
				case 'manager':
					if (locale === 'en') {
						setMenuItems(ManagerMenuItems);
					} else {
						setMenuItems(ManagerMenuItemsES);
					}
					break;
				case 'admin':
					if (locale === 'en') {
						setMenuItems(AdminMenuItems);
					} else {
						setMenuItems(AdminMenuItemsES);
					}
					break;
				case 'operator':
					if (locale === 'en') {
						setMenuItems(OperatorMenuItems);
					} else {
						setMenuItems(OperatorMenuItemsES);
					}
					break;
				case 'client':
					if (locale === 'en') {
						setMenuItems(ClientMenuItems);
					} else {
						setMenuItems(ClientMenuItemsES);
					}
					break;
				default:
					setMenuItems([]);
					break;
			}
		}
	}, [user]);

	const SidebarContent = (
		<Box p={2} height="100%">
			{/* <LogoIcon /> */}
			<Box mt={2}>
				<List>
					{menuItems.map((item, index) => (
						<List component="li" disablePadding key={item.title}>
							<NextLink href={item.href}>
								<ListItem
									onClick={() => handleClick(index)}
									button
									selected={location === item.href}
									sx={{
										mb: 1,
										...(location === item.href && {
											color: 'white',
											backgroundColor: (theme) => `${theme.palette.primary.main}!important`,
										}),
									}}
								>
									<ListItemIcon>
										<FeatherIcon
											style={{
												color: `${location === item.href ? 'white' : ''} `,
											}}
											icon={item.icon}
											width="20"
											height="20"
										/>
									</ListItemIcon>

									<ListItemText onClick={onSidebarClose}>{item.title}</ListItemText>
								</ListItem>
							</NextLink>
						</List>
					))}
				</List>
			</Box>

			{/* <Buynow /> */}
		</Box>
	);
	if (lgUp) {
		return (
			<Drawer
				anchor="left"
				open={isSidebarOpen}
				variant="persistent"
				PaperProps={{
					sx: {
						width: '265px',
						border: '0 !important',
						boxShadow: '0px 7px 30px 0px rgb(113 122 131 / 11%)',
					},
				}}
			>
				{SidebarContent}
			</Drawer>
		);
	}
	return (
		<Drawer
			anchor="left"
			open={isMobileSidebarOpen}
			onClose={onSidebarClose}
			PaperProps={{
				sx: {
					width: '265px',
					border: '0 !important',
				},
			}}
			variant="temporary"
		>
			{SidebarContent}
		</Drawer>
	);
};

Sidebar.propTypes = {
	isMobileSidebarOpen: PropTypes.bool,
	onSidebarClose: PropTypes.func,
	isSidebarOpen: PropTypes.bool,
};

export default Sidebar;
