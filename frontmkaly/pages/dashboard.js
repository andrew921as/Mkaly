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

import es from '../public/languages/es';
import en from '../public/languages/en';

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
	const router = useRouter();
	const {locale}= router
	const t = locale === 'en' ? en : es
	const users = [
		{
			time: '1',
			color: 'secondary.main',
			text: t.Dashboar.adminD.users.Admins,
		},
		{
			time: '10',
			color: '#FFFF00',
			text: t.Dashboar.adminD.users.Clients,
		},
		{
			time: '20',
			color: 'success.main',
			text: t.Dashboar.adminD.users.Operators,
		},
		{
			time: '5',
			color: 'primary.main',
			text: t.Dashboar.adminD.users.Managers,
		},
	];
	return (
		<>
			<Grid container spacing={0}>
				<Grid item xs={12} lg={12}>
					<SalesOverview title={t.Dashboar.adminD.sales}/>
				</Grid>
				{/* ------------------------- row 1 ------------------------- */}
				<Grid item xs={12} lg={4}>
					<DailyActivity title={t.Dashboar.adminD.users.Title} activities={users} />
				</Grid>
				<Grid item xs={12} lg={8}>
					<SalesOverview title={t.Dashboar.adminD.usersSimus} />
				</Grid>
			</Grid>
		</>
	);
};

// MANAGER
const ManagerDashboard = () => {
	const router = useRouter();
	const {locale}= router
	const t = locale === 'en' ? en : es
	const clientState = [
		{
			time: '1',
			color: 'secondary.main',
			text: t.Dashboar.managerD.clientSservices.clientDebt,
		},
		{
			time: '20',
			color: 'success.main',
			text: t.Dashboar.managerD.clientSservices.clientUpto,
		},
	];
	const serviceState = [
		{
			time: '1',
			color: 'secondary.main',
			text: t.Dashboar.managerD.clientSservices.clientSus,
		},
		{
			time: '20',
			color: 'success.main',
			text: t.Dashboar.managerD.clientSservices.clientActive,
		},
	];
	return (
		<>
			<Grid container spacing={0}>
				<Grid item xs={12} lg={12}>
					<SalesOverview title={t.Dashboar.managerD.sales} />
				</Grid>
				{/* ------------------------- row 1 ------------------------- */}
				<Grid item xs={12} lg={4}>
					<DailyActivity title={t.Dashboar.managerD.clientSta} activities={clientState} />
					<DailyActivity title={t.Dashboar.managerD.activeSuspend} activities={serviceState} />
				</Grid>
				<Grid item xs={12} lg={8}>
					<SalesOverview title={t.Dashboar.managerD.onlineFace} />
				</Grid>
			</Grid>
		</>
	);
};

// OPERATOR
const OperatorDashboard = () => {
	const router = useRouter();
	const {locale}= router
	const t = locale === 'en' ? en : es
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
				<BaseCard title={t.Dashboar.operatorD.title}>
					<Stack direction="row" spacing={10}>
						<OptionButton title={t.Dashboar.operatorD.registerCli} icon="client" link="/client-management/register" />
						<OptionButton title={t.Dashboar.operatorD.modifyCli} icon="edit" link="/client-management/edit" />
					</Stack>
					<br />
					<br />
					<Stack direction="row" spacing={10}>
						<OptionButton title={t.Dashboar.operatorD.searchCli} icon="search" link="/client-management/search" />
						<OptionButton title={t.Dashboar.operatorD.registerPay} icon="payment" link="/client-management/register" />
					</Stack>
				</BaseCard>
			</Box>
		</>
	);
};

export default Dashboard;
