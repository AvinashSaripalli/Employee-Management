import React, { useState } from "react";
import {TextField, Button, Box, Typography, FormControl, Container, MenuItem, Select, InputLabel, Autocomplete, Chip,
} from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Register() {
  const [formValues, setFormValues] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    password: "",
    companyName: "",
    role: "",
    department: "",
    designation: "",
    jobLocation: "",
    photo: null,
  });

  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const validate = () => {
    const newErrors = {};

    if (!formValues.firstName.trim()) {
      newErrors.firstName = "First Name is Required";
     }
     else if (!/^[a-zA-Z]+(?: [a-zA-Z]+)*$/.test(formValues.firstName)) {
      newErrors.firstName = "First name must only contain letters and can have spaces in between";
    }
    else if (!/^[a-zA-Z ]+$/.test(formValues.firstName)) {
      newErrors.firstName="Name must contain only letters and spaces";
    }
    if (!formValues.lastName.trim()) {
      newErrors.lastName = "Last Name is Required";
    } else if (!/^[a-zA-Z]+$/.test(formValues.lastName)) {
      newErrors.lastName = "Last name must be in letters only";
    }

    if (formValues.companyName) {
      const companyDomain = `@${formValues.companyName.toLowerCase()}.com`;
      if (!formValues.email.endsWith(companyDomain)) {
        newErrors.email = "Email must end with ${companyDomain}";
      }
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formValues.email)) {
      newErrors.email = "Invalid Email address";
    }

    if (!formValues.phoneNumber.trim()) {
      newErrors.phoneNumber = "Enter your Phone number";
    }

    if (!formValues.password.trim()) {
      newErrors.password = "Enter the Password";
    } else if (formValues.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }
    if (!formValues.companyName) {
      newErrors.companyName = "Company Name is Required";
    }
    if (!formValues.role) {
      newErrors.role = "Employee Role is Required";
    }

    if (!formValues.designation.trim()) {
      newErrors.designation = "Designation is Required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handlePhotoChange = (e) => {
    setFormValues({ ...formValues, photo: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    const formData = new FormData();
    Object.keys(formValues).forEach((key) => {
      formData.append(key, formValues[key]);
    });

    try {
      await axios.post("http://localhost:5000/api/users", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      alert("Registered successfully");
      navigate("/login");
    } catch (error) {
      console.error(error);
      alert("Registration Failed");
    }
  };

  return (
    <Container maxWidth="sm" sx={{ minHeight: "100vh" }}>
      <Box sx={{ mt: 5, padding: 2, borderRadius: 2, boxShadow: 3 }}>
        <Typography variant="h5" sx={{ textAlign: "center", fontWeight: "bold" }}>
          Register
        </Typography>
        <form onSubmit={handleSubmit} noValidate autoComplete="off">
          <TextField
            label="First Name"
            name="firstName"
            margin="dense"
            fullWidth
            value={formValues.firstName}
            onChange={handleChange}
            error={!!errors.firstName}
            helperText={errors.firstName}
          />
          <TextField
            label="Last Name"
            name="lastName"
            margin="dense"
            fullWidth
            value={formValues.lastName}
            onChange={handleChange}
            error={!!errors.lastName}
            helperText={errors.lastName}
          />
          
          <FormControl fullWidth margin="dense" error={!!errors.companyName}>
            <InputLabel>Company Name</InputLabel>
            <Select
              name="companyName"
              value={formValues.companyName}
              onChange={handleChange}
              label="Company Name"
            >
              <MenuItem value="Infosys">Infosys</MenuItem>
              <MenuItem value="TCS">TCS</MenuItem>
            </Select>
            {errors.companyName && <Typography color="error" size="2px">{errors.companyName}</Typography>}
          </FormControl>
          
          <FormControl fullWidth margin="dense" error={!!errors.role}>
            <InputLabel>Role</InputLabel>
            <Select
              name="role"
              value={formValues.role}
              onChange={handleChange}
              label="Role"
            >
              <MenuItem value="Manager">Manager</MenuItem>
              <MenuItem value="Employee">Employee</MenuItem>
            </Select>
            {errors.role && <Typography color="error">{errors.role}</Typography>}
          </FormControl>
          <TextField
            label="Designation"
            name="designation"
            margin="dense"
            fullWidth
            value={formValues.designation}
            onChange={handleChange}
            error={!!errors.designation}
            helperText={errors.designation}
          />
          <FormControl fullWidth margin="dense"variant="outlined">
            <InputLabel>Department</InputLabel>
            <Select
              name="department"
              sx={{width :520}}
              value={formValues.department}
              onChange={handleChange}
              label="Department"
            >
              <MenuItem value="Software Developement">Software Development</MenuItem>
              <MenuItem value="Human Resources"> Human Resources</MenuItem>
            </Select>
          </FormControl>
          <FormControl fullWidth margin="dense">
            <InputLabel>Job Location</InputLabel>
            <Select
              name="jobLocation"
              value={formValues.jobLocation}
              onChange={handleChange}
              label="Job Location"
            >
              <MenuItem value="Hyderabad">Hyderabad</MenuItem>
              <MenuItem value="Chennai">Chennai</MenuItem>
              <MenuItem value="Kerala">Kerala</MenuItem>
              <MenuItem value="Amaravati">Amaravati</MenuItem>
              <MenuItem value="Delhi">Delhi</MenuItem>
              <MenuItem value="Mumbai">Mumbai</MenuItem>
              <MenuItem value="Kolkata">Kolkata</MenuItem>
            </Select>
          </FormControl>
          
          <TextField
            label="Email"
            name="email"
            margin="dense"
            fullWidth
            value={formValues.email}
            onChange={handleChange}
            error={!!errors.email}
            helperText={errors.email}
          />
         
          <TextField
            label="Phone Number"
            name="phoneNumber"
            margin="dense"
            fullWidth
            value={formValues.phoneNumber}
            onChange={handleChange}
            error={!!errors.phoneNumber}
            helperText={errors.phoneNumber}
          />
          <TextField
            label="Password"
            type="password"
            name="password"
            margin="dense"
            fullWidth
            value={formValues.password}
            onChange={handleChange}
            error={!!errors.password}
            helperText={errors.password}
          />
  
          <Button
              variant="outlined"
              component="label"
              sx={{
                display: 'flex',
                justifyContent: 'flex-start', 
                height:56,width:520,mt:1
               }}  
            >
              
              <input
                type="file"
                name="photo" 
                onChange={handlePhotoChange} 
              />
              
            </Button>
            <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
                sx={{ mt: 2 }}
              >
                Register
              </Button> 

          <Typography sx={{ textAlign: "center" }}>
            Already have an account? <a href="/Login">Login</a>
          </Typography>
        </form>
      </Box>
    </Container>
  );
}

export default Register;
