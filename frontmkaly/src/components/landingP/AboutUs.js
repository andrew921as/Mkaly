import React, { useRef, useEffect, useState } from 'react';
import { Grid, Container, Box, Typography, Stack, TextField, useMediaQuery, useTheme, Button } from '@mui/material';
import Image from 'next/image';
import house3D from '../../../assets/images/logos/casa3D.png';
import selfP from '../../../assets/images/publicity/happyFamily.png';
import mailIcon from '../../../assets/Icons/landingpage-ico-mail.png';
import tower from '../../../assets/Icons/electricityTower.png';
import windSolar from '../../../assets/Icons/windPower.png';

export default function AboutUs() {
	const theme = useTheme();
	const isMatch = useMediaQuery(theme.breakpoints.down('md'));

	return (
		<Box sx={{ backgroundColor: 'rgba(119, 182, 234, 50%)', borderRadius: 5, }}>
			<Typography sx={{ fontSize: 60, textAlign: 'center', paddingTop: 3, }}> <b>ABOUT US</b></Typography>
			<Stack
				direction={isMatch ? 'column' : 'row'}
				alignItems="center"
				spacing={isMatch ? 4 : 0}
				sx={{ paddingBottom: 9 }}
			>
				<Container
					sx={{
						width: isMatch ? '90%' : '45%',
					}}
				>
					<Image src={house3D} />
				</Container>
				<Container
					sx={{
						width: isMatch ? '90%' : '50%',
					}}
				>
					<Typography maxWidth={'80%'} sx={{ textAlign: 'left', paddingTop: '4%', fontSize: 25, }}>
						We are a multinational company that have been providing energy to more than 50 citys around the world.
					</Typography>
					<br />
					<Typography maxWidth={'80%'} sx={{ textAlign: 'left', paddingTop: '4%', fontSize: 25 }}>
						Providing a felling of trust whit our 30 years of experience bringing an excellent service, always been respectful and trying to solve any problem in record time
					</Typography>
				</Container>
			</Stack>
		</Box>
	)
}