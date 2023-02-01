import {React, useState, useEffect} from 'react';
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
import creditCard from '../../assets/images/icons/credit-card.svg'
import { useRouter } from 'next/router';
import es from '../../public/languages/es';
import en from '../../public/languages/en';

import axios from 'axios';

// Requests
import { getIsPaidBill, payBill } from '../../src/functions/requests';

export default function payment() {
    const router = useRouter()
	const {success, billn} = router.query;

    const { locale } = router
    const t = locale === 'en' ? en : es
    const theme = useTheme();
    const isMatch = useMediaQuery(theme.breakpoints.down('md'));
    const [isSuccess, setIsSuccess] = useState(null);
	const [isWarning, setIsWarning] = useState(null);

    const [billN, setBillN] = useState("")

    // const handleSubmit = (data)=>{
    //     console.log("envio estos datos: " + data)
    // };

    const handleOnCheckout = async () => {

        
        try {
            
            const {data: isPaid} = await getIsPaidBill(billN);

            console.log(isPaid)

            if(isPaid.ok){
                setIsWarning(t.client_management.payment.warningAlreadyPaid)
                setIsSuccess(null)
                return;
            }

            if(isPaid.error){
                setIsWarning(t.client_management.payment.warning)
                setIsSuccess(null)
                return;
            }


            let {data} = await axios.get(`http://127.0.0.1:8000/create_checkout/${billN}`)
            window.location.assign(data.url)
            console.log(res)
        } catch (err) {
            
        }
    }

    const handleUpdatePayment = async () => {
        try {
            await payBill(billn);
            setIsSuccess(t.client_management.payment.success)
            setIsWarning(null)
        } catch (err) {
            setIsWarning(t.client_management.payment.error)
            setIsSuccess(null)
        }
    }

    useEffect(() => {

        if(!success){
            return;
        }

        if(success == 1){
            handleUpdatePayment()
            
        } else if(success == 0){
            setIsWarning(t.client_management.payment.error)
            setIsSuccess(null)
        }
        
    }, [success]);

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
                        <Typography sx={{ fontSize: { md: '30px', xs: '18px' }, color: '#00408F', fontWeight: 'bold' }}> {t.client_management.payment.TitleRegPago} </Typography>
                        <Typography> {t.client_management.payment.FactureNumber} </Typography>

                        <TextField
                            onChange={(e) => setBillN(e.target.value)}
                            id="name-basic"
                            label='#'
                            variant="outlined"
                            sx={{ width: '100%' }}
                        />
                         
                        <Container sx={{ display: 'flex', justifyContent: 'center' }}>  
                                <Button
                                    onClick={() => handleOnCheckout()}
                                    id = "checkout-button"  
                                    variant="contained"
                                    type = "submit"
                                >
                                    {t.client_management.payment.ButtonPay}
                                </Button>
                                {isSuccess && <Alert severity="success">{isSuccess}</Alert>}
						        {isWarning && <Alert severity="error">{isWarning}</Alert>}
                        </Container>
                    </Stack>
                </div>
            </div>
            <div className='flex justify-end md:px-20'>
                <div className='flex flex-col gap-2 md:p-0 p-8 text-[#00408F]'>
                    <p className='font-bold text-lg '>{t.client_management.payment.TitleMessage}</p>
                    <p className='font-light max-w-lg'>{t.client_management.payment.MessageImp} </p>
                </div>
            </div>

        </div>

    )
}
