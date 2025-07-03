import React from "react";
import { Container, Grid } from "@mui/material";
import OfferCard from "./OfferCard";

// بيانات وهمية محلية
const offers = [
  { id: 1, title: "VIP Football Pitch", location: "Berlin", date: "2025-06-10", price: 70, image: "./istockphoto-2206836726-1024x1024.jpg" },
  { id: 2, title: "Weekend Tournament", location: "Munich", date: "2025-06-15", price: 40, image: "./istockphoto-2206836726-1024x1024.jpg" },
  { id: 3, title: "Evening Match", location: "Cologne", date: "2025-06-17", price: 30, image: "./istockphoto-2206836726-1024x1024.jpg" },
];

const OffersList = ({ filters, maxPrice }) => {
const filteredOffers = offers.filter((offer) => {
  const matchesTitle = filters.searchTerm
    ? offer.title.toLowerCase().includes(filters.searchTerm.toLowerCase())
    : true;

  const matchesLocation = filters.location
    ? offer.location.toLowerCase().includes(filters.location.toLowerCase())
    : true;

  const matchesDate = filters.date
    ? offer.date === filters.date  // أو استخدم includes لو بدك مرونة أكثر
    : true;

  const matchesPrice = maxPrice ? offer.price <= maxPrice : true;

  return matchesTitle && matchesLocation && matchesDate && matchesPrice;
});
console.log("Search:", filters.searchTerm, "Price:", maxPrice);
  return (
    <Container>
      <Grid container spacing={3}>
        {filteredOffers.length > 0 ? (
          filteredOffers.map((offer) => (
            <Grid item xs={12} sm={6} md={4} key={offer.id}>
              <OfferCard offer={offer} />
            </Grid>
          ))
        ) : (
          <p style={{ padding: "1rem" }}>😕 No matching offers found.</p>
        )}
      </Grid>
    </Container>
  );
};

export default OffersList;
