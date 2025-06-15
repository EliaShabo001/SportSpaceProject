import React, { useEffect } from "react";
import { Container, Grid } from "@mui/material";
import OfferCard from "./OfferCard";
import axios from "axios"
const offers = [
  { id: 1, title: "VIP Football Pitch", location: "Berlin", date: "2025-06-10", price: "$50 per hour", image: "https://source.unsplash.com/400x300/?soccer-field" },
  { id: 2, title: "Weekend Tournament", location: "Munich", date: "2025-06-15", price: "$40 per hour", image: "https://source.unsplash.com/400x300/?football" }
];
const OffersList = ({ filters }) => {
  const filteredOffers = offers.filter(offer =>
    (filters.searchTerm ? offer.title.toLowerCase().includes(filters.searchTerm.toLowerCase()) : true)
  );
  async function getData(){
    try{
    const data= await fetch("http://localhost:5004/Offers/GetAllOffer")
    const res= await data.json();
    console.log(res);
    }catch(err){
      console.log(err)
    }
   }
 
  return (

    <Container>
      <Grid container spacing={3}>
        {filteredOffers.map((offer) => (
          <Grid item xs={12} sm={6} md={4} key={offer.id}>
            <OfferCard offer={offer} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default OffersList;