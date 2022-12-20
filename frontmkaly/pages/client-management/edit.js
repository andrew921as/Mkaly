import React from 'react'
import {Box, Container, Grid, Stack, TextField, FormControl, InputLabel, InputAdornment, OutlinedInput, IconButton, Autocomplete, MenuItem, Select, Button} from '@mui/material';
import { UserForm } from '../../src/components';


const EditClient = () => {
  const [clientData, setClientData] = React.useState(null);

  if(clientData){
    return (
      <UserForm title="Edit Client Profile"/>
    )
  }

  return(
    <div>
      <h1>Edit Client Profile</h1>
        <Grid container align="center">
          <Grid item xs={12} sx={{m:2}}>
            Write down the Id number of the client you are willing to edit
          </Grid>
          <Grid item xs={12} sx={{m:2}}>
            <TextField
              id="id_number"
              label="ID Number"
              variant = "outlined"
              InputProps={{
                startAdornment: <InputAdornment position="start">#</InputAdornment>,
              }}
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sx={{m:2}}>
            <Button size="large" variant="contained" color="warning" onClick={()=>setClientData(123)}>Search</Button>
          </Grid>
        </Grid>
    </div>
  )
}

export default EditClient