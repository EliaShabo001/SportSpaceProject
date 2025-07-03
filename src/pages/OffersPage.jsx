import React, { useState } from "react";
import { Container, Box, Grid } from "@mui/material";
import { motion } from "framer-motion";
import OffersList from "../components/OffersList";
import SearchFilter from "../components/SearchFilter";
import PriceFilter from "../components/PriceFilter";
import OffersHeader from "../components/OffersHeader";
import ReviewsSection from "../components/ReviewSection";
import "../assets/styles/offers-style.css";

const OffersPage = () => {
 const [filters, setFilters] = useState({
  searchTerm: "",   // العنوان أو اسم العرض
  location: "",
  date: ""          // التاريخ بصيغة YYYY-MM-DD
});
  const [maxPrice, setMaxPrice] = useState(1000);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -30 }}
      transition={{ duration: 0.5 }}
    >
      <OffersHeader />

      <Container maxWidth="xl" sx={{ mt:4 }}>
        {/* ✅ تقسيم الصفحة إلى sidebar ومحتوى بشكل أفقي */}
        <Box sx={{ display: "flex", gap: 3 }}>
          {/* Sidebar */}
          <Box
            sx={{
              width: 480,
              backgroundColor: "#fff",
              p: 2,
              borderRadius: 2,
              boxShadow: 2,
              flexShrink: 0,
              height: "fit-content",
              position: "sticky",
              top: 100,
            }}
          >
            <SearchFilter setFilters={setFilters} />
            <Box sx={{ mt: 2 }}>
              <PriceFilter setMaxPrice={setMaxPrice} />
            </Box>
          </Box>

          {/* Main Content */}
          <Box sx={{ flexGrow: 1 }}>
            <div className="line">
              The available <span>offers</span>
            </div>
            <OffersList filters={filters} maxPrice={maxPrice} />
            <ReviewsSection />
          </Box>
        </Box>
      </Container>
    </motion.div>
  );
};

export default OffersPage;
