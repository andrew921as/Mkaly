import React from 'react';
import {Box, Container, Grid, Stack} from '@mui/material';
import BaseCard from '../../src/components/baseCard/BaseCard';
import {OptionButton} from '../../src/components';

const UserManagement = () => {
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
				<BaseCard title="USER MANAGEMENT">
					<Box>
						<Stack direction="row" spacing={5}>
							<OptionButton title="REGISTER USER" icon="client" link="/user-management/register" />
							<OptionButton title="MODIFY USER" icon="edit" link="/user-management/edit" />
						</Stack>
						<br />
						<br />
						<Stack direction="row" display="flex" justifyContent="center">
							<OptionButton title="SEARCH USER" icon="search" link="/user-management/search" />
							{/* <OptionButton title="REGISTER PAYMENTS" icon="payment" /> */}
						</Stack>
					</Box>
				</BaseCard>
			</Box>
		</>
	);
};

export default UserManagement;
