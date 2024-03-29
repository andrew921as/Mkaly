import React,{ useState } from 'react';
import { useRouter } from 'next/router';
import { Grid, Container, Box, Typography, Stack, TextField, useMediaQuery, useTheme, Button } from '@mui/material';
import { Navbar } from '../src/layouts/navBar/navVar';
//Diccionaries
import en from '../public/languages/en';
import es from '../public/languages/es';
//Componentes
import Image from 'next/image';
import selfP from '../assets/images/publicity/happyFamily.png';
import P1 from '../assets/images/publicity/Publicidad1.png';
import Animation from '../src/components/Animation.js';
import ContacUs from '../src/components/landingP/ContactUs'
import NewProject from '../src/components/landingP/NewProject';
import AboutUs from '../src/components/landingP/AboutUs';

export default function Index() {
	const theme = useTheme();
	const isMatch = useMediaQuery(theme.breakpoints.down('md'));
	const router = useRouter()
	const {locale}= router
	const t = locale === 'en' ? en : es

	return (
		<Grid container spacing={0} sx={{ padding: 0, }}>
			<Navbar />
			<Stack id="Start" spacing={0} sx={{ width: '100%' }}>
				<Box sx={{ display: 'inline-block', position: 'relative' }}>
					<div class="flex justify-center md:m-0 mb-10">
						<div class="flex justify-center"><Typography sx={{ fontSize: 60, textAlign: 'center', marginTop: '15%' }}><b>{t.LandingP.Title}</b> <br /><p> {t.LandingP.Subtitle}</p> </Typography></div>
						{isMatch ? '' : <div className='z-10'><Image src={selfP} height={600} width={600} /></div>}
					</div>
					<div className='bg-[#00408F] w-full h-[30%] md:absolute top-[50%]  flex justify-left p-[2%] px-[16%]'>
						<div className='flex flex-col justify-center items-center gap-5'>
							<div><p className='text-xl md:text-2xl text-white max-w-md text-center'>{t.LandingP.Description}</p></div>
							<Button variant='contained' sx={{ backgroundColor: '#FDD85D', width: '65%', color: 'black', fontSize: {md:'25px', xs: '20px'}, borderRadius: '20px' }}>{t.LandingP.CallButton}</Button>
						</div>
					</div>
				</Box>
				{/* About us section ------------------------------------------------------------------------------------*/}
				<div id='AboutUs'></div>
				<br/>
				<Animation>
					<AboutUs/>
				</Animation>
				{/* This is the new projects section--------------------------------------------------------------------------------------------------------------------- */}
				<div id='newProjects'></div>
				<Animation>
					<NewProject/>
				</Animation>
				<Image src={P1} responsive/>
				<br/>
				{/* This is the contact us section--------------------------------------------------------------------------------------------------------------------- */}
				<div id='contact-us'></div>
				{
				<Animation>
					<ContacUs/>
				</Animation>
				}
			</Stack>
		</Grid>
	);
}
