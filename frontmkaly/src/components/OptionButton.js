import {Box, Stack} from '@mui/material';
import Image from 'next/image';
import React from 'react';
import Link from 'next/link';
import {colors} from '../../styles/globals';

// Icons
import ClientIcon from '../../assets/icons/client-icon.png';
import SearchIcon from '../../assets/icons/search-icon.png';
import EditIcon from '../../assets/icons/edit-icon.png';
import CreditCardIcon from '../../assets/icons/credit-card-icon.png';

const OptionButton = ({title, icon, link = '/'}) => {
	const icons = {
		client: <Image src={ClientIcon} width={60} height={60} />,
		search: <Image src={SearchIcon} width={60} height={60} />,
		edit: <Image src={EditIcon} width={60} height={60} />,
		payment: <Image src={CreditCardIcon} width={60} height={60} />,
	};

	return (
		<Link href={link}>
			<Box
				sx={{
					backgroundColor: colors.blue_200,
					color: 'white',
					borderRadius: 10,
					width: '100%',
					maxWidth: 400,
					minHeight: 200,
					minWidth: 200,
					cursor: 'pointer',
					display: 'flex',
					justifyContent: 'space-around',
					alignItems: 'center',
				}}
			>
				<div style={{display: 'flex', alignItems: 'center', width: '100%'}}>
					<div style={{width: '60%', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>{icons[icon]}</div>
					<span style={{width: '2px', height: '150px', marginInline: 10, backgroundColor: 'white'}}></span>
					<div style={{display: 'flex', justifyContent: 'center', width: '100%'}}>
						<h2 style={{textAlign: 'center'}}>{title}</h2>
					</div>
				</div>
			</Box>
		</Link>
	);
};

export default OptionButton;
