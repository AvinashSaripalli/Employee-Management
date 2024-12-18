import React, { useEffect, useState } from 'react';
import {
  Typography, Box, Button, TextField, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Checkbox, TablePagination,
  IconButton,
} from '@mui/material';
import axios from 'axios';
import EditEmployeeDialog from './EditEmployeeDialog';
import AddEmployeeDialog from './AddEmployeeDialog';
import DeleteDialog from './DeleteDialog';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import ViewEmployeeDialog from './ViewEmployeeDialog';

const EmployeesList = ({ onClose }) => {
  const [openAddUser, setOpenAddUser] = useState(false);
  
  const [openDeleteUser, setOpenDeleteUser] = useState(false);
  const [users, setUsers] = useState([]);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  // const [page, setPage] = useState(0);
  // const [rowsPerPage, setRowsPerPage] = useState(5);
  const [searchValue, setSearchValue] = useState('');
  const [viewDialogOpen, setViewDialogOpen] = useState(false);
  const [viewUser, setViewUser] = useState(null);

  const fetchUsers = async () => {
    const companyName = localStorage.getItem('companyName');
    const role = localStorage.getItem('userRole'); 
    try {
      const response = await axios.get('http://localhost:5000/api/users', {
        params: { companyName, role }, 
      });
      setUsers(response.data);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleClickOpenDeleteUser = () => {
    setOpenDeleteUser(true);
  };

  const handleCloseDeleteUser = () => {
    setOpenDeleteUser(false);
  };

  // const handleClickOpenAddUser = () => {
  //   setOpenAddUser(true);
  // };
  
  // const handleClickOpenAddUser = () => {
  //   const companyName = localStorage.getItem('companyName');
  //   const employeeIds = users.map((user) => parseInt(user.employeeId)).filter((id) => !isNaN(id)); 
  
  //   const maxEmployeeId = employeeIds.length > 0 ? Math.max(...employeeIds) : 0; 
  //   const nextEmployeeId = maxEmployeeId+1;
   
  //   setOpenAddUser(true);
  //   setSelectedUser({ employeeId: nextEmployeeId }); 
  // }; 
  
 
  const handleClickOpenAddUser = () => {
    const companyName = localStorage.getItem('companyName');
    const employeeIds = users.map((user) => user.employeeId);
  
    const allEmployeesIds = employeeIds
      //.filter((id) => id.startsWith(companyName)) 
      .map((id) => parseInt(id.replace(companyName, "").match(/\d+/)?.[0], 10)) 
      .filter((num) => !isNaN(num));
  
    const maxEmployeeId = allEmployeesIds.length > 0 ? Math.max(...allEmployeesIds) : 0;
    const nextEmployeeId = `${companyName}${(maxEmployeeId + 1).toString().padStart(3, '0')}`;
  
    setOpenAddUser(true);
    setSelectedUser({ employeeId: nextEmployeeId });
  };
  
  {/*

  */}
  
  const handleCloseAddUser = () => {
    setOpenAddUser(false);
  };

  const handleViewUser = (user) => {
    setViewUser(user);
    setViewDialogOpen(true);
  };

  const handleViewDialogClose = () => {
    setViewDialogOpen(false);
    setViewUser(null);
  };

  const handleEdit = (user) => {
    setSelectedUser(user);
    setEditDialogOpen(true);
  };

  const handleDelete = async (user) => {
    try {
      await axios.delete(`http://localhost:5000/api/users/${user.id}`);
      setUsers(users.filter((u) => u.id !== user.id));
      console.log('User Deleted Successfully');
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  const handleDeleteAllSelected = async () => {
    try {
      await Promise.all(selectedUsers.map((id) => axios.delete(`http://localhost:5000/api/users/${id}`)));
      setUsers(users.filter((user) => !selectedUsers.includes(user.id)));
      setSelectedUsers([]);
      handleCloseDeleteUser();
      console.log('Selected Users Deleted Successfully');
    } catch (error) {
      console.error('Error deleting selected users:', error);
    }
  };

  const filteredUsers = users.filter((user) =>
    user.firstName.toLowerCase().includes(searchValue.toLowerCase()) ||
    user.lastName.toLowerCase().includes(searchValue.toLowerCase()) ||
    user.companyName.toLowerCase().includes(searchValue.toLowerCase()) ||
    user.designation.toLowerCase().includes(searchValue.toLowerCase()) ||
    user.email.toLowerCase().includes(searchValue.toLowerCase()) 
  );

  const handleEditDialogClose = () => {
    setEditDialogOpen(false);
    setSelectedUser(null);
  };

  const handleSelectUser = (id) => {
    setSelectedUsers((prevSelected) =>
      prevSelected.includes(id) ? prevSelected.filter((userId) => userId !== id) : [...prevSelected, id]
    );
  };

  const handleSelectAll = (event) => {
    if (event.target.checked) {
      setSelectedUsers(users.map((user) => user.id));
    } else {
      setSelectedUsers([]);
    }
  };

  // const handleChangePage = (event, newPage) => {
  //   setPage(newPage);
  // };

  // const handleChangeRowsPerPage = (event) => {
  //   setRowsPerPage(parseInt(event.target.value, 10));
  //   setPage(0);
  // };

  const userRole = localStorage.getItem('userRole');

  return (
    <Box sx={{ padding: '16px', backgroundColor: '#e5e5e5' }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Typography variant="h5" sx={{ fontWeight: 'bold' }}>Employees List</Typography>
        <TextField
          label="Search"
          variant="standard"
          size="small"
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
        />
        <Box>
          {userRole === 'Manager' && selectedUsers.length > 0 && (
            <Button
              variant="contained"
              color="error"
              onClick={handleClickOpenDeleteUser}
              sx={{ mr: 2 }}
            >
              Delete Selected ({selectedUsers.length})
            </Button>
          )}
          
          <DeleteDialog
            open={openDeleteUser}
            onClose={handleCloseDeleteUser}
            onDeleteAll={handleDeleteAllSelected}
          />
          {userRole === 'Manager' && (
            <Button variant="contained" onClick={handleClickOpenAddUser}>Add Employee</Button>
          )}
          
        </Box>
        {/* <AddEmployeeDialog open={openAddUser} onClose={handleCloseAddUser} onSave={fetchUsers}  /> */}
        <AddEmployeeDialog open={openAddUser} onClose={handleCloseAddUser} onSave={fetchUsers} employeeId={selectedUser?.employeeId} />
        
      </Box>

      <TableContainer component={Paper} sx={{
        maxHeight: '450px',
        overflowY: 'auto',  
      }}>
        <Table aria-label="users table">
          <TableHead sx={{ backgroundColor: '#a30f44' }}>
            <TableRow>
              {userRole === 'Manager' && (
                <TableCell align="center">
                  <Checkbox
                    indeterminate={selectedUsers.length > 0 && selectedUsers.length < users.length}
                    checked={selectedUsers.length === users.length && users.length > 0}
                    onChange={handleSelectAll}
                  />
                </TableCell>
              )}
              {/*
                
              */}
              <TableCell align='center' sx={{ fontWeight: 'bold', fontSize: '15px', color: 'white' }}>Photo</TableCell>
              <TableCell align='center' sx={{ fontWeight: 'bold', fontSize: '15px', color: 'white' }}>Employee ID</TableCell>
              <TableCell align='left' sx={{ fontWeight: 'bold', fontSize: '15px', color: 'white' }}>Name</TableCell>
              <TableCell align='left' sx={{ fontWeight: 'bold', fontSize: '15px', color: 'white' }}>Designation</TableCell>
              <TableCell align='left' sx={{ fontWeight: 'bold', fontSize: '15px', color: 'white' }}>Email</TableCell>
              <TableCell></TableCell>
              {userRole === 'Manager' && (
                <TableCell align="center" sx={{ fontWeight: 'bold', fontSize: '15px', color: 'white' }}>Actions</TableCell>
              )}
              {/*
                
              */}
            </TableRow> 
          </TableHead>
          <TableBody>
              
            {/* {filteredUsers.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((user) => ( */}
            {filteredUsers.map((user)=>(
              <TableRow key={user.id} selected={selectedUsers.includes(user.id)}>
                {userRole === 'Manager' && (
                  <TableCell align="center">
                    <Checkbox
                      checked={selectedUsers.includes(user.id)}
                      onChange={() => handleSelectUser(user.id)}
                    />
                  </TableCell>
                )}
                <TableCell align='center'>
                  <img src={user.photo} alt="User" width="40" height="40" style={{ borderRadius: '50%' }} />
                </TableCell>
                <TableCell align='center'>{user.employeeId}</TableCell>
                <TableCell align='left'>{user.lastName} {user.firstName}</TableCell>
                <TableCell align='left'>{user.designation}</TableCell>
                <TableCell align='left'>{user.email}</TableCell>
                
                {userRole ==='Manager' &&(
                <TableCell align='left'>
                  <IconButton onClick={() => handleViewUser(user)}>
                    <MoreVertIcon/>
                  </IconButton>
                </TableCell>)}
                
                {userRole === 'Manager' && (
                  <TableCell align="center">
                    <Button
                      variant="outlined"
                      color="primary"
                      onClick={() => handleEdit(user)}
                      sx={{ mr: 2 }}
                    >
                      Update
                    </Button>
                    <Button
                      variant="outlined"
                      color="error"
                      onClick={() => handleDelete(user)}
                    >
                      Delete
                    </Button>
                  </TableCell>
                )}
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <ViewEmployeeDialog
          open={viewDialogOpen}
          onClose={handleViewDialogClose}
          user={viewUser}
        />
      </TableContainer>

      {/* <TablePagination
        component="div"
        rowsPerPageOptions={[5, 10, 25]}
        count={filteredUsers.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      /> */}

      <EditEmployeeDialog
        open={editDialogOpen}
        onClose={handleEditDialogClose}
        user={selectedUser}
        onSave={fetchUsers}
      />
    </Box>
  );
};

export default EmployeesList;

