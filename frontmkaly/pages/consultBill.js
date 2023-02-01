import { React, useState, useRef } from 'react'
import { useRouter } from 'next/router';
import { Box, Typography, Button, Stack, TextField, useMediaQuery,useTheme } from '@mui/material'
import serchIcon from '../assets/Icons/search-image.svg'
import { Navbar } from '../src/layouts/navBar/navVar';
import Link from 'next/link';
import Image from 'next/image';

import en from '../public/languages/en'
import es from '../public/languages/es'

import ReCAPTCHA from 'react-google-recaptcha';
import { getPDF, postCorreoPdf } from '../src/functions/requests';

export default function consultBill() {
    const theme = useTheme();
	const isMatch = useMediaQuery(theme.breakpoints.down('md'));
    const router = useRouter()
    const { locale } = router
    const t = locale === 'en' ? en : es

    const [billN, setBillN] = useState(" ")
    const [billNC, setBillNC] = useState({ "email": " ", "bill_number": " " });

    const captcha = useRef(null);

    const handleClick = async (data) => {
        if (!captcha.current.getValue()) {
            setWarning('Please do the captcha');
            return;
        }
        const dato = data.toString()

        const datoF = { "bill_number": dato }

        const dowloadS = await getPDF(data);
        const link = `http://localhost:8000/pdf_view_download/${data}`
        if (dowloadS) {
            window.open(link, "_blank");
        } else {
            setWarning("no entre :(");
        }
    }

    const handleClickNC = async (data) => {
        if (!captcha.current.getValue()) {
            setWarning('Please do the captcha');
            return;
        }
        console.log(data)
        const send = await postCorreoPdf(data);
        console.log("ya se envio")
    }

    const handleCaptcha = () => {
        if (captcha.current.getValue()) {
            console.log('You are not cromed');
        }
    };

    return (<>
        <Navbar />
        <div className='text-center flex justify-center items-center'>
        </div>
        <div className='flex justify-center items-center'>

            <div className='w-[100%] md:w-[50%] flex p-5 bg-white rounded-lg drop-shadow-lg justify-center items-center'>
                {isMatch ? '' : <div className='flex justify-center items-center'>
                    <Image src={serchIcon} width={220} height={220} />
                </div> }
                <Stack
                    direction="column"
                    justifyContent="center"
                    alignItems="center"
                    spacing={3}>
                    <Typography sx={{ fontSize: { md: '30px', xs: '18px' }, color: '#00408F', fontWeight: 'bold' }}> {t.consultBill.Title} </Typography>
                    <Box>
                        <TextField
                            onChange={(e) => setBillNC({ ...billNC, "bill_number": e.target.value })}
                            id="outlined-one"
                            label={t.consultBill.billNumber}
                            variant="outlined"
                            size="small"
                            sx={{ borderRadius: 2, backgroundColor: '#CAF0F8', width: '100%' }}
                        />
                    </Box>
                    <Box>

                        <TextField
                            onChange={(e) => setBillNC({ ...billNC, "email": e.target.value })}
                            id="outlined-email"
                            label={t.consultBill.billEmail}
                            variant="outlined"
                            size="small"
                            sx={{ borderRadius: 2, backgroundColor: '#CAF0F8', width: '100%' }}
                        />
                    </Box>
                    <ReCAPTCHA ref={captcha} sitekey="6LcO7c8jAAAAAL22zlVwnEBB6tw6WT5LXZ4DVmlT" onChange={handleCaptcha} />
                    <Button onClick={() => { handleClickNC(billNC) }} variant='contained' sx={{ background: '#FDC500', color: '#000000', width: '50%' }}>{t.ContactUs.ButtonSend}</Button>
                    {/* <a download='factura' href='\files\pdf\factura.pdf'>
                    <Button>ver PDF</Button>
                </a> */}
                </Stack>
            </div>

        </div>
    </>
    )
}