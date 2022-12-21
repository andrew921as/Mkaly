import {useState} from 'react';
import {Grid, Container, Box, Typography, Stack, TextField, useMediaQuery, useTheme} from '@mui/material';
import {Navbar} from '../src/layouts/navBar/navVar';
import Image from 'next/image';
import selfP from '../assets/images/publicity/selfP1.png';
import mailIcon from '../assets/Icons/landingpage-ico-mail.png';

export default function Index() {
	const theme = useTheme();
	const isMatch = useMediaQuery(theme.breakpoints.down('md'));

	return (
		<Grid container spacing={0}>
			<Navbar />
			<Stack id="Start" spacing={5} sx={{width: '100%', backgroundColor: '#77B6EA'}}>
				<Image src={selfP} layout="responsive" />
				<Stack direction={isMatch ? 'column' : 'row'} alignItems="center" spacing={isMatch ? 4 : 0}>
					<Container
						id="adverticement"
						sx={{
							backgroundColor: '#FDC500',
							width: isMatch ? '90%' : '30%',
							height: '4em',
							borderRadius: 2,
						}}
					>
						<Typography maxWidth={'90%'} sx={{textAlign: 'center', paddingTop: '2%'}}>
							we are expnading to new zones: Tulua, Pradera and Miriti Paraná
						</Typography>
					</Container>

					<Container
						sx={{
							backgroundColor: '#FDC500',
							width: isMatch ? '90%' : '30%',
							height: '4em',
							borderRadius: 2,
						}}
					>
						<Typography maxWidth={'90%'} sx={{textAlign: 'center', paddingTop: '4%'}}>
							New Projects
						</Typography>
					</Container>
				</Stack>

				<Box id="contact-us" sx={{width: '100%', backgroundColor: '#fbfbfb', paddingTop: 3}}>
					<Typography variant="h1" sx={{textAlign: 'center'}}>
						{' '}
						CONTACT US
					</Typography>
					<Stack
						direction={isMatch ? 'column' : 'row'}
						alignItems="center"
						justifyContent="flex-start"
						sx={{paddingBottom: '5%', paddingTop: '5%', paddingLeft: '10%'}}
						spacing={isMatch ? 10 : 30}
					>
						<Image src={mailIcon} />
						<Stack direction={'column'} spacing={3} justifyContent="flex-end" sx={{width: '60%'}}>
							<TextField id="email-basic" label="Email" variant="outlined" />
							<TextField id="email-basic" label="Ubicación/ Barrio" variant="outlined" />
						</Stack>
					</Stack>
					<Stack direction={'row'} justifyContent="space-evenly" fullwidth sx={{paddingBottom: 2}}>
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
