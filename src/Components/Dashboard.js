import React, { useState, useEffect } from 'react';
import { XAxis, YAxis, Tooltip, ResponsiveContainer, Line, LineChart, CartesianGrid, PieChart, Pie,Cell,Text, BarChart,Bar,Legend } from 'recharts';
import { Box, Typography, Paper } from '@mui/material';
import axios from 'axios';

const Dashboard = () => {
  const [monthOrder, setMonthOrder] = useState([
    { name: "January", userCount: 0 },
    { name: "February", userCount: 0 },
    { name: "March", userCount: 0 },
    { name: "April", userCount: 0 },
    { name: "May", userCount: 0 },
    { name: "June", userCount: 0 },
    { name: "July", userCount: 0 },
    { name: "August", userCount: 0 },
    { name: "September", userCount: 0 },
    { name: "October", userCount: 0 },
    { name: "November", userCount: 0 },
    { name: "December", userCount: 0 },
  ]);

  const [locationOrder, setLocationOrder]=useState([
    { locationName: 'Hyderabad', locations: 61 },
    { locationName: 'Kerala', locations: 27 },
    { locationName: 'Amaravati', locations: 75 },
    { locationName: 'Chennai', locations: 14 },
    { locationName: 'Mumbai', locations: 24 },
    { locationName: 'Kolkata', locations: 25 },
    { locationName: 'Delhi', locations: 10 },
  ]);
  const [departmentOrder,setDepartmentOrder]=useState([
    {departmentName:'Human Resources',indepartment:10},
    {departmentName:'Software Development',indepartment:20},
    {departmentName:'Accounting',indepartment:9},
    {departmentName:'Research',indepartment:1},
    {departmentName:'Testing',indepartment:17},
    {departmentName:'Design',indepartment:22},
    {departmentName:'Marketing',indepartment:22},
    
  ]);

  const colors = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#A28EEC', '#FF6F61', '#4CAF50'];

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const companyName = localStorage.getItem('companyName');

        if (!companyName) {
          console.error('No company name found in localStorage');
          return;
        }

        const { data } = await axios.get('http://localhost:5000/api/users-by-month', {
          params: { companyName },
        });

        const updatedMonthOrder = monthOrder.map((month, index) => {
          const foundUser = data.find((item) => item.month === index + 1);
          return {
            name: month.name,
            userCount: foundUser ? foundUser.userCount : 0,
          };
        });
        setMonthOrder(updatedMonthOrder);
        const { data: usersByLocationData } = await axios.get('http://localhost:5000/api/users-by-location', {
          params: { companyName },
        });
  
        const updatedLocationOrder = locationOrder.map((location) => {
          const foundLocation = usersByLocationData.find((item) => item.locationName === location.locationName);
          return {
            locationName: location.locationName,
            locations: foundLocation ? foundLocation.locations : 0,
          };
        });
        setLocationOrder(updatedLocationOrder);

        const{ data: usersByDepartmentData } =await axios.get('http://localhost:5000/api/users-by-departments',{
          params: { companyName },
        });
        const updatedDepartmentOrder =departmentOrder.map((departments)=>{
          const foundDepartment =usersByDepartmentData.find((item)=> item.departmentName===departments.departmentName);
          return{
            departmentName: departments.departmentName,
            indepartment: foundDepartment ? foundDepartment.indepartment : 0, 
          }
        });
        setDepartmentOrder(updatedDepartmentOrder);
       
      } catch (err) {
        console.error('Failed to fetch user data:', err);
      }
    };

    fetchUserData();
  }, []);

  return (
    <Box sx={{ p: 2, backgroundColor: "#f0e9f3" }}>
      <Typography variant="h5" sx={{ fontWeight: 'bold' }} gutterBottom>
        Employees Chart
      </Typography>
      <Box sx={{ display: 'flex', flexDirection: 'row', gap: 6}}>
        <Paper sx={{ flex: 1, height: 400 }}>
        <ResponsiveContainer width={700} height={350} >
        <h3 style={{ textAlign: 'center' }}>EmployeesCount</h3>
            <LineChart data={monthOrder} margin={{ top: 20, right: 20, left: 20, bottom: 20 }}>
              <XAxis dataKey="name" angle={-45} textAnchor="end" interval={0} height={65} />
              <YAxis />
              <CartesianGrid strokeDasharray="3 3" />
              <Tooltip />
              <Legend/>
              <Line type="monotone" dataKey="userCount" stroke="#ff0000" activeDot={{ r: 4 }} />
            </LineChart>
          </ResponsiveContainer>
        </Paper>
        <Paper sx={{ flex: 2, height: 400 }}> 
          <ResponsiveContainer width="100%" height="100%">
            <h3 style={{ textAlign: 'center' }}>Locations</h3>
            <PieChart>
              <Legend layout="vertical" verticalAlign="top" align="right" />
              <Pie data={locationOrder} dataKey="locations" nameKey="locationName" cx="50%" cy="50%" outerRadius={100} fill="#8884d8" label >
              {locationOrder.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
                ))}  
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </Paper> 
      </Box>
      <Box sx={{ display: 'flex', flexDirection: 'row', gap: 6, marginTop: 4}}>
        <Paper sx={{ flex: 1, height: 500 }}>
        <ResponsiveContainer width={1150} height={450} >
        <h3 style={{ textAlign: 'center' }}>Departments</h3>
        <BarChart width={900} height={200} data={departmentOrder} margin={{ top: 20, right: 20, left: 20, bottom: 20 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="departmentName" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="indepartment" fill="#8884d0" />
        </BarChart>
        </ResponsiveContainer>
        </Paper>
      </Box>
    </Box>
    
  );
};
export default Dashboard;
