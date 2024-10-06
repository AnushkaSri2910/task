// src/components/EditUserForm.js
import React, { useState } from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material';
import axios from 'axios';

const EditUserForm = ({ open, handleClose, user, fetchUsers }) => {
  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [phone, setPhone] = useState(user.phone);
  const [addressStreet, setAddressStreet] = useState(user.address.street);
  const [addressCity, setAddressCity] = useState(user.address.city);
  const [companyName, setCompanyName] = useState(user.company.name);
  const [website, setWebsite] = useState(user.website);
  const [errors, setErrors] = useState({});

  const validate = () => {
    let isValid = true;
    const newErrors = {};

    if (!name) {
      newErrors.name = 'Name is required';
      isValid = false;
    } else if (name.length < 3) {
      newErrors.name = 'Name must be at least 3 characters';
      isValid = false;
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) {
      newErrors.email = 'Email is required';
      isValid = false;
    } else if (!emailPattern.test(email)) {
      newErrors.email = 'Email is not valid';
      isValid = false;
    }

    const phonePattern = /^\+?[1-9]\d{1,14}$/; // E.164 format
    if (!phone) {
      newErrors.phone = 'Phone is required';
      isValid = false;
    } else if (!phonePattern.test(phone)) {
      newErrors.phone = 'Phone is not valid';
      isValid = false;
    }

    if (!addressStreet) {
      newErrors.addressStreet = 'Street address is required';
      isValid = false;
    }

    if (!addressCity) {
      newErrors.addressCity = 'City is required';
      isValid = false;
    }

    if (companyName && companyName.length < 3) {
      newErrors.companyName = 'Company name must be at least 3 characters';
      isValid = false;
    }

    if (website && !/^https?:\/\/[^\s$.?#].[^\s]*$/.test(website)) {
      newErrors.website = 'Website must be a valid URL';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      await axios.put(`https://jsonplaceholder.typicode.com/users/${user.id}`, {
        name,
        email,
        phone,
        address: { street: addressStreet, city: addressCity },
        company: { name: companyName },
        website,
      });
      fetchUsers(); // Refresh user list
      handleClose();
    } catch (error) {
      alert('Error updating user: ' + error.message);
    }
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Edit User</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          label="Name"
          fullWidth
          value={name}
          onChange={(e) => setName(e.target.value)}
          error={!!errors.name}
          helperText={errors.name}
        />
        <TextField
          margin="dense"
          label="Email"
          fullWidth
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          error={!!errors.email}
          helperText={errors.email}
        />
        <TextField
          margin="dense"
          label="Phone"
          fullWidth
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          error={!!errors.phone}
          helperText={errors.phone}
        />
        <TextField
          margin="dense"
          label="Address (Street)"
          fullWidth
          value={addressStreet}
          onChange={(e) => setAddressStreet(e.target.value)}
          error={!!errors.addressStreet}
          helperText={errors.addressStreet}
        />
        <TextField
          margin="dense"
          label="Address (City)"
          fullWidth
          value={addressCity}
          onChange={(e) => setAddressCity(e.target.value)}
          error={!!errors.addressCity}
          helperText={errors.addressCity}
        />
        <TextField
          margin="dense"
          label="Company Name"
          fullWidth
          value={companyName}
          onChange={(e) => setCompanyName(e.target.value)}
          error={!!errors.companyName}
          helperText={errors.companyName}
        />
        <TextField
          margin="dense"
          label="Website"
          fullWidth
          value={website}
          onChange={(e) => setWebsite(e.target.value)}
          error={!!errors.website}
          helperText={errors.website}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">Cancel</Button>
        <Button onClick={handleSubmit} color="primary">Save</Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditUserForm;
