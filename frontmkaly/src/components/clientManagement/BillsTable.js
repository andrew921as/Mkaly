import React, {useContext, useEffect, useState} from 'react';
import {useRouter} from 'next/router';
import {
	Typography,
	Box,
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableRow,
	FormControl,
	InputLabel,
	InputAdornment,
	Input,
	Button,
	Badge,
} from '@mui/material';
import BaseCard from '../baseCard/BaseCard';

// API
import {getClientBills} from '../../functions/requests';
import {UserContext} from '../../context/UserContext';

import en from '../../../public/languages/en';
import es from '../../../public/languages/es';

const BillsTable = ({title}) => {
	const router = useRouter();
	const {user} = useContext(UserContext);
	const [bills, setBills] = useState([]);
	const [allBills, setAllBills] = useState([]);

	const {locale} = router;
	const t = locale === 'en' ? en : es;

	const fetchBills = async () => {
		const {data} = await getClientBills(user.id);

		if (!data.Bill) {
			return;
		}

		const filteredBills = data.Bill.filter((bill) => {
			if (bill.length > 0) {
				return bill[0];
			}
		});

		// console.log(filteredBills);
		// const sortedUsers = clients.sort((a, b) => {
		// 	let fa = a.first_name_user.toLowerCase(),
		// 		fb = b.first_name_user.toLowerCase();

		// 	if (fa < fb) {
		// 		return -1;
		// 	}
		// 	if (fa > fb) {
		// 		return 1;
		// 	}
		// 	return 0;
		// });
		setBills(filteredBills);
		setAllBills(filteredBills);
	};

	const handleSearchBill = async (data) => {
		const filteredBills = allBills.filter((bill) => {
			return bill[0].bill_number.includes(data.toLowerCase());
		});
		setBills(filteredBills);
	};

	useEffect(() => {
		fetchBills();
	}, []);

	return (
		<BaseCard title={title}>
			<FormControl variant="standard">
				<InputLabel htmlFor="search-user">{t.BillTable.search}</InputLabel>
				<Input
					id="search-user"
					onChange={(e) => handleSearchBill(e.target.value)}
					startAdornment={
						<InputAdornment position="start">
							<p>🔎</p>
						</InputAdornment>
					}
				/>
			</FormControl>
			<Table
				aria-label="simple table"
				sx={{
					mt: 3,
					whiteSpace: 'nowrap',
				}}
			>
				<TableHead>
					<TableRow>
						<TableCell>
							<Typography color="textSecondary" variant="h6">
								{t.BillTable.billNumber}
							</Typography>
						</TableCell>
						<TableCell>
							<Typography color="textSecondary" variant="h6">
								{t.BillTable.expeditionDate}
							</Typography>
						</TableCell>
						<TableCell>
							<Typography color="textSecondary" variant="h6">
								{t.BillTable.expirationDate}
							</Typography>
						</TableCell>
						<TableCell>
							<Typography color="textSecondary" variant="h6">
								{t.BillTable.status}
							</Typography>
						</TableCell>
						<TableCell>
							<Typography color="textSecondary" variant="h6">
								{t.BillTable.totalPayout}
							</Typography>
						</TableCell>
						<TableCell>
							<Typography color="textSecondary" variant="h6">
								{t.BillTable.isPaid}
							</Typography>
						</TableCell>
					</TableRow>
				</TableHead>
				<TableBody>
					{bills.map((billArray, index) => {
						const position = index + 1;
						let bill = billArray[0];
						//console.log(user);
						return (
							<TableRow key={bill.id}>
								<TableCell>
									<Typography
										sx={{
											fontSize: '15px',
											fontWeight: '500',
										}}
									>
										{bill.bill_number}
									</Typography>
								</TableCell>
								<TableCell>
									<Typography variant="h6">{bill.expedition_date}</Typography>
								</TableCell>
								<TableCell>
									<Typography variant="h6">{bill.expiration_date}</Typography>
								</TableCell>
								<TableCell>
									<Badge
										color={bill.billing_status == 'paid' ? 'success' : bill.billing_status == 'pending' ? 'info' : 'error'}
										badgeContent={
											bill.billing_status == 'paid' ? t.BillTable.success : bill.billing_status == 'pendiente' ? t.BillTable.pending : t.BillTable.mora
										}
									></Badge>
								</TableCell>
								<TableCell>
									<Typography variant="h6">{bill.total_payout}</Typography>
								</TableCell>
								<TableCell>
									<Typography variant="h6">{bill.billing_status !== 'pending' ? '🟢' : '🔴'}</Typography>
								</TableCell>
							</TableRow>
						);
					})}
				</TableBody>
			</Table>
		</BaseCard>
	);
};

export default BillsTable;
