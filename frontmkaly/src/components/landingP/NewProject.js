import React, { useRef, useEffect, useState } from 'react';
import { Grid, Container, Box, Typography, Stack, TextField, useMediaQuery, useTheme, Button } from '@mui/material';
import Image from 'next/image';
import { useRouter } from 'next/router';
import house3D from '../../../assets/images/logos/casa3D.png';
import selfP from '../../../assets/images/publicity/happyFamily.png';
import mailIcon from '../../../assets/Icons/landingpage-ico-mail.png';
import tower from '../../../assets/Icons/electricityTower.png';
import windSolar from '../../../assets/Icons/windPower.png';
//Diccionaries
import en from '../../../public/languages/en';
import es from '../../../public/languages/es';

export default function NewProject() {
	const theme = useTheme();
  const isMatch = useMediaQuery(theme.breakpoints.down('md'));
  const router = useRouter()
  const {locale}= router
  const t = locale === 'en' ? en : es
  
	return (
		<Stack
			direction={isMatch ? 'column' : 'row'}
			alignItems="center"
			justifyContent="space-around"
			sx={{
				paddingTop: 15,
				paddingBottom: 15,
			}}
		>
			<Box
				sx={{
					width: isMatch ? '90%' : '50%',
				}}
			>
				<Typography
					sx={{ fontSize: 60, textAlign: 'center', paddingTop: 3, }}
				> <b>{t.NewProject.Title1} <br /> {t.NewProject.Title2}</b></Typography>
				<br />
				<Typography
					sx={{
						fontSize: 25,
					}}
				>
					<p>{t.NewProject.Description1} </p><br />

					<p>{t.NewProject.Description2}</p><br />

					<p>{t.NewProject.Description3}</p>
				</Typography>
			</Box>

			{/** raya aqui debe de ir una raya horizontal*/}
			<Box sx={{ width: isMatch ? '90%' : 2, backgroundColor: '#000000', height: isMatch ? 2 : '100%', margin: 10 }}></Box>

			<Stack
				sx={{
					width: isMatch ? '90%' : '45%',
				}}
			>
				<Box
					sx={{
						width: isMatch ? '90%' : '90%',
						backgroundColor: 'rgba(250, 214, 67, 50%)',
						borderRadius: 5,
						display: 'flex',
						alignItems: 'center',
						padding: 2,
					}}
				>
					<div className='w-1/2'>
						<Image src={tower} />
					</div>
					<Typography
						sx={{
							fontSize: 25,
							margin: 5
						}}
					>
						{t.NewProject.Expansion}
					</Typography>
				</Box>

				<br />

				<Box
					mt={5}
					sx={{
						width: isMatch ? '90%' : '90%',
						backgroundColor: 'rgba(250, 214, 67, 50%)',
						borderRadius: 5,
						display: 'flex',
						alignItems: 'center',
						padding: 2,

					}}
				>
					<div className='w-1/2	'>
						<Image src={windSolar} />
					</div>

					<Typography
						sx={{
							fontSize: 25,
							margin: 5
						}}
					>
						{t.NewProject.Energy}
					</Typography>
				</Box>
			</Stack>
		</Stack>
	)
}