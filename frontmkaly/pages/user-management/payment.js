import React from 'react';
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
} from "@mui/material";
import Image from 'next/image';
import creditCard from '../../assets/images/icons/bill.svg'
import { useRouter } from 'next/router';
import es from '../../public/languages/es';
import en from '../../public/languages/en';
//import { loadStripe } from "@stripe/stripe-js";
//import { Elements } from "@stripe/react-stripe-js";
//import CheckoutForm from "../../src/components/clientManagement/CheckoutForm";

//const stripePromise = laodStripe('pk_test_51MVe1FGpB3JzZ9Msw92mAPAJIrr7uHxjWDm4XdRx0By1PvMG5hXaMC6M3Lcu0aww6CeiZcpCZtI8OMYx6wWQLvmK00HFVOGN70')

export default function payment() {
    const router = useRouter()
    const { locale } = router
    const t = locale === 'en' ? en : es
    const theme = useTheme();
    const isMatch = useMediaQuery(theme.breakpoints.down('md'));
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
                        />
                        <Container sx={{ display: 'flex', justifyContent: 'center' }}>
                            <Button
                                variant="contained"
                                sx={{ width: '20%', background: '#FDC500', color: 'black' }}
                            >
                                {t.client_management.payment.ButtonPay}
                            </Button>
                        </Container>
                    </Stack>
                </div>
            </div>

        </div>

    )
}
