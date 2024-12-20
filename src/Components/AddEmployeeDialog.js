import React, { useEffect, useState } from "react";
import { Dialog, DialogTitle, DialogContent, DialogActions, TextField, Button, FormControl, InputLabel, Select, MenuItem, Typography, Box, Autocomplete, Chip} from "@mui/material";
import axios from "axios";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";

const AddEmployeeDialog = ({ open, onClose, onSave,employeeId }) => {
  const initialUserState = {
    employeeId:employeeId,
    firstName: "",
    lastName: "",
    companyName: "",
    department: "",
    role: "",
    designation: "",
    jobLocation: "",
    email: "",
    phoneNumber: "",
    technicalSkills: [],
    dateOfBirth: null,
    photo: null,
    bloodGroup: "",
    password: "",
  };
  const [user, setUser] = useState(initialUserState);
  const [errors, setErrors] = useState({});
  const [skillsOption, setSkillsOption] = useState([]);
  const [newEmployeeId, setNewEmployeeId] = useState(employeeId || '');


  useEffect(() => {
    if (open) {
      setErrors({});
      setUser(initialUserState);
      setNewEmployeeId(employeeId);
    }
  }, [open,employeeId]);
  

  useEffect(() => {
    setSkillsOption([
      'JavaScript',
      'Python',
      'Java',
      'React',
      'Node.js',
      'HTML',
      'CSS',
      'Spring MVC',
      'JDBC',
      'Angular',
      'C++',
      'C#',
      'Ruby',
      'Django',
      'Flask',
      'SQL',
      'MongoDB',
      'AWS',
    ]);
  }, []);

  const validate = () => {
    const newErrors = {};
    
    if (!/^[a-zA-Z ]+$/.test(user.firstName)) {
      newErrors.firstName="Name must contain only letters and spaces";
    }
    if (!/^[a-zA-Z]+$/.test(user.lastName)) {
      newErrors.lastName = "Enter Last Name in letters";
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(user.email)) {
      newErrors.email = "Invalid Email address";
    }
    if (user.companyName) {
      const companyDomain = `@${user.companyName.toLowerCase()}.com`;
      if (!user.email.endsWith(companyDomain)) {
        newErrors.email = `Email must end with ${companyDomain}`;
      }
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(user.email)) {
      newErrors.email = "Invalid Email address.";
    }

    if (!user.designation) {
      newErrors.designation = "Enter your Designation.";
    }
    if (!/^\d{10}$/.test(user.phoneNumber)) {
      newErrors.phoneNumber = "Enter Phone number that must be 10 digits.";
    }
    
    if (!user.password || user.password.length < 6) {
      newErrors.password = "Password must contain at least 6 characters.";
    }
    if (!user.dateOfBirth) {
      newErrors.dateOfBirth = "Date of Birth is required.";
    }
    if (!user.photo) {
      newErrors.photo = "Please upload an image.";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
 
  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "photo") {
      setUser((prev) => ({ ...prev, photo: files[0] }));
    } 
     else {
      setUser((prev) => ({ ...prev, [name]: value }));
     
    }
  };

  const handleSkillsChange = (e, value) => {
    setUser((prev) => ({ ...prev, technicalSkills: value }));
  };

  const handleDateChange = (date) => {
    setUser((prev) => ({ ...prev, dateOfBirth: date }));
  };

  const handleSave = async () => {
    if (!validate()) return;

    const formData = new FormData();
    formData.append("photo", user.photo);
    formData.append("technicalSkills", user.technicalSkills.join(","));
    Object.keys(user).forEach((key) => {
      if (key !== "photo" && key !== "technicalSkills") {
        formData.append(
          key,
          key === "dateOfBirth" ? user[key]?.format("YYYY-MM-DD") : user[key]
        );
      }
    });

    try {
      const response = await axios.post(
        "http://localhost:5000/api/users",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      if (response.status === 201) {
        alert("User added successfully");
        setUser(initialUserState);
        onSave();
        onClose();
      }
    } catch (error) {
      console.error("Error adding user:", error);
      alert("User Adding Failed. Please try again.");
    }
  };

  const handleClose = () => {
    setUser(initialUserState);
    onClose();
  };
  
  return (
    <Dialog open={open} onClose={handleClose} 
    PaperProps={{
      style: {
        width: '80%',
        maxWidth: '800px',
      },
    }}
    >
      
      <DialogTitle fontWeight="bold">Add New Employee</DialogTitle>
      <DialogContent>
        <Box
          sx={{
            display: "grid",
            gap: 2,
            gridTemplateColumns: "repeat(auto-fit, minmax(370px, 1fr))",
          }}
        >
          <div style={{ display: "flex", alignItems: "flex-start" }}> 
          
          <TextField
            label="Employee ID"
            name="employeeId"
            value={newEmployeeId}
           
            variant="outlined"
            InputProps={{ readOnly: true }}
            sx={{ ml: 1, width: "740px", mt: 1, mr: 1 }}
          />

          </div>
          
          <div style={{ display: "flex", alignItems: "flex-start",  }}>
          <TextField
            label="First Name"
            name="firstName"
            variant="outlined"
            onChange={handleChange}
            inputProps={{maxLength:30}}
            error={!!errors.firstName}
            helperText={errors.firstName}
            sx={{ ml:1,width:'350px',mr:2.25,mt:1 }}
          
          /> 
            <TextField
              variant="outlined"
              name="lastName"
              label="Last Name"
              onChange={handleChange}
              inputProps={{maxLength:30}}
              error={!!errors.lastName}
              helperText={errors.lastName}
              sx={{ml:2.25,width:'350px' ,mt:1,mr:1}}
            />
          </div>   

          <div style={{ display: "flex", alignItems: "flex-start",  }}>
          <FormControl  sx={{ ml:1,width:'350px',mt:1 ,mr:2.25 }} margin="dense" error={!!errors.companyName} variant="outlined">
              <InputLabel>Company Name</InputLabel>
              <Select
                name="companyName"
                onChange={handleChange}
                label="Company Name"
              >
                <MenuItem value="Infosys">Infosys</MenuItem>
                <MenuItem value="TCS">TCS</MenuItem>
              </Select>
              {errors.companyName && <Typography color="error">{errors.companyName}</Typography>}
          </FormControl>
          <FormControl sx={{ ml:2.25, width:'350px',mt:1,mr:1 }} margin="dense"variant="outlined">
            <InputLabel>Department</InputLabel>
            <Select
              name="department"
              onChange={handleChange}
              label="Department"
            >
              <MenuItem value="Software Developement">Software Development</MenuItem>
              <MenuItem value="Human Resources"> Human Resources</MenuItem>
            </Select>
          </FormControl>
          </div>
         
          <div style={{ display: "flex", alignItems: "flex-start",  }}>
            <FormControl  sx={{ ml:1, width: '350px',mr:2.25}} margin="dense" error={!!errors.role} variant="outlined">
              <InputLabel>Role</InputLabel>
              <Select
                name="role"
                onChange={handleChange}
                label="Role"
              >
                <MenuItem value="Manager">Manager</MenuItem>
                <MenuItem value="Employee">Employee</MenuItem>
              </Select>
              {errors.role && <Typography color="error">{errors.role}</Typography>}
            </FormControl>
           
            <TextField
              variant="outlined"
              name="designation"
              label="Designation"
              onChange={handleChange}
              error={!!errors.designation}
              helperText={errors.designation}
              sx={{ml:2.25,width:'350px' ,mt:1,mr:1}}
            />
            </div>
          <div style={{ display: "flex", alignItems: "flex-start",  }}> 
          <FormControl sx={{ ml:1, width:'350px',mr:2.25,mt:1}} margin="dense"variant="outlined">
            <InputLabel>Job Location</InputLabel>
            <Select
              name="jobLocation"
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
              variant="outlined"
              name="email"
              label="Email"
              onChange={handleChange}
              inputProps={{maxLength:50}}
              error={!!errors.email}
              helperText={errors.email}
              sx={{ml:2.25,width:'350px',mt:1,mr:1}}
            />
          </div>
          {/*
            

          */}
          <div style={{ display: "flex", alignItems: "flex-start",  }}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              label="Date of Birth"
              sx={{ ml:1,width:'350px',mt:1,mr:2.25}}
              value={user.dateOfBirth}
              onChange={handleDateChange}
              renderInput={(params) => <TextField {...params} error={!!errors.dateOfBirth} helperText={errors.dateOfBirth} />}
            />
           
          </LocalizationProvider>
          <TextField 
              label="Phone Number"
              name="phoneNumber"
              variant='outlined'
              onChange={handleChange}
              error={!!errors.phoneNumber}
              helperText={errors.phoneNumber}
              sx={{ ml:2.25, width:'350px',mt:1,mr:1 }}
            />

          </div>
          
          <div style={{ display: "flex", alignItems: "flex-start",  }}>
            <FormControl sx={{ ml:1, width:'350px',mt:1 ,mr:2.25}} margin="dense"  variant="outlined">
              <InputLabel>Blood Group</InputLabel>
                <Select
                  name="bloodGroup"
                  onChange={handleChange}
                  label="Blood Group"
                >
                  <MenuItem value="A +ve">A +</MenuItem>
                  <MenuItem value="A -ve">A -</MenuItem>
                  <MenuItem value="B +ve">B +</MenuItem>
                  <MenuItem value="B -ve">B -</MenuItem>
                  <MenuItem value="O +ve">O +</MenuItem>
                  <MenuItem value="O -ve">O -</MenuItem>
                  <MenuItem value="AB +ve">AB +</MenuItem>
                  <MenuItem value="AB -ve">AB -</MenuItem>
                </Select> 
            </FormControl>
            <TextField
              type='password'
              label="Password"
              name="password"
              variant='outlined'
              onChange={handleChange}
              error={!!errors.password}
              helperText={errors.password}
              sx={{ ml:2.25, width:'350px',mr:1 ,mt:1}} 
            />
          </div>
          <div style={{ display: "flex", alignItems: "flex-start",  }}> 
            <Button
              variant="outlined"
              component="label"
              sx={{
                display: 'flex',
                justifyContent: 'flex-start', 
                height:56,width:'740px',ml:1,mt:1,mr:1
              }}  
            >
              
              <input
                type="file"
                name="photo" 
                onChange={handleChange} 
              />
              
            </Button>
             
          </div>
          {errors.photo && <div style={{ color: 'red', marginTop: '5px', marginLeft: '25px' }}>{errors.photo}</div>} 
          <div style={{ display: "flex", alignItems: "flex-start",  }}>
          <Autocomplete 
            multiple
            sx={{ ml:1,width:'740px',mt:1,mr:1}}
            options={skillsOption}
            onChange={handleSkillsChange}
            renderTags={(value, getTagProps) =>
              value.map((option, index) => (
                <Chip variant="contained" label={option} {...getTagProps({ index })} key={index} />
              ))
            }
            renderInput={(params) => <TextField {...params} label="Technical Skills" />}
            
          /> 
          </div>
          
        </Box>
        
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} variant='contained' color='error'>Cancel</Button>
        <Button onClick={handleSave} variant='contained'>Add</Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddEmployeeDialog;

