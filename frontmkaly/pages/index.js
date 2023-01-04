import { useState } from 'react';
import { Grid, Container, Box, Typography, Stack, TextField, useMediaQuery, useTheme, Button} from '@mui/material';
import { Navbar } from '../src/layouts/navBar/navVar';
import Image from 'next/image';
import house3D from '../assets/images/logos/casa3D.png';
import selfP from '../assets/images/publicity/happyFamily.png';
import mailIcon from '../assets/Icons/landingpage-ico-mail.png';
import tower from '../assets/Icons/electricityTower.png';
import windSolar from '../assets/Icons/windPower.png';

export default function Index() {
	const theme = useTheme();
	const isMatch = useMediaQuery(theme.breakpoints.down('md'));

	return (
		<Grid container spacing={0} sx={{ padding: 0,}}>
			<Navbar />
			<Stack id="Start" spacing={5} sx={{ width: '100%'}}>
				<Box sx={{ display: 'inline-block' }}>
					<div class="grid grid-rows-2 grid-flow-col gap-4">
						<div class="col-span-1 "><Typography sx={{ fontSize: 60, textAlign: 'center' }}> <b>Welcome to MKALY</b> <p> A helping hand</p></Typography></div>
						<div class="row-span-3 "><Image src={selfP} layout="responsive" height={20} width={15} /></div>
					</div>
					<Box sx={{backgroundColor: '#00408F', borderRadius: 5, zIndex:-10,}}>
						<Container
							sx={{
								width: isMatch ? '90%' : '50%',
							}}
						>
							<Typography maxWidth={'80%'} sx={{ textAlign: 'center', paddingTop: '4%', fontSize: 25, color: '#FFF'}}>
								Our company is ready to provide you with the best service and prices
							</Typography>
							<Button variant='contained' sx={{backgroundColor:'#FDD85D', width:'20%'}}>Call now</Button>
						</Container>
					</Box>
				</Box>
				<div id='AboutUs'></div>
				{/* About us section ------------------------------------------------------------------------------------*/}
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
				{/* This is the new projects section--------------------------------------------------------------------------------------------------------------------- */}
				<div id='newProjects'></div>
				<Stack
					direction={isMatch ? 'column' : 'row'}
					alignItems="center"
					justifyContent="space-around"
				>
					<Box
						sx={{
							width: isMatch ? '90%' : '50%',
						}}
					>
						<Typography
							sx={{ fontSize: 60, textAlign: 'center', paddingTop: 3, }}
						> <b>NEW <br /> PROJECTS</b></Typography>
						<br />
						<Typography
							sx={{
								fontSize: 25,
							}}
						>
							<p>We are always trying to get closer to you. </p><br />

							<p>Following our propose we are finally starting projects in 2 new places .</p><br />

							<p>Our energy sources are renewable, so we care about the environment. At the same time we offer work to the surrounding communities so that they can also be part of the change.</p>
						</Typography>
					</Box>

					{/** raya aqui debe de ir una raya horizontal*/}
					<Box sx={{ width:isMatch ? '90%' : 2, backgroundColor:'#000000', height: isMatch ? 2 : '100%', margin:10}}></Box>

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
								display:'flex',
								alignItems:'center',
								padding: 2,
							}}
						>
							<div className='w-1/2'>
								<Image src={tower}/>
							</div>
							<Typography
								sx={{
									fontSize: 25,
									margin:5
								}}
							>
								We are expanding to new zones: Tulua, Pradera and Miriti Paraná
							</Typography>
						</Box>

						<br />

						<Box
							mt={5}
							sx={{
								width: isMatch ? '90%' : '90%',
								backgroundColor: 'rgba(250, 214, 67, 50%)', 
								borderRadius: 5,
								display:'flex',
								alignItems:'center',
								padding:2,

							}}
						>
							<div className='w-1/2	'>
								<Image src={windSolar} />
							</div>
							
							<Typography
							sx={{
								fontSize: 25,
								margin:5
							}}
							>
								Becoming clean,new solar panels and wind power 
							</Typography>
						</Box>
					</Stack>
				</Stack>

				{/* This is the contact us section--------------------------------------------------------------------------------------------------------------------- */}
				
				<Box id="contact-us" sx={{ width: '100%', backgroundColor: 'rgba(119, 182, 234, 50%)', paddingTop: 3,borderRadius:5}}>
				{/* <Box id="contact-us" sx={{ width: '100%', backgroundColor: 'rgba(253, 216, 93)', paddingTop: 3,borderRadius:5}}> */}
					<Typography variant="h1" sx={{  fontSize: 60,textAlign: 'center'  }}>
						{' '}
						<b>CONTACT US</b>
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
							<TextField id="email-basic" label="Email" variant="outlined" sx={{backgroundColor:'#fff', borderRadius:1, width:'80%'}}/>
							<TextField id="email-basic" label="Ubicación/ Barrio" variant="outlined" sx={{backgroundColor:'#fff', borderRadius:1, width:'80%'}}/>
							<Button variant='contained' align="center" sx={{backgroundColor:'#00408F', width:'80%'}}>Send</Button>
						</Stack>
					</Stack>
					<Stack direction={'row'} justifyContent="space-evenly" sx={{ paddingBottom: 2 }}>
						<Stack direction="column" alignItems="flex-start" spacing={0}>
							<Typography>PHONE:</Typography>
							<Typography>+57 315 868 0329</Typography>
						</Stack>
						<Stack direction="column" alignItems="flex-start" spacing={0}>
							<Typography> NATIONAL LINE: </Typography>
							<Typography> 01 8000 34 44 44</Typography>
						</Stack>
					</Stack>
				</Box>
			</Stack>
		</Grid>
	);
}
