import React from 'react';
import {Grid} from '@mui/material';
import {UserTable} from '../../src/components';

const SearchUser = () => {
	return (
		<Grid container spacing={0}>
			<Grid item xs={12} lg={12}>
				<UserTable title="Table of users" />
			</Grid>
		</Grid>
	);
};

export default SearchUser;
