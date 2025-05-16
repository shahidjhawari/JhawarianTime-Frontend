import React from 'react';
import { AppBar, Toolbar, Typography, Button, Container } from '@mui/material';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <AppBar position="static" sx={{ bgcolor: 'primary.main', opacity: 0.9 }}>
      <Container>
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1, color: 'secondary.main' }}>
            Jhawarian Time
          </Typography>
          <Button color="secondary" component={Link} to="/">Home</Button>
          <Button color="secondary" component={Link} to="/upload">Upload News</Button>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Navbar;