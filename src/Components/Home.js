import React from 'react';
import { Box, Typography, Card, CardMedia, CardContent } from '@mui/material';
import homeImage from './pexels-mikebirdy-3729464.jpg'; 
const Home = () => {
  return (
    <Box sx={{ textAlign: 'center', mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Welcome to Home
      </Typography>

      <Card sx={{ maxWidth: 400, mx: 'auto', mb: 3 }}>
        <CardMedia
          component="img"
          image= {homeImage}
          alt="Home"
          sx={{ width: '100%', height: 'auto' }}
        />
        <CardContent>
          <Typography variant="h6" component="div">
            AMG® is short for Aufecht, Melcher, and Großaspach, the division of Mercedes-Benz that produces performance vehicles. 
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
};

export default Home;






