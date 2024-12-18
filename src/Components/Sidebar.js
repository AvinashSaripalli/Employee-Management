import React, { useState, useEffect } from 'react';
import { AppBar, Drawer, List, ListItem, ListItemText, ListItemIcon, Toolbar, Typography, ListItemButton, Box, Divider, Avatar } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import ListIcon from '@mui/icons-material/List';
import Home from './Home';
import EmployeesList from './EmployeesList';
import { useNavigate } from 'react-router-dom';
import AdbIcon from '@mui/icons-material/Adb';
import Container from '@mui/material/Container';
import PersonIcon from '@mui/icons-material/Person';
import Dashboard from './Dashboard';

const Sidebar = () => {
  const [selectedComponent, setSelectedComponent] = useState('EmployeesList');
  const [userPhoto, setUserPhoto] = useState(null); 
  const [companyName, setCompanyName] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const photo = localStorage.getItem("userPhoto");
    const company = localStorage.getItem("companyName");
  
    if (photo) 
      setUserPhoto(photo);
    if (company) setCompanyName(company);
  
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("userPhoto");
    localStorage.removeItem("companyName");
    localStorage.removeItem("userRole");
    navigate('/login'); 
   
  };

  const handleListItemOnClick = (component) => {
    setSelectedComponent(component);
  };

  const renderComponent = () => {
    switch (selectedComponent) {
      case 'Home':
        return <Home />;
      case 'Dashboard':
        return <Dashboard />;
      case 'Users List':
        return <EmployeesList />;
      default:
        return <EmployeesList />;
    }
  };

  return (
    <Box>
      <AppBar sx={{ backgroundColor: '#002168', padding: '0 20px', zIndex: (theme) => theme.zIndex.drawer + 1 }}>
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <AdbIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
            <Typography
              variant="h6"
              noWrap
              sx={{
                fontFamily: "monospace",
                fontWeight: 700,
                // letterSpacing: ".1rem",
                color: "inherit",
                textDecoration: "none",
              }}
            >
              {companyName } 
            </Typography>

            <Box sx={{ flexGrow: 1 }} />
            <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
              <Avatar src={userPhoto} /> 
            </Box>
          </Toolbar>
        </Container>
      </AppBar>

      <Drawer
        variant="permanent"
        sx={{
          width: 250,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: {
            width: 250,
            boxSizing: 'border-box',
            mt: '64px',
            alignItems: 'center',
            backgroundColor: '#8e44ad !important',
          },
        }}
      >
        <List sx={{ height: '100vh' }}>
          <ListItem>
            <ListItemButton onClick={() => handleListItemOnClick('Home')}>
              <ListItemIcon sx={{ color: 'white' }}>
                <HomeIcon />
              </ListItemIcon>
              <ListItemText primary="Home" sx={{ color: 'white', fontWeight: 'bold' }} />
            </ListItemButton>
          </ListItem>
          <Divider />
          <ListItem>
            <ListItemButton onClick={() => handleListItemOnClick('Dashboard')}>
              <ListItemIcon sx={{ color: 'white' }}>
                <HomeIcon />
              </ListItemIcon>
              <ListItemText primary="Dashboard" sx={{ color: 'white', fontWeight: 'bold' }} />
            </ListItemButton>
          </ListItem>
          <ListItem>
            <ListItemButton onClick={() => handleListItemOnClick('Users List')}>
              <ListItemIcon sx={{ color: 'white' }}>
                <ListIcon />
              </ListItemIcon>
              <ListItemText primary="Employees List" sx={{ color: 'white', fontSize: '50px' }} />
            </ListItemButton>
          </ListItem>
          <Divider />
          <ListItem>
            <ListItemButton>
              <ListItemIcon sx={{ color: 'white' }}>
                <PersonIcon/>
              </ListItemIcon>
              <ListItemText primary="Profile" sx={{ color: 'white', fontSize: '50px' }} />
            </ListItemButton>
          </ListItem>
          <Divider/>
          <ListItem>
            <ListItemButton onClick={handleLogout}>
              <ListItemIcon sx={{ color: 'white' }}>
                <ExitToAppIcon />
              </ListItemIcon>
              <ListItemText primary="LogOut" sx={{ color: 'white', fontWeight: 'bold' }} />
            </ListItemButton>
          </ListItem>
        </List>
      </Drawer>

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          ml: '250px',
          mt: '64px',
        }}
      >
        {renderComponent()}
      </Box>
    </Box>
  );
};

export default Sidebar;

