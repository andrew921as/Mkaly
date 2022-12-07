import React, { useState } from 'react';
import { Grid } from '@mui/material';
import BlogCard from '../src/components/dashboard/BlogCard';
import SalesOverview from '../src/components/dashboard/SalesOverview';
import DailyActivity from '../src/components/dashboard/DailyActivity';
import ProductPerfomance from '../src/components/dashboard/ProductPerfomance';
import InvoiceCard from '../src/components/dashboard/InvoiceCard';

const Dashboard = () => {
	const [userRol, setUserRol] = useState('client');

	if (userRol === 'client') {
		return <ClientDashboard />;
	}

	if (userRol === 'admin') {
		return <AdminDashboard />;
	}
};

const ClientDashboard = () => {
	return (
		<>
			<Grid container spacing={0}>
				<Grid item xs={12}>
					<ProductPerfomance />
				</Grid>
				<Grid item xs={4}>
					<InvoiceCard />
				</Grid>
			</Grid>
		</>
	);
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

export default Dashboard;
