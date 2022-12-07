import * as React from 'react';
import { Box, Card, CardActions, CardContent, Button, Typography, Container, Grid, Divider } from '@mui/material';
import FeatherIcon from "feather-icons-react";
import useMediaQuery from '@mui/material/useMediaQuery';

export default function InvoiceCard() {
    const matches = useMediaQuery('(max-width:900px)');
    return (
        <Card sx={{ minWidth: 275 , background: '#3C73AA'}}>
            <CardContent>
                <Grid container spacing={2}>
                    <Grid item xs={12} md={5} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        <FeatherIcon fill='#fff' icon='file-text' width="100" height='100'/>
                    </Grid>
                    {matches ?
                        ''
                        :
                        <Grid item md={1}>
                            <Divider sx={{width: '1px', background: '#fff'}} orientation='vertical' />
                        </Grid>
                    }
                    <Grid item xs={12} md={6} sm container justifyContent='center' alignItems='center'>
                        <Grid item xs container direction="column" spacing={2}>
                            <Grid item xs>
                                <Box
                                    sx={{
                                        width: '100%',
                                        height: 40,
                                        backgroundColor: '#00C292',
                                        display: 'flex',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        borderRadius: '20px',
                                    }}
                                >
                                    <Typography sx={{color :'white', fontWeight: 'bold'}} > AL DIA</Typography>
                                </Box>
                            </Grid>
                            <Grid item sx={{ display: 'flex', justifyContent: 'center' }}>
                                <Typography sx={{color :'white', fontWeight: 'bold'}}> Valor : $20.000</Typography>
                            </Grid>
                            <Grid item>
                                <CardActions sx={{ display: 'flex', justifyContent: 'center' }}>
                                    <Button variant="contained" sx={{ background: '#FDC500', color: '#3C73AA', width: "100%", '&:hover':{background: '#00C292'}, }}>
                                        <Typography sx={{fontWeight: 'bold'}}> PAGAR </Typography>
                                    </Button>
                                </CardActions>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </CardContent>
        </Card>
    );
}