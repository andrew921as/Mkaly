import React, { useRef, useEffect, useState } from 'react';
import { Grid, Container, Box, Typography, Stack, TextField, useMediaQuery, useTheme, Button } from '@mui/material';
import Image from 'next/image';
import house3D from '../../../assets/images/logos/casa3D.png';
import selfP from '../../../assets/images/publicity/happyFamily.png';
import mailIcon from '../../../assets/Icons/landingpage-ico-mail.png';
import tower from '../../../assets/Icons/electricityTower.png';
import windSolar from '../../../assets/Icons/windPower.png';

export default function NewProject() {
	const theme = useTheme();
  const isMatch = useMediaQuery(theme.breakpoints.down('md'));

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
						Becoming clean,new solar panels and wind power
					</Typography>
				</Box>
			</Stack>
		</Stack>
	)
}