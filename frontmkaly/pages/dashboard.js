import React, {useContext, useEffect, useState} from 'react';
import {Box, Container, Grid, Stack} from '@mui/material';
import BlogCard from '../src/components/dashboard/BlogCard';
import SalesOverview from '../src/components/dashboard/SalesOverview';
import DailyActivity from '../src/components/dashboard/DailyActivity';
import ProductPerfomance from '../src/components/dashboard/ProductPerfomance';
import InvoiceCard from '../src/components/dashboard/InvoiceCard';
import BaseCard from '../src/components/baseCard/BaseCard';
import {OptionButton} from '../src/components';
import {UserContext} from '../src/context/UserContext';
import {useRouter} from 'next/router';

const Dashboard = () => {
	const router = useRouter();
	const {user, isUserAuthenticated} = useContext(UserContext);

	console.log(user);

	// useEffect(() => {
	// 	if (!isUserAuthenticated()) {
	// 		router.push('/');
	// 	}
	// }, [user]);

	if (user?.role === 'client') {
		return <ClientDashboard />;
	}

	if (user?.role === 'admin') {
		return <AdminDashboard />;
	}

	if (user?.role === 'manager') {
		return <ManagerDashboard />;
	}

	if (user?.role === 'operator') {
		return <OperatorDashboard />;
	}

	return <></>;
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
	const users = [
		{
			time: '1',
			color: 'secondary.main',
			text: 'Admins',
		},
		{
			time: '10',
			color: '#FFFF00',
			text: 'Clients',
		},
		{
			time: '20',
			color: 'success.main',
			text: 'Operators',
		},
		{
			time: '5',
			color: 'primary.main',
			text: 'Managers',
		},
	];
	return (
		<>
			<Grid container spacing={0}>
				<Grid item xs={12} lg={12}>
					<SalesOverview title="Sales" />
				</Grid>
				{/* ------------------------- row 1 ------------------------- */}
				<Grid item xs={12} lg={4}>
					<DailyActivity title="Users" activities={users} />
				</Grid>
				<Grid item xs={12} lg={8}>
					<SalesOverview title="Users simultaneously logged on" />
				</Grid>
			</Grid>
		</>
	);
};

// MANAGER
const ManagerDashboard = () => {
	const clientState = [
		{
			time: '1',
			color: 'secondary.main',
			text: 'In debt',
		},
		{
			time: '20',
			color: 'success.main',
			text: 'Up to date',
		},
	];
	const serviceState = [
		{
			time: '1',
			color: 'secondary.main',
			text: 'Suspended',
		},
		{
			time: '20',
			color: 'success.main',
			text: 'Active',
		},
	];
	return (
		<>
			<Grid container spacing={0}>
				<Grid item xs={12} lg={12}>
					<SalesOverview title="Sales" />
				</Grid>
				{/* ------------------------- row 1 ------------------------- */}
				<Grid item xs={12} lg={4}>
					<DailyActivity title="Clients State" activities={clientState} />
					<DailyActivity title="Active/Suspended services" activities={serviceState} />
				</Grid>
				<Grid item xs={12} lg={8}>
					<SalesOverview title="Online vs Face-to-face Payments" />
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
				<BaseCard title="CLIENT MANAGEMENT">
					<Stack direction="row" spacing={10}>
						<OptionButton title="REGISTER CLIENT" icon="client" link="/client-management/register" />
						<OptionButton title="MODIFY CLIENT" icon="edit" link="/client-management/edit" />
					</Stack>
					<br />
					<br />
					<Stack direction="row" spacing={10}>
						<OptionButton title="SEARCH CLIENT" icon="search" link="/client-management/search" />
						<OptionButton title="REGISTER PAYMENTS" icon="payment" link="/client-management/register" />
					</Stack>
				</BaseCard>
			</Box>
		</>
	);
};

export default Dashboard;
