// src/components/UserDetail.js
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Card, CardContent, Typography } from '@mui/material';
import axios from 'axios';
import Loader from './Loader';

const UserDetail = () => {
  const { id } = useParams();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(`https://jsonplaceholder.typicode.com/users/${id}`);
        setUser(response.data);
      } catch (error) {
        alert('Error fetching user details: ' + error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [id]);

  if (loading) return <Loader />;

  return (
    <Card>
      <CardContent>
        <Typography variant="h5">{user.name}</Typography>
        <Typography>Email: {user.email}</Typography>
        <Typography>Phone: {user.phone}</Typography>
        <Typography>Address: {user.address.street}, {user.address.city}</Typography>
        <Typography>Company: {user.company.name}</Typography>
        <Typography>Website: {user.website}</Typography>
      </CardContent>
    </Card>
  );
};

export default UserDetail;
