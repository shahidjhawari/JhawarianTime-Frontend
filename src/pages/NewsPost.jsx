// src/pages/NewsPost.jsx
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Typography, Card, CardMedia, CardContent, Button } from '@mui/material';
import axios from 'axios';

const NewsPost = () => {
  const { id } = useParams();
  const [news, setNews] = useState(null);

  useEffect(() => {
    axios.get(`http://localhost:5000/api/news/${id}`)
      .then(res => setNews(res.data))
      .catch(err => console.log(err));
  }, [id]);

  if (!news) return <Typography>Loading...</Typography>;

  return (
    <Container sx={{ py: 4 }}>
      <Card sx={{ maxWidth: 800, mx: 'auto', bgcolor: 'background.paper', opacity: 0.95 }}>
        <CardMedia
          component="img"
          height="400"
          image={news.image}
          alt={news.title}
        />
        <CardContent>
          <Typography variant="h4" gutterBottom>{news.title}</Typography>
          <Typography variant="body1" paragraph>{news.description}</Typography>
          <Button 
            variant="contained" 
            color="primary" 
            href="/"
            sx={{ mt: 2 }}
          >
            Back to Home
          </Button>
        </CardContent>
      </Card>
    </Container>
  );
};

export default NewsPost;