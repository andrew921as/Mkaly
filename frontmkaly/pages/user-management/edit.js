import React from 'react'
import {Box, Container, Grid, Stack, TextField, FormControl, InputLabel, InputAdornment, OutlinedInput, IconButton, Autocomplete, MenuItem, Select, Button} from '@mui/material';


const EditUser = () => {
  const [showPassword, setShowPassword] = React.useState(false);

  const [userData, setUserData] = React.useState({
    firstName: "",
    secondName: "",
    firstLastName: "",
    secondLastName: "",
    email: "",
    password: "",
    username: "",
    userRol: "",
    idType: "",
    idNumber: 0,
    city: "", 
  });

  const handleChangeUser = (value,type) => setUserData({...userData,[type]:value});

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  return (
    <div>
      <h1>Edit User</h1>
      <form>
        <Grid container justifyContent="space-evenly" alignItems="center">
          <Grid item xs={5} sx={{m:2}}>
          <TextField
            id="first_name"
            label="First Name"
            variant = "outlined"
            fullWidth
          />
          </Grid>
          <Grid item xs={5} sx={{m:2}}>
          <TextField
            id="second_name"
            label="Second Name"
            variant = "outlined"
            fullWidth
          />
          </Grid>
          <Grid item xs={5}sx={{m:2}}>
          <TextField
            id="first_last_name"
            label="First Last Name"
            variant = "outlined"
            fullWidth
          />
          </Grid>
          <Grid item xs={5} sx={{m:2}}>
          <TextField
            id="second_last_name"
            label="Second Last Name"
            variant = "outlined"
            fullWidth
          />
          </Grid>
          <Grid item xs={5} sx={{m:2}}>
          <TextField
            id="email"
            label="Email"
            variant = "outlined"
            fullWidth
          />
          </Grid>
          <Grid item xs={5} sx={{m:2}}>
          <FormControl fullWidth variant="outlined">
          <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
          <OutlinedInput
            id="outlined-adornment-password"
            type={showPassword ? 'text' : 'password'}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                >
                  {showPassword ? <p>♪</p> : <p>↕</p>}
                </IconButton>
              </InputAdornment>
            }
            label="Password"
          />
          </FormControl>
          </Grid>
          <Grid item xs={5} sx={{m:2}}>
          <TextField
            id="username"
            label="Username"
            variant = "outlined"
            fullWidth
          />
          </Grid>
          <Grid item xs={5} sx={{m:2}}>
          <FormControl fullWidth>
            <InputLabel id="userRol">User Rol</InputLabel>
            <Select
              labelId="userRol"
              id="userRol"
              value={userData.userRol}
              label="User Rol"
              onChange={(e)=>handleChangeUser(e.target.value,"userRol")}
            >
              <MenuItem value="admin">Admin</MenuItem>
              <MenuItem value="manager">Manager</MenuItem>
              <MenuItem value="operator">Operator</MenuItem>
              <MenuItem value="client">Client</MenuItem>
            </Select>
          </FormControl>
          </Grid>
          <Grid item xs={5} sx={{m:2}}>
          <FormControl fullWidth>
          <InputLabel id="type_id">Type of Document</InputLabel>
          <Select
            labelId="type_id"
            id="type_id"
            value={userData.idType}
            label="Type of Document"
            onChange={(e)=>handleChangeUser(e.target.value,"idType")}
          >
            <MenuItem value="cc">C.C.</MenuItem>
            <MenuItem value="ce">C.E.</MenuItem>
            <MenuItem value="nip">N.I.P.</MenuItem>
            <MenuItem value="nit">N.I.T.</MenuItem>
            <MenuItem value="ti">T.I.</MenuItem>
            <MenuItem value="pap">P.A.P.</MenuItem>
          </Select>
          </FormControl>
          </Grid>
          <Grid item xs={5} sx={{m:2}}>
          <TextField
            id="id_number"
            label="ID Number"
            variant = "outlined"
            fullWidth
          />
          </Grid>
          <Grid item xs={5} sx={{m:2}}>
          <Autocomplete
          disablePortal
          id="city"
          options={["Cali", "Jamundi", "Bogota", "Cartagena"]}
          fullWidth
          renderInput={(params) => <TextField {...params} label="City" />}
          />
          </Grid>
          <Grid item xs={12} sx={{m:2}} align="center">
          <Button size="large" variant="contained">Update</Button>
          </Grid>
        </Grid>
      </form>
    </div>
  )
}

export default EditUser