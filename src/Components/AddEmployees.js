import React, { useState } from 'react'
import { Autocomplete, Button, Checkbox, Dialog, DialogActions, DialogContent, DialogTitle, FormControl, Grid2, InputLabel, MenuItem, Select, TextField } from '@mui/material'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { renderMatches } from 'react-router-dom';
import NativeSelectInput from '@mui/material/NativeSelect/NativeSelectInput';


function AddEmployees () {
    const [formValues,setFormValues]=useState({
        firstName:'',
        lastName:'',
        userName:'',
        email:'',
        role:'',
        companyName:'',
        dateOfBirth:'',
        department:'',

    });

    const [errors,setErrors]=useState({});

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormValues({ ...formValues, [name]: value });
      };


    const validate =()=>{
        const newErrors={}

        if(!formValues.firstName){
            newErrors.firstName="Enter your First Name";
        }
        if(formValues.lastName){
            newErrors.lastName="Enter your Last Name";
        }
        if(!formValues.userName){
            newErrors.userName="Enter your User Name";
        }
        if(!formValues.email){
            newErrors.email="Enter your Email";
        }
        if(!formValues.department){
            newErrors.department="Enter your Department";
        }
        setErrors(newErrors);
        return Object.keys(newErrors).length===0;
    }

    const handleAddButton=()=>{
        if(!validate()) return;

        const formData = new FormData();
            Object.keys(formValues).forEach((key) => {
            formData.append(key, formValues[key]);
        });
    }; 
  return (
    <Dialog noValidate>
        <DialogTitle>ADD employees here</DialogTitle>
        <DialogContent>
        <TextField
            label="First Name"
            name="firstName"
            margin="dense"
            value={formValues.firstName}
            onChange={handleChange}
            error={!!errors.firstName}
            helperText={!!errors.firstName}
        
        />
        <TextField
            label="lastName"
            name="lastName"
            margin="dense"
            value={formValues.lastName}
            onChange={handleChange}
            error={!!errors.lastName}
            helperText={!!errors} 
        />
        <TextField
            label="User Name"
            name="userName"
            margin="dense"
            value={formValues.userName}
            onChange={handleChange}
            error={!!errors.userName}
            helperText={!!errors}
        />
        <TextField
           helperText={!!errors}
           disabled  
        />     
        <TextField
            label="Email"
            name='email'
            margin="dense"
            value={formValues.email}
            onChange={handleChange}
            error={!!errors.email}
            helperText={!!errors.email}
        />
        
        <TextField
            label="Department"
            name="department"
            margin="dense"
            value={formValues.department}
            onChange={handleChange}
            error={!!errors}
        />
        <TextField
            label="firstName"
            name="firstName"

        />
       
        <LocalizationProvider>
            <DatePicker
                label="Date of Birth"
                value={formValues.dateOfBirth}
                onChange={handleChange}
                error={!!errors.dateOfBirth}
                helperText={!!errors}

            >       
            </DatePicker>
        </LocalizationProvider>
        {/*
            
        */}
        <FormControl>
            <InputLabel>Technical Skills</InputLabel>
            <Autocomplete
                multiple
                renderOption={renderMatches}
            >

            </Autocomplete>

        </FormControl>
        
        <FormControl error={!!errors.companyName}>
            <Select
            label="Company Name"
            name="companyName"
            onChange={handleChange}
            >
                <MenuItem value="Deloitte">Deloitee</MenuItem>
                <MenuItem value="Accenture">Accenture</MenuItem>
                <MenuItem value="Phenom">Phenom</MenuItem>
            </Select>
        </FormControl>
        <TextField 
            label="Role"
            name="role"
            value={formValues.role}
            onChange={handleChange}
        
        />
        </DialogContent>
        <DialogActions>
            <Button onClick={handleAddButton}>ADD</Button>
            <Button>CLOSE</Button>
        </DialogActions>
    </Dialog>
  )
}

export default AddEmployees;
