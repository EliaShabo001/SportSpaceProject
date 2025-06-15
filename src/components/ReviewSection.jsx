import React from "react";
import { Container, Typography, Card, CardContent, Grid } from "@mui/material";

const reviews = [
  { id: 1, name: "Lionel Messi", feedback: "The fields are amazing, great service!", rating: "⭐⭐⭐⭐⭐" },
  { id: 2, name: "Cristiano Ronaldo", feedback: "Loved the VIP package, fantastic experience!", rating: "⭐⭐⭐⭐" }
];

const ReviewsSection = () => {
  return (
    <Container>
      <Typography variant="h5">Customer Reviews 🗣️</Typography>
      <Grid container spacing={3}>
        {reviews.map((review) => (
          <Grid item xs={12} sm={6} md={4} key={review.id}>
            <Card className="glass-card-review">
              <CardContent>
                <Typography variant="h6">{review.name}</Typography>
                <Typography variant="body2">{review.feedback}</Typography>
                <Typography variant="body2">{review.rating}</Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default ReviewsSection;