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

// API
import {getUsers, updateUser} from '../../functions/requests';

const users = [
	{
		id: '123412155',
		firstName: 'Sunil Joshi',
		lastName: 'Web Designer',
		email: 'joshi@mail.com',
		// pbg: "primary.main",
		// budget: "3.9",
	},
	{
		id: '123412156',
		firstName: 'Sunil Joshi',
		lastName: 'Web Designer',
		email: 'sunil@mail.com',
		// pbg: "primary.main",
		// budget: "3.9",
	},
	//   {
	//     id: "2",
	//     name: "Andrew McDownland",
	//     post: "Project Manager",
	//     pname: "Real Homes WP Theme",
	//     priority: "Medium",
	//     pbg: "secondary.main",
	//     budget: "24.5",
	//   },
	//   {
	//     id: "3",
	//     name: "Christopher Jamil",
	//     post: "Project Manager",
	//     pname: "MedicalPro WP Theme",
	//     priority: "High",
	//     pbg: "error.main",
	//     budget: "12.8",
	//   },
	//   {
	//     id: "4",
	//     name: "Nirav Joshi",
	//     post: "Frontend Engineer",
	//     pname: "Hosting Press HTML",
	//     priority: "Critical",
	//     pbg: "success.main",
	//     budget: "2.4",
	//   },
];

const UsersTable = ({title}) => {
	const router = useRouter();
	const [users, setUsers] = useState([]);
	const [allUsers, setAllUsers] = useState([]);

	const fetchUsers = async () => {
		const {data} = await getUsers();
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
				<InputLabel htmlFor="search-user">Search user</InputLabel>
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
								First Name
							</Typography>
						</TableCell>
						<TableCell>
							<Typography color="textSecondary" variant="h6">
								Last Name
							</Typography>
						</TableCell>
						<TableCell>
							<Typography color="textSecondary" variant="h6">
								Email
							</Typography>
						</TableCell>
						<TableCell>
							<Typography color="textSecondary" variant="h6">
								Role
							</Typography>
						</TableCell>
						<TableCell>
							<Typography color="textSecondary" variant="h6">
								Status
							</Typography>
						</TableCell>
						<TableCell>
							<Typography color="textSecondary" variant="h6">
								Activate/Deactivate
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
												onClick={() => handleUpdateUser({...user, is_active: false})}
											>
												Deactivate
											</Button>
										) : (
											<Button size="large" variant="contained" onClick={() => handleUpdateUser({...user, is_active: true})}>
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
