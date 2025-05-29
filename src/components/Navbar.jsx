import React from 'react';
import { AppBar, Toolbar, Typography, Button, Container, Box } from '@mui/material';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <>
      {/* Top Blue Bar with Logo */}
      <AppBar 
        position="static" 
        sx={{ 
          bgcolor: '#222222', // Dark blue background
          boxShadow: 'none',
          py: 1 // Padding for height
        }}
      >
        <Container maxWidth="lg">
          <Toolbar sx={{ justifyContent: 'center' }}>
            <Typography 
              variant="h4" 
              sx={{ 
                color: 'white', // Orange text color
                fontWeight: 'bold',
                fontFamily: '"Jameel Noori Nastaleeq", "Noto Nastaliq Urdu", serif' // Urdu font
              }}
            >
              Jhawarian Time
            </Typography>
          </Toolbar>
        </Container>
      </AppBar>

      {/* Thin Bottom Bar with Navigation Buttons */}
      <AppBar 
        position="static" 
        sx={{ 
          bgcolor: '#169976', // Same dark blue
          height: '40px', // Thin bar
          display: 'flex',
          justifyContent: 'center'
        }}
      >
        <Container maxWidth="lg">
          <Toolbar 
            disableGutters 
            sx={{ 
              justifyContent: 'center',
              minHeight: '40px !important'
            }}
          >
            <Box sx={{ display: 'flex', gap: 2 }}>
              <Button 
                component={Link} 
                to="/" 
                sx={{ 
                  color: 'white', // Orange text
                  '&:hover': { backgroundColor: 'rgba(249, 122, 0, 0.1)' }
                }}
              >
                Home
              </Button>
              <Button 
                component={Link} 
                to="/upload" 
                sx={{ 
                  color: 'white', // Orange text
                  '&:hover': { backgroundColor: 'rgba(249, 122, 0, 0.1)' }
                }}
              >
                Upload News
              </Button>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
    </>
  );
};

export default Navbar;