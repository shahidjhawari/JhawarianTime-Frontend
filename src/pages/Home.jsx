import React, { useEffect, useState } from "react";
import {
  Container,
  Grid,
  Card,
  CardMedia,
  CardContent,
  Typography,
  Button,
  Box,
} from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/news")
      .then((res) => {
        setNews(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }, []);

  // امیج لوڈ ہونے میں ناکامی کی صورت میں پلیس ہولڈر دکھائے
  const ImageWithPlaceholder = ({ src, alt }) => {
    const [imgError, setImgError] = useState(!src);

    return (
      <Box
        sx={{
          height: 200,
          position: "relative",
          backgroundColor: "#f5f5f5",
          overflow: "hidden",
        }}
      >
        {!imgError ? (
          <CardMedia
            component="img"
            height="200"
            image={src}
            alt={alt}
            onError={() => setImgError(true)}
            sx={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              objectFit: "cover",
            }}
          />
        ) : (
          <Box
            sx={{
              width: "100%",
              height: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: "#e0e0e0",
              animation: "pulse 1.5s ease-in-out infinite",
              "@keyframes pulse": {
                "0%": { opacity: 0.6 },
                "50%": { opacity: 0.3 },
                "100%": { opacity: 0.6 },
              },
            }}
          >
            <Box
              sx={{
                width: "80px",
                height: "80px",
                borderRadius: "50%",
                backgroundColor: "#f0f0f0",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Box
                sx={{
                  width: "60px",
                  height: "60px",
                  borderRadius: "50%",
                  backgroundColor: "#f8f8f8",
                }}
              />
            </Box>
          </Box>
        )}
      </Box>
    );
  };

  return (
    <Container sx={{ py: 4 }}>
      <Grid container spacing={4}>
        {loading
          ?
            Array.from(new Array(3)).map((_, index) => (
              <Grid item key={index} xs={12} sm={6} md={4}>
                <Card sx={{ bgcolor: "background.paper", opacity: 0.95 }}>
                  <Box sx={{ height: 200, backgroundColor: "#f5f5f5" }} />
                  <CardContent>
                    <Box
                      sx={{
                        height: 24,
                        backgroundColor: "#e0e0e0",
                        mb: 2,
                        borderRadius: 1,
                      }}
                    />
                    <Box
                      sx={{
                        height: 60,
                        backgroundColor: "#e0e0e0",
                        borderRadius: 1,
                      }}
                    />
                    <Box
                      sx={{
                        height: 36,
                        backgroundColor: "#e0e0e0",
                        mt: 2,
                        borderRadius: 1,
                        width: "40%",
                      }}
                    />
                  </CardContent>
                </Card>
              </Grid>
            ))
          : news.map((item) => (
              <Grid item key={item._id} xs={12} sm={6} md={4}>
                <Card sx={{ bgcolor: "background.paper", opacity: 0.95 }}>
                  {/* یہاں ہم نے امیج کے لیے نیا کمپوننٹ استعمال کیا ہے */}
                  <ImageWithPlaceholder src={item.image} alt={item.title} />

                  <CardContent>
                    <Typography variant="h6">{item.title}</Typography>
                    <Typography variant="body2" color="text.secondary">
                      {item.description}
                    </Typography>
                    <Button
                      variant="contained"
                      color="secondary"
                      sx={{ mt: 2 }}
                      onClick={() => navigate(`/news/${item._id}`)}
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
