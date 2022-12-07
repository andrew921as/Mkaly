import {Box, Stack} from '@mui/material';
import Image from 'next/image';
import React from 'react';
import {colors} from '../../styles/globals';

// Icons
import ClientIcon from '../../assets/icons/client-icon.png';
import SearchIcon from '../../assets/icons/search-icon.png';
import EditIcon from '../../assets/icons/edit-icon.png';
import CreditCardIcon from '../../assets/icons/credit-card-icon.png';

const OptionButton = ({title, icon}) => {
	const icons = {
		client: <Image src={ClientIcon} width={60} height={60} />,
		search: <Image src={SearchIcon} width={60} height={60} />,
		edit: <Image src={EditIcon} width={60} height={60} />,
		payment: <Image src={CreditCardIcon} width={60} height={60} />,
	};

	return (
		<Box
			sx={{
				backgroundColor: colors.blue_200,
				color: 'white',
				borderRadius: 10,
				width: '100%',
				minHeight: 200,
				cursor: 'pointer',
				display: 'flex',
				justifyContent: 'center',
				alignItems: 'center',
			}}
		>
			<div style={{display: 'flex', alignItems: 'center'}}>
				<div style={{width: '40%', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>{icons[icon]}</div>
				<span style={{width: '2px', height: '150px', marginInline: 10, backgroundColor: 'white'}}></span>
				<h2 style={{textAlign: 'center'}}>{title}</h2>
			</div>
		</Box>
	);
};

export default OptionButton;
