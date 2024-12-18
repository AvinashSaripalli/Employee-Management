 // "start": "react-scripts --max_old_space_size=4096 start",
    // "build": "react-scripts --max_old_space_size=4096 build",

{/*
       <Paper
      sx={(theme) => ({
        p: 2,
        margin: 'auto',
        maxWidth: 500,
        flexGrow: 1,
        backgroundColor: '#fff',
        ...theme.applyStyles('dark', {
          backgroundColor: '#1A2027',
        }),
      })}
    >
      <Grid container spacing={2}>
        <Grid item>
          <ButtonBase sx={{ width: 128, height: 128 }}>
            <Img alt="complex" src="/static/images/grid/complex.jpg" />
          </ButtonBase>
        </Grid>
        <Grid item xs={12} sm container>
          <Grid item xs container direction="column" spacing={2}>
            <Grid item xs>
              <Typography gutterBottom variant="subtitle1" component="div">
                Standard license
              </Typography>
              <Typography variant="body2" gutterBottom>
                Full resolution 1920x1080 • JPEG
              </Typography>
              <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                ID: 1030114
              </Typography>
            </Grid>
            <Grid item>
              <Typography sx={{ cursor: 'pointer' }} variant="body2">
                Remove
              </Typography>
            </Grid>
          </Grid>
          <Grid item>
            <Typography variant="subtitle1" component="div">
              $19.00
            </Typography>
          </Grid>
        </Grid>
      </Grid>
    </Paper>
   
   */}

   {/*
    <Box
          component="form"
          sx={{ '& .MuiTextField-root': { m:1, width: '37ch', marginLeft:4,}}}
            // sx={{display: 'flex', flexWrap: 'wrap' }}

          noValidate
          autoComplete="off" 
        >
          <div>
            <TextField
              variant="outlined"
              name="firstName"
              label="First Name"
              onChange={handleChange}
              error={!!errors.firstName}
              helperText={errors.firstName}
              sx={{width:'370px' }}
            />
            <TextField
              variant="outlined"
              name="lastName"
              label="Last Name"
              onChange={handleChange}
              error={!!errors.lastName}
              helperText={errors.lastName}
              sx={{width:'370px'}}
            />
          </div>
          <div>
          
          <FormControl  sx={{ m:1, width:'360px', marginLeft:4 }} margin="dense" error={!!errors.companyName} variant="outlined">
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
          <FormControl sx={{ m:1, width:'360px', marginLeft:2 }} margin="dense"variant="outlined">
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
          <div>
            <FormControl  sx={{ m:1, minWidth: 215.63, marginLeft:2 }} margin="dense" error={!!errors.role} variant="outlined">
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
            />
            </div>
            <div>
           
          <FormControl sx={{ m:1, minWidth: 215.63, marginLeft:4 }} margin="dense"variant="outlined">
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
              error={!!errors.email}
              helperText={errors.email}
            />
          </div>
          <div style={{ display: "flex", alignItems: "flex-start",  }}>
        
          
          {errors.technicalSkills && <Typography color="error">{errors.technicalSkills}</Typography>}
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              label="Date of Birth"
              sx={{width:'215.63'}}
              value={user.dateOfBirth}
              onChange={handleDateChange}
              renderInput={(params) => <TextField {...params} error={!!errors.dateOfBirth} helperText={errors.dateOfBirth} />}
            />
          </LocalizationProvider>

          </div>
          
          <div>
            <FormControl sx={{ m:1, minWidth: 215.63, marginLeft:4 }} margin="dense"  variant="outlined">
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
              label="Phone Number"
              name="phoneNumber"
              variant='outlined'
              onChange={handleChange}
              error={!!errors.phoneNumber}
              helperText={errors.phoneNumber}
            />

              {/* <PhoneInput
                defaultCountry="in"
                name="phoneNumber"
                value={user.phoneNumber}
                onChange={handlePhoneChange}
                inputStyle={{
                  width: '520px',
                  height: '36px',
                  padding: '0 12px',
                  border: '1px solid #ccc',
                  borderRadius: '4px',
                  fontSize: '16px',
                }}
                  buttonStyle={{
                      height: '36px',
                      borderTopLeftRadius: '4px',
                      borderBottomLeftRadius: '4px',
                      borderRight: 'none',
                   
                    }}
                    containerStyle={{
                      width: '520px'
                    }}
                  />
              {errors.phoneNumber && (
                <Typography color="error" variant="body2" sx={{ marginTop: 1 }}>
                  {errors.phoneNumber}
                </Typography>
              )} */}

            //   </div>
            //   <div>
            //     <TextField
            //       type='password'
            //       label="Password"
            //       name="password"
            //       variant='outlined'
            //       onChange={handleChange}
            //       error={!!errors.password}
            //       helperText={errors.password}
            //     />
                
                
            //     <input
            //       accept="image/*"
            //       type="file"
            //       name="photo"
            //       onChange={handleChange}
            //       style={{ marginTop: 25,marginLeft: 25 }}
            //     />
            //     {errors.photo && <div style={{ color: 'red', marginTop: '5px', marginLeft: '25px' }}>{errors.photo}</div>}
              
    
                
            //   </div>
            //   <div sx={{width:480}}>
            //   <Autocomplete 
            //     multiple
            //     sx={{width:480}}
            //     options={skillsOption}
            //     onChange={handleSkillsChange}
            //     renderTags={(value, getTagProps) =>
            //       value.map((option, index) => (
            //         <Chip variant="contained" label={option} {...getTagProps({ index })} key={index} />
            //       ))
            //     }
            //     renderInput={(params) => <TextField {...params} label="Technical Skills" />}
            //   />
            //   </div>    
            // </Box>
    
    
            // import React, { useEffect, useState } from 'react';
            // import {
            //   Dialog, DialogTitle, DialogContent, DialogActions,
            //   TextField, Button, FormControl, InputLabel, Select,
            //   MenuItem, Typography, Box, Autocomplete, Chip
            // } from '@mui/material';
            // import axios from 'axios';
            
            // import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
            // import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
            // import { DatePicker } from '@mui/x-date-pickers/DatePicker';
            // import dayjs from 'dayjs';
            
            // const AddEmployeeDialog = ({ open, onClose, onSave }) => {
            //   const initialUserState = {
            //     firstName: '',
            //     lastName: '',
            //     companyName: '',
            //     department: '',
            //     role: '',
            //     designation: '',
            //     jobLocation: '',
            //     email: '',
            //     phoneNumber: '',
            //     technicalSkills: [],
            //     dateOfBirth: null,
            //     photo: null,
            //     password: '',
            //   };
            //   const [user, setUser] = useState(initialUserState);
            //   const [errors, setErrors] = useState({});
            //   const [skillsOption, setSkillsOption] = useState([]);
            
            //   useEffect(() => {
            //     if (open) {
            //       setErrors({});
            //       setUser(initialUserState);
            //     }
            //   }, [open]);
            
            //   useEffect(() => {
            //     setSkillsOption([
            //       'JavaScript', 'Python', 'Java', 'React', 'Node.js', 'HTML', 'CSS',
            //       'Spring MVC', 'Angular', 'C++', 'SQL', 'AWS',
            //     ]);
            //   }, []);
            
            //   const validate = () => {
            //     const newErrors = {};
            //     if (!/^[a-zA-Z]+$/.test(user.firstName)) newErrors.firstName = 'Enter a valid First Name';
            //     if (!/^[a-zA-Z]+$/.test(user.lastName)) newErrors.lastName = 'Enter a valid Last Name';
            //     if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(user.email)) newErrors.email = 'Invalid Email';
            //     if (!user.designation) newErrors.designation = 'Designation is required';
            //     if (!/^\d{10}$/.test(user.phoneNumber)) newErrors.phoneNumber = 'Phone Number must be 10 digits';
            //     if (!user.password || user.password.length < 6) newErrors.password = 'Password must be at least 6 characters';
            //     if (!user.dateOfBirth) newErrors.dateOfBirth = 'Date of Birth is required';
            //     if (user.technicalSkills.length === 0) newErrors.technicalSkills = 'Select at least one skill';
            //     if (!user.photo) newErrors.photo = 'Please upload an image';
            //     setErrors(newErrors);
            //     return Object.keys(newErrors).length === 0;
            //   };
            
            //   const handleChange = (e) => {
            //     const { name, value, files } = e.target;
            //     if (name === 'photo') {
            //       setUser((prev) => ({ ...prev, photo: files[0] }));
            //     } else {
            //       setUser((prev) => ({ ...prev, [name]: value }));
            //     }
            //   };
            
            //   const handleSkillsChange = (e, value) => {
            //     setUser((prev) => ({ ...prev, technicalSkills: value }));
            //   };
            
            //   const handleDateChange = (date) => {
            //     setUser((prev) => ({ ...prev, dateOfBirth: date }));
            //   };
            
            //   const handleSave = async () => {
            //     if (!validate()) return;
            //     const formData = new FormData();
            //     Object.keys(user).forEach((key) => {
            //       formData.append(key, key === 'dateOfBirth' ? user[key]?.format('DD-MM-YYYY') : user[key]);
            //     });
            
            //     try {
            //       const response = await axios.post('http://localhost:5000/api/users', formData, {
            //         headers: { 'Content-Type': 'multipart/form-data' },
            //       });
            //       if (response.status === 200 || response.status === 201) {
            //         alert('User added successfully');
            //         setUser(initialUserState);
            //         onSave();
            //         onClose();
            //       } else {
            //         alert(`Failed: ${response.statusText}`);
            //       }
            //     } catch (error) {
            //       console.error('Error adding user:', error);
            //       alert('Failed to add user. Please try again.');
            //     }
            //   };
            
            //   const handleClose = () => {
            //     setUser(initialUserState);
            //     onClose();
            //   };
            
            //   return (
            //     <Dialog
            //       open={open}
            //       onClose={handleClose}
            //       PaperProps={{ style: { width: '80%', maxWidth: '800px' } }}
            //     >
            //       <DialogTitle fontWeight="bold">Add New Employee</DialogTitle>
            //       <DialogContent>
            //         <Box
            //           sx={{
            //             display: 'grid',
            //             gap: 2,
            //             gridTemplateColumns: 'repeat(auto-fit, minmax(370px, 1fr))',
            //           }}
            //         >
            //           <TextField
            //             name="firstName"
            //             label="First Name"
            //             onChange={handleChange}
            //             error={!!errors.firstName}
            //             helperText={errors.firstName}
            //           />
            //           <TextField
            //             name="lastName"
            //             label="Last Name"
            //             onChange={handleChange}
            //             error={!!errors.lastName}
            //             helperText={errors.lastName}
            //           />
            //           {/* Additional fields follow the same structure */}
            //         </Box>
            //       </DialogContent>
            //       <DialogActions>
            //         <Button onClick={handleClose} variant="contained" color="error">Cancel</Button>
            //         <Button onClick={handleSave} variant="contained">Add</Button>
            //       </DialogActions>
            //     </Dialog>
            //   );
            // };
            
            // export default AddEmployeeDialog;
            
{/*  
  const express = require("express");
const bodyParser = require("body-parser");
const mysql = require("mysql");
const cors = require("cors");
const multer = require("multer");
const path = require("path");
const app = express();
const port = 5000;

app.use(cors());
app.use(bodyParser.json());
app.use("/uploads", express.static("uploads"));

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "root",
  database: "data_user",
});

db.connect((err) => {
  if (err) {
    console.error("MySQL connection error:", err);
    return;
  }
  console.log("MySQL Connected...");
});

const storage = multer.diskStorage({
  destination: "./uploads/",
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});
const upload = multer({ storage });

// Add User Endpoint
app.post("/api/users", upload.single("photo"), (req, res) => {
  const {
    firstName,
    lastName,
    email,
    phoneNumber,
    password,
    companyName,
    role,
    designation,
    department,
    jobLocation,
    dateOfBirth,
    bloodGroup,
    technicalSkills,
  } = req.body;

  const photo = req.file ? `/uploads/${req.file.filename}` : null;

  const query = `INSERT INTO users 
  (firstName, lastName, email, phoneNumber, password, companyName, role, designation, department, jobLocation, dateOfBirth, bloodGroup, photo, technicalSkills)
  VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

  db.query(
    query,
    [
      firstName,
      lastName,
      email,
      phoneNumber,
      password,
      companyName,
      role,
      designation,
      department,
      jobLocation,
      dateOfBirth,
      bloodGroup,
      photo,
      technicalSkills,
    ],
    (err, result) => {
      if (err) {
        console.error("MySQL error:", err);
        return res.status(500).json({ error: "Failed to add user" });
      }
      res.status(201).json({ message: "User added successfully" });
    }
  );
});

// Start server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});


  */}


  {/*
      app.post("/api/users", upload.single("photo"), (req, res) => {
  const { firstName, lastName, email, phoneNumber, password, companyName, role, designation, department, jobLocation, dateOfBirth, bloodGroup, technicalSkills } = req.body;
  const photo = req.file ? `/uploads/${req.file.filename}` : null;

  // Query to fetch the last employee ID for the given company
  const getLastEmployeeIdQuery = `SELECT employeeId FROM users WHERE companyName = ? ORDER BY id DESC LIMIT 1`;

  db.query(getLastEmployeeIdQuery, [companyName], (err, results) => {
    if (err) {
      console.error("Error fetching last employee ID:", err);
      return res.status(500).json({ error: "Error fetching last employee ID" });
    }

    // Generate the new employee ID
    let newEmployeeId;
    if (results.length > 0 && results[0].employeeId) {
      const lastId = results[0].employeeId.match(/\d+$/);
      const nextId = lastId ? parseInt(lastId[0], 10) + 1 : 1;
      newEmployeeId = `${companyName}${nextId.toString().padStart(3, "0")}`;
    } else {
      newEmployeeId = `${companyName}001`;
    }

    // Insert the new user into the database
    const insertQuery = `INSERT INTO users 
      (firstName, lastName, email, phoneNumber, password, companyName, role, designation, department, jobLocation, dateOfBirth, bloodGroup, photo, technicalSkills, employeeId)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

    db.query(
      insertQuery,
      [firstName, lastName, email, phoneNumber, password, companyName, role, designation, department, jobLocation, dateOfBirth, bloodGroup, photo, technicalSkills, newEmployeeId],
      (err, result) => {
        if (err) {
          console.error("MySQL error:", err);
          return res.status(500).json({ error: "Failed to add user" });
        }
        res.status(201).json({ message: "User added successfully", employeeId: newEmployeeId });
      }
    );
  });
});

    
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
    const response = await axios.post("http://localhost:5000/api/users", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    if (response.status === 201) {
      alert(`User added successfully with Employee ID: ${response.data.employeeId}`);
      setUser(initialUserState);
      onSave();
      onClose();
    }
  } catch (error) {
    console.error("Error adding user:", error);
    alert("User Adding Failed. Please try again.");
  }
};

    
    */}


    {/*
      const AddEmployeeDialog = ({ open, onClose, onSave, employeeId }) => {
  const [newEmployeeId, setNewEmployeeId] = useState(employeeId || '');

  useEffect(() => {
    setNewEmployeeId(employeeId); // Update the field when employeeId prop changes
  }, [employeeId]);

  const handleSave = async () => {
    try {
      await axios.post('http://localhost:5000/api/users', {
        employeeId: newEmployeeId,
        // Include other fields as well...
      });
      onSave();
      onClose();
    } catch (error) {
      console.error('Error saving new employee:', error);
    }
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Add Employee</DialogTitle>
      <DialogContent>
        <TextField
          label="Employee ID"
          value={newEmployeeId}
          disabled
          fullWidth
          margin="normal"
        />
        {/* Add other input fields here */}
  //       </DialogContent>
  //       <DialogActions>
  //         <Button onClick={onClose} color="primary">
  //           Cancel
  //         </Button>
  //         <Button onClick={handleSave} color="primary">
  //           Save
  //         </Button>
  //       </DialogActions>
  //     </Dialog>
  //   );
  // };
  
      
     // */}


     {/*
        // const handleClickOpenAddUser = () => {
  //   const employeeIds = users.map((user) => user.employeeId);
  //   const numericIds = employeeIds
  //     .map((id) => parseInt(id.match(/\d+/)?.[0], 1000)) 
  //     .filter((num) => !isNaN(num)); 
  
  //   const maxNumericId = numericIds.length > 0 ? Math.max(...numericIds) : 0;
  //   const nextEmployeeId = `TCS${(maxNumericId + 1).toString().padStart(3, '0')}`;
  
  //   setOpenAddUser(true);
  //   setSelectedUser({ employeeId: nextEmployeeId });
  // };

  // const handleClickOpenAddUser = () => {
  //   const companyName = localStorage.getItem('companyName');
  //   const employeeIds = users.map((user) => user.employeeId);
  
  //   const numericIds = employeeIds
  //     .filter((id) => id.startsWith(companyName)) 
  //     .map((id) => parseInt(id.replace(companyName, "").match(/\d+/)?.[0], 10)) 
  //     .filter((num) => !isNaN(num)); // Ensure valid numbers
  
  //   const maxNumericId = numericIds.length > 0 ? Math.max(...numericIds) : 0;
  //   const nextEmployeeId = `${companyName}${(maxNumericId + 1).toString().padStart(3, '0')}`;
  
  //   setOpenAddUser(true);
  //   setSelectedUser({ employeeId: nextEmployeeId });
  // };
      */}