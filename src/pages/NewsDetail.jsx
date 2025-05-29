import React from 'react';
import { 
  Container, 
  Box, 
  Typography, 
  Paper,
  Button,
  Divider
} from '@mui/material';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { format } from 'date-fns';

const urduTextStyles = {
  fontFamily: "'Jameel Noori Nastaleeq', 'Noto Nastaliq Urdu', serif",
  lineHeight: "2",
  textAlign: "right",
  direction: "rtl",
};

const NewsDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [newsItem, setNewsItem] = React.useState(null);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/news/${id}`);
        setNewsItem(response.data);
      } catch (error) {
        console.error('Error fetching news:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, [id]);

  if (loading) {
    return (
      <Container maxWidth="md" sx={{ py: 4 }}>
        <Box sx={{ height: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Box sx={{ 
            width: 100,
            height: 100,
            borderRadius: '50%',
            backgroundColor: '#e0e0e0',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            animation: 'pulse 1.5s ease-in-out infinite',
            '@keyframes pulse': {
              '0%': { opacity: 0.6 },
              '50%': { opacity: 0.3 },
              '100%': { opacity: 0.6 },
            }
          }} />
        </Box>
      </Container>
    );
  }

  if (!newsItem) {
    return (
      <Container maxWidth="md" sx={{ py: 4 }}>
        <Typography variant="h5">News not found</Typography>
        <Button variant="contained" sx={{ mt: 2 }} onClick={() => navigate('/')}>
          Back to Home
        </Button>
      </Container>
    );
  }

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Paper elevation={3} sx={{ p: 3 }}>
        {/* Clickable Image (full width) */}
        <Box 
          sx={{ 
            width: '100%',
            height: { xs: '300px', md: '500px' },
            mb: 4,
            overflow: 'hidden',
            borderRadius: 2,
            backgroundColor: '#f5f5f5'
          }}
        >
          {newsItem.image ? (
            <img
              src={newsItem.image}
              alt={newsItem.title}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover'
              }}
            />
          ) : (
            <Box sx={{
              width: '100%',
              height: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: '#e0e0e0'
            }}>
              <Typography variant="h6">No Image Available</Typography>
            </Box>
          )}
        </Box>

        {/* News Title */}
        <Typography variant="h3" component="h1" gutterBottom sx={urduTextStyles}>
          {newsItem.title}
        </Typography>

        {/* Published Date */}
        <Typography variant="subtitle1" color="text.secondary" gutterBottom>
          Published on: {format(new Date(newsItem.createdAt), 'MMMM dd, yyyy - hh:mm a')}
        </Typography>

        <Divider sx={{ my: 3 }} />

        {/* News Description */}
        <Typography variant="body1" sx={urduTextStyles} paragraph>
          {newsItem.description}
        </Typography>

        {/* Back Button */}
        <Box sx={{ mt: 4 }}>
          <Button 
            variant="contained" 
            color="secondary"
            onClick={() => navigate(-1)}
          >
            Back to News
          </Button>
        </Box>
      </Paper>
    </Container>
  );
};

export default NewsDetail;