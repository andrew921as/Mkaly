import React, {useState} from 'react';
import {
    Grid,
    Stack,
    TextField,
    Box,
    Typography,
    useMediaQuery,
    useTheme,
    Radio,
    FormLabel,
    Container,
    Button,
    Alert,
} from "@mui/material";
import Image from 'next/image';
import creditCard from '../../assets/images/icons/bill.svg'
import { useRouter } from 'next/router';
import es from '../../public/languages/es';
import en from '../../public/languages/en';

import axios from "axios";

// Requests
import { payBill } from '../../src/functions/requests';

export default function payment() {
    const router = useRouter()
    const [billId, setBillId] = useState(null);
    const { locale } = router
    const t = locale === 'en' ? en : es
    const theme = useTheme();
    const isMatch = useMediaQuery(theme.breakpoints.down('md'));
	const [isSuccess, setIsSuccess] = useState(null);
	const [isWarning, setIsWarning] = useState(null);


    const handleOnCheckout = async () => {
        try {
            const {data} = await payBill(billId);
            if (data.ok){
                setIsSuccess(t.client_management.payment.success)
                setIsWarning(null)
                return;
            }

            if (data.alreadyPaid){
                setIsSuccess(null)
                setIsWarning(t.client_management.payment.warningAlreadyPaid)
                return;
            }

            setIsSuccess(null)
            setIsWarning(t.client_management.payment.warning)
            return;

        } catch (err) {
            setIsWarning("Error")
            return;
        }
    }

    return (

        <div className='block ml-auto mr-auto'>
            <div className='relative flex md:p-20 p-8'>
                {isMatch ? '' : <div className='absolute top-1 z-10'>
                    <Image src={creditCard} width={450} height={450} />
                </div>}

                <div className={isMatch ? 'w-[100%] p-8 bg-white flex flex-col items-center rounded-lg drop-shadow-lg ' : 'w-[100%] p-8 bg-white flex justify-end rounded-lg drop-shadow-lg '}>
                    {isMatch ? <div className=''>
                        <Image src={creditCard} width={200} height={200} />
                    </div> : ''}
                    <Stack
                        spacing={1}
                        alignContent='right'
                        justifyItems='right'
                        sx={{
                            width: {
                                md: '50%'
                            }
                        }}
                    >
                        <Typography sx={{ fontSize: { md: '30px', xs: '18px' }, color: '#00408F', fontWeight: 'bold' }}> {t.user_management.payment.TitleRegPago} </Typography>

                        <Typography> {t.client_management.payment.FactureNumber} </Typography>

                        <TextField
                            id="name-basic"
                            label='#'
                            variant="outlined"
                            sx={{ width: '100%' }}
                            onChange={(e) => setBillId(e.target.value)}
                        />
                        <Container sx={{ display: 'flex', justifyContent: 'center' }}>
                            <Button
                                onClick={() => handleOnCheckout()}
                                variant="contained"
                                sx={{ width: '20%', background: '#FDC500', color: 'black' }}
                            >
                                {t.client_management.payment.ButtonPay}
                            </Button>
                            {isSuccess && <Alert severity="success">{isSuccess}</Alert>}
						    {isWarning && <Alert severity="error">{isWarning}</Alert>}
                        </Container>
                    </Stack>
                </div>
            </div>

        </div>

    )
}
