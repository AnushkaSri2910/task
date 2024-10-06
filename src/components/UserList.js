// src/components/UserList.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TextField } from '@mui/material';
import UserForm from './UserForm';
import EditUserForm from './EditUserForm';
import { Link } from 'react-router-dom';
import Loader from './Loader';

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [editingUser, setEditingUser] = useState(null);
  const [open, setOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(false);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const response = await axios.get('https://jsonplaceholder.typicode.com/users');
      setUsers(response.data);
    } catch (error) {
      alert('Error fetching users: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      try {
        await axios.delete(`https://jsonplaceholder.typicode.com/users/${id}`);
        setUsers(users.filter(user => user.id !== id));
      } catch (error) {
        alert('Error deleting user: ' + error.message);
      }
    }
  };

  const handleEdit = (user) => {
    setEditingUser(user);
    setOpen(true);
  };

  const handleClose = () => {
    setEditingUser(null);
    setOpen(false);
  };

  // Filter users based on search term
  const filteredUsers = users.filter(user => user.name.toLowerCase().includes(searchTerm.toLowerCase()));

  return (
    <div>
      <TextField
        variant="outlined"
        label="Search Users"
        onChange={(e) => setSearchTerm(e.target.value)}
        style={{ marginBottom: '20px' }}
      />
      <Button variant="contained" color="primary" onClick={() => setOpen(true)}>Add User</Button>
      {loading ? (
        <Loader />
      ) : (
        <TableContainer component={Paper} style={{ marginTop: '20px' }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredUsers.map((user, index) => (
                <TableRow key={user.id} style={{ backgroundColor: index % 2 === 0 ? '#f5f5f5' : '#ffffff' }}>
                  <TableCell>
                    <Link to={`/users/${user.id}`}>{user.name}</Link>
                  </TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>
                    <Button onClick={() => handleEdit(user)}>Edit</Button>
                    <Button onClick={() => handleDelete(user.id)}>Delete</Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
      <UserForm open={open} handleClose={handleClose} fetchUsers={fetchUsers} />
      {editingUser && <EditUserForm open={open} handleClose={handleClose} user={editingUser} fetchUsers={fetchUsers} />}
    </div>
  );
};

export default UserList;
