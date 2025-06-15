import React, { useState } from "react"; 
import { Container } from "@mui/material";
 import SearchFilter from "../components/SearchFilter"; 
 import OffersList from "../components/OffersList"; 
 import ReviewsSection from "../components/ReviewSection";
 import "../assets/styles/offers-style.css"
import OffersHeader from "../components/OffersHeader";
import PriceFilter from "../components/PriceFilter";
const OffersPage = () => { 
  const [filters, setFilters] = useState({ searchTerm: "" });
    const [maxPrice, setMaxPrice] = useState(1000);

return ( 
  <>
<OffersHeader/>
<Container> 

<SearchFilter setFilters={setFilters} /> 
<PriceFilter setMaxPrice={setMaxPrice} />
<div className="line">
  The available <span>offers</span>
</div>
<OffersList filters={filters} />
 <ReviewsSection /> 
 </Container> 
 </>);
  };
export default OffersPage
