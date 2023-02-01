import {React, useState, useRef}from 'react'
import { useRouter } from 'next/router';
import { Box, Typography, Button, Stack, TextField } from '@mui/material'
import { Navbar } from '../src/layouts/navBar/navVar';
import Link from 'next/link';

import en from '../public/languages/en'
import es from '../public/languages/es'

import ReCAPTCHA from 'react-google-recaptcha';
import { getBill } from '../src/functions/requests'; 

export default function consultBill() {
	const router = useRouter()
	const { locale } = router
	const t = locale === 'en' ? en : es

	const [billN, setBillN] = useState(" ")

	const captcha = useRef(null);

	const handleClick = async(data) =>  {
		if (!captcha.current.getValue()) {
			setWarning('Please do the captcha');
			return;
		}

		const res = await getBill(data);
		if (res) {
			console.log("si entre");
		} else {
			setWarning("no entre :(");
		}
	}

	const handleCaptcha = () => {
		if (captcha.current.getValue()) {
			console.log('You are not cromed');
		}
	};
	
	return (<>
		<Navbar />
		<Box>
			<Stack
				direction="column"
				justifyContent="center"
				alignItems="center"
				spacing={2}>
				<Typography variant='h1'>{t.consultBill.Title}</Typography>
				<Typography variant='h4'>{t.consultBill.description}</Typography>
				<TextField
					onChange={(e) => setBillN(e.target.value)}
					id="outlined-basic"
					label="#"
					variant="outlined"
					size="small"
					sx={{ borderRadius: 2, backgroundColor: '#CAF0F8', width: '100%' }}
				/>
				<ReCAPTCHA ref={captcha} sitekey="6LcO7c8jAAAAAL22zlVwnEBB6tw6WT5LXZ4DVmlT" onChange={handleCaptcha} />
				<Button onClick={()=>{handleClick(billN)}} variant='contained' sx={{ background: '#FDC500', color: '#000000', width: '50%' }}>{t.EditClient.search}</Button>
			</Stack>
		</Box>
	</>
	)
}
