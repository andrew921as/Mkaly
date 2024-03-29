import React, {useContext, useState, useEffect} from 'react';
import {Box, Container, Grid, Stack} from '@mui/material';
import BaseCard from '../../src/components/baseCard/BaseCard';
import {OptionButton} from '../../src/components';

import {UserContext} from '../../src/context/UserContext';
import {useRouter} from 'next/router';

import es from '../../public/languages/es';
import en from '../../public/languages/en';

const UserManagement = () => {
	const router = useRouter();
	const {user, isUserAuthenticated} = useContext(UserContext);

	const {locale}= router
	const t = locale === 'en' ? en : es


	// useEffect(() => {
	// 	if (!isUserAuthenticated()) {
	// 		router.push('/');
	// 	}

	// 	if (user.role != 'admin') {
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
				<BaseCard title={t.userManageP.Title}>
					<Box>
						<Stack direction="row" spacing={5}>
							<OptionButton title={t.userManageP.registeU} icon="client" link="/user-management/register" />
							<OptionButton title={t.userManageP.modifyU} icon="edit" link="/user-management/edit" />
						</Stack>
						<br />
						<br />
						<Stack direction="row" display="flex" justifyContent="center">
							<OptionButton title={t.userManageP.searchU} icon="search" link="/user-management/search" />
							{/* <OptionButton title="REGISTER PAYMENTS" icon="payment" /> */}
						</Stack>
					</Box>
				</BaseCard>
			</Box>
		</>
	);
};

export default UserManagement;
