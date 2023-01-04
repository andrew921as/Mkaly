import React from 'react';

import {Card, CardContent, Divider, Box, Typography, Chip} from '@mui/material';

const BaseCard = (props) => {
	return (
		<Card>
			<Box p={2} display="flex" alignItems="center">
				<Typography variant="h4">{props.title}</Typography>
				{/* <h1 className="font-black text-4xl ml-16">{title}</h1> */}
			</Box>

			<CardContent>{props.children}</CardContent>
		</Card>
	);
};

export default BaseCard;
