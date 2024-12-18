import React, { useState, useEffect } from 'react';
import { XAxis, YAxis, Tooltip, ResponsiveContainer, AreaChart ,Area,CartesianGrid,Line,LineChart,Bar,BarChart} from 'recharts';
import { Box, Typography } from '@mui/material';

const Dashboard = () => {
  
  const monthOrder = [
    {name:"January",userCount:1}, {name:'February',userCount:2}, {name:'March',userCount:2},{ name:'April',userCount:4}, {name:'May',userCount:2}, {name:'June',userCount:3},
    {name:'July',userCount:1}, {name:'August',userCount:0}, {name:'September',userCount:1}, {name:'October',userCount:1}, {name:'November',userCount:2}, {name:'December',userCount:9}
  ];

  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="h5" gutterBottom>
        Users Chart
      </Typography>
      <ResponsiveContainer width="100%" height={500}>
        <LineChart
          data={monthOrder}
          margin={{ top: 5, right: 20, left: 20, bottom: 5 }}
        >
          <XAxis dataKey="name" />
          <YAxis />
          <CartesianGrid strokeDasharray="3 3" />
          <Tooltip />
          <Line type="monotone" dataKey="userCount" stroke="#ff0000" activeDot={{ r: 4 }} />
        </LineChart>
      </ResponsiveContainer>
    </Box>
  );
};

export default Dashboard;


// import React, { useState, useEffect } from 'react';
// import { XAxis, YAxis, Tooltip, ResponsiveContainer, Line, LineChart, CartesianGrid } from 'recharts';
// import { Box, Typography } from '@mui/material';
// import axios from 'axios';

// const Dashboard = () => {
//   const [monthOrder, setMonthOrder] = useState([
//     { name: "January", userCount: 0 },
//     { name: "February", userCount: 0 },
//     { name: "March", userCount: 0 },
//     { name: "April", userCount: 0 },
//     { name: "May", userCount: 0 },
//     { name: "June", userCount: 0 },
//     { name: "July", userCount: 0 },
//     { name: "August", userCount: 0 },
//     { name: "September", userCount: 0 },
//     { name: "October", userCount: 0 },
//     { name: "November", userCount: 0 },
//     { name: "December", userCount: 0 }
//   ]);

//   useEffect(() => {
//     const fetchUserData = async () => {
//       try {
//         const companyName = localStorage.getItem('companyName');

//         if (!companyName) {
//           console.error('No company name found in localStorage');
//           return;
//         }

//         const { data } = await axios.get('http://localhost:5000/api/users-by-month', {
//           params: { companyName }
//         });

//         const updatedMonthOrder = monthOrder.map((month, index) => {
//           const foundUser = data.find(item => item.month === index + 1);
//           return {
//             name: month.name,
//             userCount: foundUser ? foundUser.userCount : 0
//           };
//         });
        
//         setMonthOrder(updatedMonthOrder);
//       } catch (err) {
//         console.error('Failed to fetch user data:', err);
//       }
//     };

//     fetchUserData();
//   }, []);

//   return (
//     <Box sx={{ p: 2 }}>
//       <Typography variant="h5" gutterBottom>
//         Users Chart
//       </Typography>
//       <ResponsiveContainer width="100%" height={500}>
//         <LineChart
//           data={monthOrder}
//           margin={{ top: 5, right: 20, left: 20, bottom: 5 }}
//         >
//           <XAxis dataKey="name" />
//           <YAxis />
//           <CartesianGrid strokeDasharray="3 3" />
//           <Tooltip />
//           <Line type="monotone" dataKey="userCount" stroke="#ff0000" activeDot={{ r: 4 }} />
//         </LineChart>
//       </ResponsiveContainer>
//     </Box>
//   );
// };

// export default Dashboard;
