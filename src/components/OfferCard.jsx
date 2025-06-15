import React from "react";
import { Card, CardMedia, CardContent, Typography, Button } from "@mui/material";

const OfferCard = ({ offer }) => {
  return (
    <Card className="glass-card">
      <CardMedia component="img" height="200" image={offer.image} alt={offer.title} />
      <CardContent>
        <Typography className="glass-card-title" variant="h6">{offer.title}</Typography>
        <Typography variant="body2">📍 {offer.location}</Typography>
        <Typography variant="body2">💰 {offer.price}</Typography>
        <Button variant="contained" color="warning" sx={{ mt: 2 }}>Booking Now</Button>
      </CardContent>
    </Card>
  );
};

export default OfferCard;