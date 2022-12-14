import React, {useContext, useState, useEffect} from 'react';
import {Grid} from '@mui/material';
import {UserTable} from '../../src/components';

import {UserContext} from '../../src/context/UserContext';
import {useRouter} from 'next/router';

const SearchUser = () => {
	const router = useRouter();
	const {user, isUserAuthenticated} = useContext(UserContext);

	useEffect(() => {
		if (!isUserAuthenticated()) {
			router.push('/');
		} else if (user.role != 'admin') {
			router.push('/dashboard');
		}
	}, [user]);

	return (
		<Grid container spacing={0}>
			<Grid item xs={12} lg={12}>
				<UserTable title="Table of users" />
			</Grid>
		</Grid>
	);
};

export default SearchUser;
