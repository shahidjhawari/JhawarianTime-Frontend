import React, { useEffect, useState } from 'react';
import { Container, Grid, Card, CardMedia, CardContent, Typography, Button } from '@mui/material';
import axios from 'axios';

const Home = () => {
  const [news, setNews] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/news')
      .then(res => setNews(res.data))
      .catch(err => console.log(err));
  }, []);

  return (
    <Container sx={{ py: 4 }}>
      <Grid container spacing={4}>
        {news.map((item) => (
          <Grid item key={item._id} xs={12} sm={6} md={4}>
            <Card sx={{ bgcolor: 'background.paper', opacity: 0.95 }}>
              <CardMedia
                component="img"
                height="200"
                image={item.image}
                alt={item.title}
              />
              <CardContent>
                <Typography variant="h6">{item.title}</Typography>
                <Typography variant="body2" color="text.secondary">
                  {item.description}
                </Typography>
                <Button 
                  variant="contained" 
                  color="secondary" 
                  sx={{ mt: 2 }}
                  href={`/news/${item._id}`}
                >
                  Read More
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default Home;