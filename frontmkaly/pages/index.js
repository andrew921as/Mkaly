import {Grid, Container, Box, Typography, Stack, TextField} from '@mui/material';
import { Navbar } from '../src/layouts/navBar/navVar';
import Image from 'next/image';
import u from '../assets/images/backgrounds/u1.jpg';
import una from '../assets/images/users/1.jpg';


export default function Index() {
	return (
		<Grid container spacing={0}>
			<Navbar/>
			<Stack spacing={5} sx={{paddingTop:3, width:'100%', backgroundColor:'#3C73AA'}}>
				<Image
					src= {u}
				/>
				<Stack 
					direction={'row'}  
					alignItems="center"		
				>
					<Container
					sx={{ 
						backgroundColor:'#FDC500',
						width:'30%',
						height:'4em'
						
					}}
					>
						<Typography 
						maxWidth={'90%'}
						sx={{textAlign:'center'}}
						>Llegamos a nuevas zonas del pais
								Tulua, Pradera y Miriti Paraná
						</Typography>
					</Container>

					<Container
					sx={{ 
						backgroundColor:'#FDC500',
						width:'30%',
						height:'4em',
					}}
					>
						<Typography 
						maxWidth={'90%'}
						sx={{textAlign:'center'}}
						>Nuevos proyectos
						</Typography>
					</Container>
				</Stack>

				<Box
				sx={{width: '100%' }}>
			
					<Typography variant='h1' sx={{textAlign:'center'}}> CONTACTANOS</Typography>
					<Stack 
						direction={'row'}  
						alignItems="center"	
						justifyContent="flex-start"
						sx={{paddingBottom:'10%', paddingTop:'5%', paddingLeft:'10%'}}
						spacing={30}
					>	
							<Image src= {una}/>
						<Stack direction={'column'} spacing={3} justifyContent="flex-end" sx={{width:'60%'}}>
							<Stack direction={'row'} alignItems="center" spacing={2} justifyContent="flex-end">
								<Typography> Correo electronico</Typography>
								<TextField id="filled-basic" variant="filled" sx={{width:'70%', backgroundColor:'#D6F3F2'}}/>
							</Stack>

							<Stack direction={'row'} alignItems="center" spacing={2} justifyContent="flex-end">
								<Typography> Usuario</Typography>
								<TextField id="filled-basic" variant="filled" sx={{width:'70%', backgroundColor:'#D6F3F2' }}/>
							</Stack>
						</Stack>
					</Stack>
				</Box>
			</Stack>
			
		</Grid>
	);
}
