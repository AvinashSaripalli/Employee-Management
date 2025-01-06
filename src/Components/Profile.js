import React, { useState, useEffect } from "react";
import { Box, Paper, Typography, Avatar, IconButton, TextField, Button, Grid2 } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import axios from "axios";

const Profile = () => {
  const [editMode, setEditMode] = useState({
    designation: false,
    phoneNumber: false,  
  });

  const [userData, setUserData] = useState({
    userPhoto: localStorage.getItem("userPhoto") || "",
    userDesignation: localStorage.getItem("userDesignation") || "",
    userEmail: localStorage.getItem("userEmail") || "",
    userFirstName: localStorage.getItem("userFirstName") || "",
    userLastName: localStorage.getItem("userLastName") || "",
    userPhoneNumber: localStorage.getItem("userPhoneNumber") || "",
    userId: localStorage.getItem("userId") || "",
  });

  useEffect(() => {
    Object.keys(userData).forEach((key) => {
      localStorage.setItem(key, userData[key]);
    });
  }, [userData]);

  const handleEditClick = (field) => {
    setEditMode((prevState) => ({ ...prevState, [field]: true }));
  };

  const handleSaveClick = async (field) => {
    setEditMode((prevState) => ({ ...prevState, [field]: false }));
    localStorage.setItem(field, userData[field]);
  
    const userId = localStorage.getItem("userId");
  
    const dataToUpdate = {
      id: userId,
      designation: userData.userDesignation,
      phoneNumber: userData.userPhoneNumber,
    };
  
    try {
      const response = await axios.patch("http://localhost:5000/api/users/update", dataToUpdate);
  
      if (response.data.success) {
        alert("Updated successfully!");
      } else {
        alert("Update failed.");
      }
    } catch (error) {
      console.error("Error updating data:", error);
      alert("Failed to update data.");
    }
  };
  
  
  const handleChange = (e, field) => {
    setUserData({ ...userData, [field]: e.target.value });
  };

  return (
    <Box sx={{ mt: 4 }}>
      <Paper
        elevation={3}
        sx={{
          maxWidth: 500,
          mx: "auto",
          p: 3,
          display: "flex",
          flexDirection: "column",
        }}
      >
    
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            mb: 2,
          }}
        >
          <Avatar
            src={userData.userPhoto} 
            alt={`${userData.userFirstName} ${userData.userLastName}`}
            sx={{ width: 120, height: 120, mr: 4, ml: 9 }}
          />
          <Typography variant="h6" sx={{ fontWeight: "bold", fontSize: "26px" }}>
            {userData.userLastName} {userData.userFirstName}
          </Typography>
        </Box>

        <Paper sx={{ backgroundColor: "#da9ef4", p: 2 }}>
          <Grid2 container spacing={2}>
            <Grid2 size={4}>
              <Typography variant="body2" sx={{ fontWeight: "bold" }}>
                Email:
              </Typography>
            </Grid2>
            <Grid2 size={8} sx={{ display: "flex", alignItems: "center" }}>
              {userData.userEmail}
            </Grid2>

            <Grid2 size={4}>
              <Typography variant="body2" sx={{ fontWeight: "bold" }}>
                Designation:
              </Typography>
            </Grid2>
            <Grid2 size={8} sx={{ display: 'flex', alignItems: 'center' }}>
              {editMode.designation ? (
                <>
                  <TextField
                    size="small"
                    value={userData.userDesignation}
                    onChange={(e) => handleChange(e, "userDesignation")}
                    fullWidth
                  />
                  <Button
                    variant="contained"
                    size="small"
                    sx={{ ml: 1 }}
                    onClick={() => handleSaveClick("designation")}
                  >
                    Save
                  </Button>
                </>
              ) : (
                <>
                  {userData.userDesignation}
                  <IconButton
                    size="small"
                    onClick={() => handleEditClick("designation")}
                  >
                    <EditIcon sx={{ fontSize: 16 }} />
                  </IconButton>
                </>
              )}
            </Grid2>

            <Grid2 size={4}>
              <Typography variant="body2" sx={{ fontWeight: "bold" }}>
                Phone Number:
              </Typography>
            </Grid2>
            <Grid2 size={8} sx={{ display: "flex", alignItems: "center" }}>
              {editMode.phoneNumber ? (
                <>
                  <TextField
                    size="small"
                    value={userData.userPhoneNumber}
                    onChange={(e) => handleChange(e, "userPhoneNumber")}
                    fullWidth
                  />
                  <Button
                    variant="contained"
                    size="small"
                    sx={{ ml: 1 }}
                    onClick={() => handleSaveClick("phoneNumber")}
                  >
                    Save
                  </Button>
                </>
              ) : (
                <>
                  {userData.userPhoneNumber}
                  <IconButton
                    size="small"
                    onClick={() => handleEditClick("phoneNumber")}
                  >
                    <EditIcon sx={{ fontSize: 16 }} />
                  </IconButton>
                </>
              )}
            </Grid2>
          </Grid2>
        </Paper>
      </Paper>
    </Box>
  );
};

export default Profile;
