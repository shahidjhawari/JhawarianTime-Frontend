// src/App.jsx (updated)
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import theme from './theme.jsx';
import Home from './pages/Home.jsx';
import UploadNews from './pages/UploadNews.jsx';
import Navbar from './components/Navbar.jsx';
import NewsDetail from './pages/NewsDetail.jsx';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/upload" element={<UploadNews />} />
          <Route path="/news/:id" element={<NewsDetail />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;