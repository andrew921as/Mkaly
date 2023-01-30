import React, {useContext} from 'react';
import FeatherIcon from 'feather-icons-react';
import Image from 'next/image';
import {useRouter} from 'next/router';
import userimg from '../../../assets/images/users/user2.jpg';
import {
	Box,
	Menu,
	Typography,
	ListItemButton,
	List,
	ListItemText,
	Button,
	Divider,
	Dialog,
	DialogTitle,
	DialogContent,
	FormControl,
	InputLabel,
	Select,
	DialogActions,
	OutlinedInput,
	MenuItem,
} from '@mui/material';
import {UserContext} from '../../context/UserContext';
const ProfileDD = () => {
	const router = useRouter();
	const {user, setUser, logout} = useContext(UserContext);
	const [anchorEl4, setAnchorEl4] = React.useState(null);
	const [openDialog, setOpenDialog] = React.useState(false);
	const [language, setLanguage] = React.useState('english');

	const handleChange = (event) => {
		setLanguage(event.target.value || '');
	};

	const handleClick4 = (event) => {
		setAnchorEl4(event.currentTarget);
	};

	const handleClose4 = () => {
		setAnchorEl4(null);
	};

	const handleCloseDialog = (event, reason) => {
		if (reason !== 'backdropClick') {
			setOpenDialog(false);
		}
	};

	return (
		<>
			<Button aria-label="menu" color="inherit" aria-controls="profile-menu" aria-haspopup="true" onClick={handleClick4}>
				<Box display="flex" alignItems="center">
					<Image src={user.image} alt={userimg} width="30" height="30" className="roundedCircle" />
					<Box
						sx={{
							display: {
								xs: 'none',
								sm: 'flex',
							},
							alignItems: 'center',
						}}
					>
						<Typography color="textSecondary" variant="h5" fontWeight="400" sx={{ml: 1}}>
							Hi,
						</Typography>
						<Typography
							variant="h5"
							fontWeight="700"
							sx={{
								ml: 1,
							}}
						>
							{user.username}
						</Typography>
						<FeatherIcon icon="chevron-down" width="20" height="20" />
					</Box>
				</Box>
			</Button>
			<Menu
				id="profile-menu"
				anchorEl={anchorEl4}
				keepMounted
				open={Boolean(anchorEl4)}
				onClose={handleClose4}
				sx={{
					'& .MuiMenu-paper': {
						width: '385px',
					},
				}}
			>
				<Box>
					<Box p={2} pt={0}>
						<List component="nav" aria-label="secondary mailbox folder" onClick={handleClose4}>
							<ListItemButton onClick={() => router.push('/profile/edit')}>
								<ListItemText primary="Edit Profile" />
							</ListItemButton>
							{/* <ListItemButton>
								<ListItemText primary="Account" />
							</ListItemButton>
							<ListItemButton>
								<ListItemText primary="Change Password" />
							</ListItemButton> */}

							<ListItemButton
								onClick={() => {
									setOpenDialog(true);
								}}
							>
								<ListItemText primary="Change Language" />
							</ListItemButton>
						</List>
					</Box>
					<Divider />
					<Box p={2}>
						<Button
							onClick={() => {
								logout();
								router.push('/');
							}}
							fullWidth
							variant="contained"
							color="primary"
						>
							Logout
						</Button>
					</Box>
				</Box>
			</Menu>

			{/* Dialog to change language */}
			<Dialog disableEscapeKeyDown open={openDialog} onClose={handleCloseDialog}>
				<DialogTitle>Choose your language</DialogTitle>
				<DialogContent>
					<Box component="form" sx={{display: 'flex', flexWrap: 'wrap'}}>
						<FormControl sx={{m: 1, minWidth: 120}}>
							<InputLabel id="demo-dialog-select-label">Lang</InputLabel>
							<Select
								labelId="demo-dialog-select-label"
								id="demo-dialog-select"
								value={language}
								onChange={handleChange}
								input={<OutlinedInput label="Lang" />}
							>
								<MenuItem value="">
									<em>None</em>
								</MenuItem>
								<MenuItem value={'spanish'}>Spanish</MenuItem>
								<MenuItem value={'english'}>English</MenuItem>
								<MenuItem value={'portuguese'}>Portuguese</MenuItem>
							</Select>
						</FormControl>
					</Box>
				</DialogContent>
				<DialogActions>
					<Button onClick={handleCloseDialog}>Cancel</Button>
					<Button onClick={handleCloseDialog}>Save</Button>
				</DialogActions>
			</Dialog>
		</>
	);
};

export default ProfileDD;
