import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Stack,
  Menu,
  MenuItem,
  useMediaQuery,
  useTheme,
} from '@mui/material'
import Image from 'next/image';
import logoMkaly from '../../../assets/Icons/logo-Mkaly.png';

import FeatherIcon from "feather-icons-react";

import { useState } from 'react'

export const Navbar = () => {
  const [anchorEl, setAnchorEl] = useState(null)
  const open = Boolean(anchorEl)
  const handleClick = () => {
    setAnchorEl(event.currentTarget);
  }
  const handleClose = () => {
    setAnchorEl(null)
  }
  const theme = useTheme();
  const isMatch = useMediaQuery(theme.breakpoints.down('md'))
  return (
    <AppBar position='fixed' sx={{backgroundColor: '#00408F'}}>
      <Toolbar>
        
        { isMatch ? (<>
          <Button
        id="demo-positioned-button"
        aria-controls={open ? 'demo-positioned-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
      >
        <Image
					src= {logoMkaly} width={50} height={35}
				/>
      </Button>
        <Menu
        id="demo-positioned-menu"
        aria-labelledby="demo-positioned-button"
        //anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}>

          <MenuItem onClick={handleClose}><Button href='#Start'>Start</Button></MenuItem>
          <MenuItem onClick={handleClose}><Button href='#adverticement'>Adverticements</Button></MenuItem>
          <MenuItem onClick={handleClose}><Button href='#contact-us'>Contact</Button></MenuItem>
          <MenuItem onClick={handleClose}><Button href='#Start'>Consult bills</Button></MenuItem>
          </Menu>
          </>) : (<>
          <Image
					src= {logoMkaly} width={60} height={40}
				  />
          <Typography variant='h2' component='div' sx={{ flexGrow: 1, paddingLeft:2 }} color={'#ffffff'} >
          MKALY
        </Typography>
        <Stack direction='row' spacing={2}>
          <Button href='#Start'> Start</Button>
          <Button href='#adverticement'>Adverticements</Button>
          <Button href='#contact-us'>Contact</Button>
          <Button>
            Consult bills
          </Button>
          <Button color='inherit'>Login</Button>
        </Stack>
          </>)
          }
        
      </Toolbar>
    </AppBar>
  )
}