import React, {useContext, useState, useEffect} from 'react';
import {Box, Container, Grid, Stack} from '@mui/material';
import BaseCard from '../../src/components/baseCard/BaseCard';
import {OptionButton} from '../../src/components';
import {UserContext} from '../../src/context/UserContext';
import {useRouter} from 'next/router';

const ClientManagement = () => {
	const router = useRouter();
	const {user, isUserAuthenticated} = useContext(UserContext);

	// useEffect(() => {
	// 	if (!isUserAuthenticated()) {
	// 		router.push('/');
	// 	} else if (user.role != 'operator' || user.role != 'admin') {
	// 		router.push('/dashboard');
	// 	}
	// }, [user]);

	return (
		<>
			<Box
				sx={{
					// backgroundColor: 'red',
					width: '100%',
					height: '100%',
					display: 'flex',
					justifyContent: 'center',
					// alignItems: 'center',
				}}
			>
				<BaseCard title="CLIENT MANAGEMENT">
					<Box>
						<Stack direction="row" spacing={5}>
							<OptionButton title="REGISTER CLIENT" icon="client" link="/client-management/register" />
							<OptionButton title="MODIFY CLIENT" icon="edit" link="/client-management/edit" />
						</Stack>
						<br />
						<br />
						{/* <OptionButton title="SEARCH USER" icon="search" link="/user-management/search" />*/}
					</Box>
				</BaseCard>
			</Box>
		</>
	);
};

export default ClientManagement;
