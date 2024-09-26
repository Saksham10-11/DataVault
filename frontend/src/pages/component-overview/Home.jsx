import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardMedia, IconButton, Typography, Grid, Pagination, Box } from '@mui/material';
import { AccessTime, AccountCircle } from '@mui/icons-material';
import thumbnail from 'assets/images/FromThumbNail.jpg';

const FormCard = ({ form }) => (
  <Card sx={{ mb: 4, borderRadius: '16px', boxShadow: 4 }}>
    <Grid container>
      <Grid item xs={12} md={5}>
        <CardMedia
          component="img"
          height="200"
          image={thumbnail} // Use default image if no custom thumbnail
          alt="Form Thumbnail"
          sx={{ borderRadius: '16px 0 0 16px' }}
        />
      </Grid>
      <Grid item xs={12} md={7}>
        <CardContent>
          <Box display="flex" justifyContent="space-between">
            <Typography variant="h4" fontWeight="bold">
              {form.title}
            </Typography>
            <IconButton>{/* Icon could be used for editing or actions */}</IconButton>
          </Box>
          <Typography variant="body1" sx={{ mt: 2 }}>
            {form.description || 'No description provided'}
          </Typography>
          <Box display="flex" alignItems="center" sx={{ mt: 2 }}>
            <Typography variant="subtitle1" color="text.secondary">
              Created by: {form.createdBy}
            </Typography>
          </Box>
          <Box display="flex" alignItems="center" sx={{ mt: 1 }}>
            <AccessTime sx={{ mr: 1, color: '#0073e6' }} /> {/* Light blue icon */}
            <Typography variant="subtitle1" color="text.secondary">
              {new Date(form.createdAt).toLocaleString()}
            </Typography>
          </Box>
        </CardContent>
      </Grid>
    </Grid>
  </Card>
);

const FormList = () => {
  // Example usage of FormList component
  const [forms, setForms] = useState([]); // State to hold form data

  useEffect(() => {
    const fetchForms = async () => {
      try {
        const response = await fetch('/api/forms/all'); // Replace with your backend API endpoint
        const data = await response.json();
        setForms(data); // Set the fetched data to state
      } catch (error) {
        console.error('Error fetching forms:', error);
      }
    };

    fetchForms();
  }, []);
  const [page, setPage] = useState(1);
  const formsPerPage = 12;

  const handleChange = (event, value) => {
    setPage(value);
  };

  // Pagination logic
  const paginatedForms = forms.slice((page - 1) * formsPerPage, page * formsPerPage);
  const pageCount = Math.ceil(forms.length / formsPerPage);

  return (
    <Box>
      <Grid container spacing={2}>
        {paginatedForms.map((form) => (
          <Grid item xs={12} sm={6} md={4} key={form.id}>
            <FormCard form={form} />
          </Grid>
        ))}
      </Grid>
      <Box mt={4} display="flex" justifyContent="center">
        <Pagination count={pageCount} page={page} onChange={handleChange} color="primary" shape="rounded" />
      </Box>
    </Box>
  );
};

const Home = () => {
  return <FormList />;
};

export default Home;
