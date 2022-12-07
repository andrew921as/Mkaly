import React, {useState} from 'react';
import {Grid} from '@mui/material';
import BlogCard from '../src/components/dashboard/BlogCard';
import SalesOverview from '../src/components/dashboard/SalesOverview';
import DailyActivity from '../src/components/dashboard/DailyActivity';
import ProductPerfomance from '../src/components/dashboard/ProductPerfomance';

const Dashboard = () => {
	const [userRol, setUserRol] = useState('manager');

	if (userRol === 'client') {
		return <ClientDashboard />;
	}

	if (userRol === 'admin') {
		return <AdminDashboard />;
	}

	if (userRol === 'manager') {
		return <ManagerDashboard />;
	}
};

const ClientDashboard = () => {
	return <p>Dashboard cliente</p>;
};

// ADMIN
const AdminDashboard = () => {
	const users = [
		{
		time: "1",
		color: "secondary.main",
		text: "Admins",
	  },
	  {
		time: "10",
		color: "#FFFF00",
		text: "Clients",
	  },
	  {
		time: "20",
		color: "success.main",
		text: "Operators",
	  },
	  {
		time: "5",
		color: "primary.main",
		text: "Managers",
	  },
	];
	return (
		<>
			<Grid container spacing={0}>
				<Grid item xs={12} lg={12}>
					<SalesOverview title='Sales'/>
				</Grid>
				{/* ------------------------- row 1 ------------------------- */}
				<Grid item xs={12} lg={4}>
					<DailyActivity title='Users' activities= {users}/>
				</Grid>
				<Grid item xs={12} lg={8}>
					<SalesOverview title='Users simultaneously logged on'/>
				</Grid>
			</Grid>
		</>
	);
};

// MANAGER
const ManagerDashboard = () => {
	const clientState = [
		{
		time: "1",
		color: "secondary.main",
		text: "In debt",
	  },
	  {
		time: "20",
		color: "success.main",
		text: "Up to date",
	  },
	];
	const serviceState = [
		{
		time: "1",
		color: "secondary.main",
		text: "Suspended",
	  },
	  {
		time: "20",
		color: "success.main",
		text: "Active",
	  },
	];
	return (
		<>
			<Grid container spacing={0}>
				<Grid item xs={12} lg={12}>
					<SalesOverview title='Sales'/>
				</Grid>
				{/* ------------------------- row 1 ------------------------- */}
				<Grid item xs={12} lg={4}>
					<DailyActivity title='Clients State' activities= {clientState}/>
					<DailyActivity title='Active/Suspended services' activities= {serviceState}/>
				</Grid>
				<Grid item xs={12} lg={8}>
					<SalesOverview title='Online vs Face-to-face Payments'/>
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
