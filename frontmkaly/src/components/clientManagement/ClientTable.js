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
import {getUsers, updateUser} from '../../functions/requests';

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

		const clients = data.users.filter((user) => user.role == 'client');

		const sortedUsers = clients.sort((a, b) => {
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
			const res = await updateUser(userData.id, userData);
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
				<InputLabel htmlFor="search-user">{t.ClientsTable.search}</InputLabel>
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
								{t.ClientsTable.first_name}
							</Typography>
						</TableCell>
						<TableCell>
							<Typography color="textSecondary" variant="h6">
								{t.ClientsTable.first_last_name}
							</Typography>
						</TableCell>
						<TableCell>
							<Typography color="textSecondary" variant="h6">
								{t.ClientsTable.Email}
							</Typography>
						</TableCell>
						<TableCell>
							<Typography color="textSecondary" variant="h6">
								{t.ClientsTable.status}
							</Typography>
						</TableCell>
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
									<Typography variant="h6">
										{user.first_name_user} {user.sec_name_user}
									</Typography>
								</TableCell>
								<TableCell onClick={() => router.push('/user-management/info/' + user.id)}>
									<Typography variant="h6">
										{user.first_lastname_user} {user.sec_lastname_user}
									</Typography>
								</TableCell>
								<TableCell onClick={() => router.push('/user-management/info/' + user.id)}>
									<Typography variant="h6">{user.email}</Typography>
								</TableCell>
								<TableCell onClick={() => router.push('/user-management/info/' + user.id)}>
									<Typography variant="h6">{user.is_active ? '🟢' : '🔴'}</Typography>
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
