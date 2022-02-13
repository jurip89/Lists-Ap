import React, { useState} from 'react'
import { Container, Grid, Typography } from '@mui/material';
import TextField from '@mui/material/TextField';
import { Button } from '@mui/material'; 
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { iconsArray } from '../utils/iconsArray';
import { v4 as uuidv4 } from 'uuid';
const FormPage = ({add}) => {

    const [form, setForm] = useState({ name: '', elements: [{name:'',id:uuidv4()}], icon: iconsArray[1]});
    
    const moreSpace = (e) => {
        e.preventDefault();
        const formClone = { ...form, elements: [...form.elements, { name:'', id:uuidv4()}] };
        setForm(formClone)
    }

    const handleIcon = (e) => {
        const newIcon = e.target.value
        setForm({...form, icon:newIcon})

    }

    const handleItem = (e,i) => {
        const cloneElements = [...form.elements];
            console.log(cloneElements)
        cloneElements[i].name = e.target.value;
        setForm({...form,elements:cloneElements})
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if (form.name === '') {
            return
        }
        add(form)

        setForm({ name: '', elements:[], icon: iconsArray[1]})
    }

    return (
        <Container sx={{ justifyContent: 'space-around', alignItems:'center'}}>
            <Typography variant='h5' component='div' sx={{margin:'1.5vh auto'}}>{'Add Your List Here:'.toUpperCase()}</Typography>
    <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
              <Grid item xs={12}>
                  <TextField id="outlined-basic" onChange={(e)=>setForm({...form,name:e.target.value})} label="List Name" variant="outlined" value={form.name }/>  
              </Grid>
              <Grid item xs={12}>
                  <Button size='large' variant="outlined"  onClick={moreSpace}>Add item to list</Button>    
              </Grid>
              {form.elements.map((el,i) => {
                  return (<Grid key={i} item xs={12} md={ 12}>
                      <TextField
                          onChange={(e) => handleItem(e, i)}
                          id="outlined-basic" label="List Item"
                          variant="outlined"
                          value={el.name} />  
                </Grid>)}
              )}
              <Grid item xs={12}>
              <FormControl sx={{ m: 1, minWidth: 80 }}>
        <InputLabel id="demo-simple-select-autowidth-label">Icon</InputLabel>
        <Select
          labelId="demo-simple-select-autowidth-label"
          id="demo-simple-select-autowidth"
            onChange={handleIcon}
            value={form.icon}
          autoWidth
          label="Age"
                      >{iconsArray.map((el, i) => {
                          return (
                              <MenuItem key={i} value={el}>{el}</MenuItem>
            )
        })}
          
        </Select>
      </FormControl>
              </Grid>
              <Grid item xs={12}>
                  <Button size='large' variant="outlined" type='submit'>Submit!</Button>    
              </Grid>
      </Grid>
            </form>
            </Container>
  )
}

export default FormPage
