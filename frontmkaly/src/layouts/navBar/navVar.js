import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Button,
  Stack,
  Menu,
  MenuItem
} from '@mui/material'

import FeatherIcon from "feather-icons-react";

import { useState } from 'react'

export const Navbar = () => {
  const [anchorEl, setAnchorEl] = useState(null)
  const open = Boolean(anchorEl)
  const handleClick = () => {
    setAnchorEl()
  }
  const handleClose = () => {
    setAnchorEl(null)
  }
  return (
    <AppBar position='static' sx={{backgroundColor: '#00408F'}}>
      <Toolbar>
        <IconButton size='large' edge='start' color='inherit' aria-label='logo'>
          <FeatherIcon />
        </IconButton>
        <Typography variant='h6' component='div' sx={{ flexGrow: 1 }}>
          POKEMONAPP
        </Typography>
        <Stack direction='row' spacing={2}>
          <Button>Features</Button>
          <Button>Pricing</Button>
          <Button>About</Button>
          <Button
            id='resources-button'
            aria-controls={open ? 'resources-menu' : undefined}
            aria-haspopup='true'
            aria-expanded={open ? 'true' : undefined}
            endIcon={<FeatherIcon />}
            onClick={handleClick}>
            Resources
          </Button>
          <Button color='inherit'>Login</Button>
        </Stack>
        <Menu
          id='resources-menu'
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right'
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'right'
          }}
          MenuListProps={{
            'aria-labelledby': 'resources-button'
          }}>
          <MenuItem onClick={handleClose}>Blog</MenuItem>
          <MenuItem onClick={handleClose}>Podcast</MenuItem>
        </Menu>
      </Toolbar>
    </AppBar>
  )
}