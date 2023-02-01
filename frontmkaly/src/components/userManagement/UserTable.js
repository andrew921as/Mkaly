import React, {useEffect, useState} from 'react';
import {useRouter} from 'next/router';
import {
	Typography,
	Box,
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableRow,
	FormControl,
	InputLabel,
	InputAdornment,
	Input,
	Button,
} from '@mui/material';
import BaseCard from '../baseCard/BaseCard';

import es from '../../../public/languages/es';
import en from '../../../public/languages/en';

// API
import {getUsers, userEnableDisable} from '../../functions/requests';

const UsersTable = ({title}) => {
	const router = useRouter();
	const [users, setUsers] = useState([]);
	const [allUsers, setAllUsers] = useState([]);
	const {locale} = router;
	const t = locale === 'en' ? en : es;

	const fetchUsers = async () => {
		const {data} = await getUsers();

		if (!data.users) {
			return;
		}

		const sortedUsers = data.users.sort((a, b) => {
			let fa = a.first_name_user.toLowerCase(),
				fb = b.first_name_user.toLowerCase();

			if (fa < fb) {
				return -1;
			}
			if (fa > fb) {
				return 1;
			}
			return 0;
		});
		setUsers(sortedUsers);
		setAllUsers(sortedUsers);
	};

	const handleSearchUser = async (data) => {
		const filteredUsers = allUsers.filter((user) => {
			return user.first_name_user.toLowerCase().includes(data.toLowerCase());
		});

		setUsers(filteredUsers);
	};

	const handleUpdateUser = async (userData) => {
		try {
			console.log(userData);
			const res = await userEnableDisable(userData.id, userData);
			console.log(res);

			await fetchUsers();
			// setIsSuccess('User was updated successfully');
		} catch (err) {
			console.log('There was an error, try again later.');
		}
	};

	useEffect(() => {
		fetchUsers();
	}, []);

	return (
		<BaseCard title={title}>
			<FormControl variant="standard">
				<InputLabel htmlFor="search-user">{t.UsersTable.search}</InputLabel>
				<Input
					id="search-user"
					onChange={(e) => handleSearchUser(e.target.value)}
					startAdornment={
						<InputAdornment position="start">
							<p>🔎</p>
						</InputAdornment>
					}
				/>
			</FormControl>
			{/* <TextField
				id="filled-search"
				label="Search user here"
				type="search"
				variant="outlined"
				color="info"
				startAdornment={
					<InputAdornment position="start">
						<p>H</p>
					</InputAdornment>
				}
			/> */}
			<Table
				aria-label="simple table"
				sx={{
					mt: 3,
					whiteSpace: 'nowrap',
				}}
			>
				<TableHead>
					<TableRow>
						<TableCell>
							<Typography color="textSecondary" variant="h6">
								#
							</Typography>
						</TableCell>
						<TableCell>
							<Typography color="textSecondary" variant="h6">
								{t.UsersTable.first_name}
							</Typography>
						</TableCell>
						<TableCell>
							<Typography color="textSecondary" variant="h6">
								{t.UsersTable.first_last_name}
							</Typography>
						</TableCell>
						<TableCell>
							<Typography color="textSecondary" variant="h6">
								{t.UsersTable.Email}
							</Typography>
						</TableCell>
						<TableCell>
							<Typography color="textSecondary" variant="h6">
								{t.UsersTable.Rol.Title}
							</Typography>
						</TableCell>
						<TableCell>
							<Typography color="textSecondary" variant="h6">
								{t.UsersTable.status}
							</Typography>
						</TableCell>
						<TableCell>
							<Typography color="textSecondary" variant="h6">
								{t.UsersTable.activate}
							</Typography>
						</TableCell>
						{/* <TableCell align="right">
              <Typography color="textSecondary" variant="h6">
                Budget
              </Typography>
            </TableCell> */}
					</TableRow>
				</TableHead>
				<TableBody>
					{users.map((user, index) => {
						const position = index + 1;
						console.log(user);
						return (
							<TableRow key={user.id} sx={{cursor: 'pointer'}}>
								<TableCell onClick={() => router.push('/user-management/info/' + user.id)}>
									<Typography
										sx={{
											fontSize: '15px',
											fontWeight: '500',
										}}
									>
										{position}
									</Typography>
								</TableCell>
								<TableCell onClick={() => router.push('/user-management/info/' + user.id)}>
									<Box
										sx={{
											display: 'flex',
											alignItems: 'center',
										}}
									>
										<Box>
											<Typography
												variant="h6"
												sx={{
													fontWeight: '600',
												}}
											>
												{user.first_name_user} {user.sec_name_user}
											</Typography>
											{/* <Typography
												color="textSecondary"
												sx={{
													fontSize: '13px',
												}}
											>
												{product.post}
											</Typography> */}
										</Box>
									</Box>
								</TableCell>
								<TableCell onClick={() => router.push('/user-management/info/' + user.id)}>
									<Typography color="textSecondary" variant="h6">
										{user.first_lastname_user} {user.sec_lastname_user}
									</Typography>
								</TableCell>
								{/* <TableCell>
									<Chip
										sx={{
											pl: '4px',
											pr: '4px',
											backgroundColor: product.pbg,
											color: '#fff',
										}}
										size="small"
										label={user.email}
									></Chip>
								</TableCell> */}
								<TableCell onClick={() => router.push('/user-management/info/' + user.id)}>
									<Typography variant="h6">{user.email}</Typography>
								</TableCell>
								<TableCell onClick={() => router.push('/user-management/info/' + user.id)}>
									<Typography variant="h6">{user.role}</Typography>
								</TableCell>
								<TableCell onClick={() => router.push('/user-management/info/' + user.id)}>
									<Typography variant="h6">{user.is_active ? '🟢' : '🔴'}</Typography>
								</TableCell>
								<TableCell>
									<Typography variant="h6">
										{user.is_active ? (
											<Button
												size="large"
												sx={{color: '#CD0404'}}
												color="error"
												variant="outlined"
												onClick={() => handleUpdateUser({id: user.id, is_active: false})}
											>
												Deactivate
											</Button>
										) : (
											<Button size="large" variant="contained" onClick={() => handleUpdateUser({id: user.id, is_active: true})}>
												Activate
											</Button>
										)}
									</Typography>
								</TableCell>
							</TableRow>
						);
					})}
				</TableBody>
			</Table>
		</BaseCard>
	);
};

export default UsersTable;
