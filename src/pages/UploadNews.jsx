import React, { useState } from 'react';
import { 
  Container, 
  TextField, 
  Button, 
  Typography, 
  Box, 
  LinearProgress,
  Snackbar,
  Alert
} from '@mui/material';
import axios from 'axios';

const UploadNews = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success'
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!image) {
      setSnackbar({
        open: true,
        message: 'Please select an image',
        severity: 'error'
      });
      return;
    }

    const formData = new FormData();
    formData.append('title', title);
    formData.append('description', description);
    formData.append('image', image);

    setIsUploading(true);
    setUploadProgress(0);

    axios.post('http://localhost:5000/api/news', formData, {
      onUploadProgress: (progressEvent) => {
        const progress = Math.round(
          (progressEvent.loaded * 100) / progressEvent.total
        );
        setUploadProgress(progress);
      }
    })
    .then(res => {
      setSnackbar({
        open: true,
        message: 'News uploaded successfully!',
        severity: 'success'
      });
      // Reset form
      setTitle('');
      setDescription('');
      setImage(null);
    })
    .catch(err => {
      setSnackbar({
        open: true,
        message: 'Error uploading news: ' + err.message,
        severity: 'error'
      });
      console.error(err);
    })
    .finally(() => {
      setIsUploading(false);
      setUploadProgress(0);
    });
  };

  const handleCloseSnackbar = () => {
    setSnackbar(prev => ({ ...prev, open: false }));
  };

  return (
    <Container maxWidth="sm" sx={{ py: 4 }}>
      <Typography variant="h4" gutterBottom color="primary">
        Upload News
      </Typography>
      <Box component="form" onSubmit={handleSubmit}>
        <TextField
          fullWidth
          label="Title"
          variant="outlined"
          margin="normal"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <TextField
          fullWidth
          label="Description"
          variant="outlined"
          margin="normal"
          multiline
          rows={4}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setImage(e.target.files[0])}
          style={{ margin: '16px 0' }}
          required
        />
        
        {isUploading && (
          <Box sx={{ width: '100%', mt: 2 }}>
            <LinearProgress 
              variant="determinate" 
              value={uploadProgress} 
            />
            <Typography variant="body2" align="center" sx={{ mt: 1 }}>
              Uploading: {uploadProgress}%
            </Typography>
          </Box>
        )}

        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          sx={{ mt: 2 }}
          disabled={isUploading}
        >
          {isUploading ? 'Uploading...' : 'Upload'}
        </Button>
      </Box>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
      >
        <Alert 
          onClose={handleCloseSnackbar} 
          severity={snackbar.severity}
          sx={{ width: '100%' }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default UploadNews;