import React, {useState} from 'react';
import {Box, Container, Grid, Stack} from '@mui/material';
import BlogCard from '../src/components/dashboard/BlogCard';
import SalesOverview from '../src/components/dashboard/SalesOverview';
import DailyActivity from '../src/components/dashboard/DailyActivity';
import ProductPerfomance from '../src/components/dashboard/ProductPerfomance';
import BaseCard from '../src/components/baseCard/BaseCard';
import {OptionButton} from '../src/components';

const Dashboard = () => {
	const [userRol, setUserRol] = useState('operator');

	if (userRol === 'client') {
		return <ClientDashboard />;
	}

	if (userRol === 'admin') {
		return <AdminDashboard />;
	}

	if (userRol === 'operator') {
		return <OperatorDashboard />;
	}
};

const ClientDashboard = () => {
	return <p>Dashboard cliente</p>;
};

// ADMIN
const AdminDashboard = () => {
	return (
		<>
			<Grid container spacing={0}>
				<Grid item xs={12} lg={12}>
					<SalesOverview />
				</Grid>
				{/* ------------------------- row 1 ------------------------- */}
				<Grid item xs={12} lg={4}>
					<DailyActivity />
				</Grid>
				<Grid item xs={12} lg={8}>
					<ProductPerfomance />
				</Grid>
				<Grid item xs={12} lg={12}>
					<BlogCard />
				</Grid>
			</Grid>
		</>
	);
};

// MANAGER
const ManagerDashboard = () => {
	return (
		<>
			<Grid container spacing={0}>
				<Grid item xs={12} lg={12}>
					<SalesOverview />
				</Grid>
				{/* ------------------------- row 1 ------------------------- */}
				<Grid item xs={12} lg={4}>
					<DailyActivity />
				</Grid>
				<Grid item xs={12} lg={8}>
					<ProductPerfomance />
				</Grid>
				<Grid item xs={12} lg={12}>
					<BlogCard />
				</Grid>
			</Grid>
		</>
	);
};

// OPERATOR
const OperatorDashboard = () => {
	return (
		<>
			{/* Container */}
			<Box
				sx={{
					// backgroundColor: 'red',
					width: '100%',
					height: '100%',
					display: 'flex',
					justifyContent: 'center',
				}}
			>
				<BaseCard title="GESTIÓN CLIENTE">
					<Stack direction="row" spacing={10}>
						<OptionButton title="REGISTRAR CLIENTE" icon="client" />
						<OptionButton title="MODIFICAR CLIENTE" icon="edit" />
					</Stack>
					<br />
					<br />
					<Stack direction="row" spacing={10}>
						<OptionButton title="CONSULTAR CLIENTE" icon="search" />
						<OptionButton title="REGISTRAR PAGO" icon="payment" />
					</Stack>
				</BaseCard>
			</Box>
		</>
	);
};

export default Dashboard;
