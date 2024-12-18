import React, { useState } from "react";
import { TextField, Button, Box, Typography, Container } from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Login() {
  const [loginValues, setLoginValues] = useState({
    email: "",
    //companyName: "",
    password: "",
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginValues({ ...loginValues, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/api/login", loginValues);
      if (response.data.success) {
        const { role, photo, companyName } = response.data;

        localStorage.setItem("userRole", role);
        localStorage.setItem("userPhoto", photo);
        localStorage.setItem("companyName", companyName);
        navigate("/Sidebar");
        console.log("Login Success");
        console.log(localStorage.getItem("userPhoto"));
      } else {
        alert("Invalid login credentials.");
      }
    } catch (error) {
      console.error("Login Failed", error);
    }
  };

  return (
    <Container
      maxWidth="sm"
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
      }}
    >
      <Box sx={{ mt: 5, padding: 3, borderRadius: 2, boxShadow: 3 }}>
        <Typography variant="h5" sx={{ textAlign: "center", fontWeight: "bold" }}>
          Login
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            label="Email"
            name="email"
            onChange={handleChange}
            fullWidth
            required
            margin="normal"
          />
          {/* <TextField
            label="Company Name"
            name="companyName"
            onChange={handleChange}
            fullWidth
            required
            margin="dense"
          /> */}
          <TextField
            label="Password"
            type="password"
            name="password"
            onChange={handleChange}
            fullWidth
            required
            margin="normal"
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            sx={{ mt: 4 }}
          >
            Login
          </Button>
          <Typography sx={{ textAlign: "center" }}>
            Don't have an account? <a href="/Register">Register</a>
          </Typography>
        </form>
      </Box>
    </Container>
  );
}

export default Login;
