import React, { useRef, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { Grid, Container, Box, Typography, Stack, TextField, useMediaQuery, useTheme, Button } from '@mui/material';
import Image from 'next/image';
import house3D from '../../../assets/images/logos/casa3D.png';
import selfP from '../../../assets/images/publicity/happyFamily.png';
import mailIcon from '../../../assets/Icons/landingpage-ico-mail.png';
import tower from '../../../assets/Icons/electricityTower.png';
import windSolar from '../../../assets/Icons/windPower.png';

//Diccionaries
import en from '../../../public/languages/en';
import es from '../../../public/languages/es';

export default function AboutUs() {
	const theme = useTheme();
	const isMatch = useMediaQuery(theme.breakpoints.down('md'));
	const router = useRouter()
  const {locale}= router
  const t = locale === 'en' ? en : es

	return (
		<Box sx={{ backgroundColor: 'rgba(119, 182, 234, 50%)', borderRadius: 5, }}>
			<Typography sx={{ fontSize: 60, textAlign: 'center', paddingTop: 3, }}> <b>{t.AboutUs.Title}</b></Typography>
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
					{t.AboutUs.Description1}
					</Typography>
					<br />
					<Typography maxWidth={'80%'} sx={{ textAlign: 'left', paddingTop: '4%', fontSize: 25 }}>
					{t.AboutUs.Description2}
					</Typography>
				</Container>
			</Stack>
		</Box>
	)
}