import React from 'react';
import {Box, Container, Grid, Stack} from '@mui/material';
import BaseCard from '../../src/components/baseCard/BaseCard';
import {OptionButton} from '../../src/components';

const ClientManagement = () => {
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
							<OptionButton title="REGISTER CLIENT" icon="client" link="/user-management/register" />
							<OptionButton title="MODIFY CLIENT" icon="edit" link="/user-management/edit" />
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
