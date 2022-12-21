import React from 'react';
import {Box, Typography} from '@mui/material';
import Link from 'next/link';
import {getYear} from 'date-fns';
const Footer = () => {
	return (
		<Box sx={{p: 3, textAlign: 'center'}}>
			<Typography>
				© {getYear(Date.now())} All rights reserved by{' '}
				<Link href="#">
					<a>Energeia</a>
				</Link>{' '}
			</Typography>
		</Box>
	);
};

export default Footer;
