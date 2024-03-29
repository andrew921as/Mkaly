import React,{ useRef, useEffect, useState } from 'react';
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

export default function ContacUs() {
	const theme = useTheme();
  const isMatch = useMediaQuery(theme.breakpoints.down('md'));
	const router = useRouter()
  const {locale}= router
  const t = locale === 'en' ? en : es

	return (
		<Box id="contact-us" sx={{ width: '100%', backgroundColor: 'rgba(119, 182, 234, 50%)', paddingTop: 3, borderRadius: 5 }}>
					{/* <Box id="contact-us" sx={{ width: '100%', backgroundColor: 'rgba(253, 216, 93)', paddingTop: 3,borderRadius:5}}> */}
					<Typography variant="h1" sx={{ fontSize: 60, textAlign: 'center' }}>
						{' '}
						<b>{t.ContactUs.Title}</b>
					</Typography>
					<Stack
						direction={isMatch ? 'column' : 'row'}
						alignItems="center"
						justifyContent="flex-start"
						sx={{ paddingBottom: '5%', paddingTop: '2%', paddingLeft: '10%' }}
						spacing={isMatch ? 10 : 20}
					>
						<Image src={mailIcon} />
						<Stack direction={'column'} spacing={3} justifyContent="flex-start" sx={{ width: '60%' }}>
							<TextField id="email-basic" label="Email" variant="outlined" sx={{ backgroundColor: '#fff', borderRadius: 1, width: '80%' }} />
							<TextField id="email-basic" label={t.ContactUs.Place} variant="outlined" sx={{ backgroundColor: '#fff', borderRadius: 1, width: '80%' }} />
							<Button variant='contained' align="center" sx={{ backgroundColor: '#00408F', width: '80%' }}>{t.ContactUs.ButtonSend}</Button>
						</Stack>
					</Stack>
					<Stack direction={'row'} justifyContent="space-evenly" sx={{ paddingBottom: 2 }}>
						<Stack direction="column" alignItems="flex-start" spacing={0}>
							<Typography>{t.ContactUs.Phone}</Typography>
							<Typography>+57 315 868 0329</Typography>
						</Stack>
						<Stack direction="column" alignItems="flex-start" spacing={0}>
							<Typography>{t.ContactUs.NationalL}</Typography>
							<Typography> 01 8000 34 44 44</Typography>
						</Stack>
					</Stack>
				</Box>
	)
}