import React, {useContext, useState, useEffect} from 'react';
import {Grid} from '@mui/material';
import {UserTable, ClientTable} from '../../src/components';

import {UserContext} from '../../src/context/UserContext';
import {useRouter} from 'next/router';

import es from '../../public/languages/es';
import en from '../../public/languages/en';

const SearchUser = () => {
	const router = useRouter();
	const {locale} = router;
	const t = locale === 'en' ? en : es;
	// const router = useRouter();
	// const {user, isUserAuthenticated} = useContext(UserContext);

	// useEffect(() => {
	// 	if (!isUserAuthenticated()) {
	// 		router.push('/');
	// 	} else if (user.role != 'admin') {
	// 		router.push('/dashboard');
	// 	}
	// }, [user]);

	return (
		<Grid container spacing={0}>
			<Grid item xs={12} lg={12}>
				<ClientTable title={t.ClientsTable.title} />
			</Grid>
		</Grid>
	);
};

export default SearchUser;
