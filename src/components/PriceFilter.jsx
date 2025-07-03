import { Box, Typography, Slider } from "@mui/material";
import { useState } from "react";

const PriceFilter = ({ setMaxPrice }) => {
  const [price, setPrice] = useState(1000); // القيمة الافتراضية

  const handleChange = (event, newValue) => {
    setPrice(newValue);
    setMaxPrice(newValue); // تمرير القيمة للأب
  };

  return (
    <Box className="filterPrice"
      sx={{
        padding: 3,
        borderRadius: 2,
        color: "black",
        backgroundColor:"aliceblue",
        boxShadow: 3,
        width: "80%",
        
      }}
    >
      <Typography variant="h4" fontWeight="bold">
        Filter by Price
      </Typography>
      <Typography variant="h3" fontWeight="bold">
        ${price}
      </Typography>
      <Slider
        value={price}
        min={0}
        max={5000}
        step={50}
        onChange={handleChange}
        sx={{
          '& .MuiSlider-thumb': { backgroundColor: "f2a2a9" ,color:"f2a2a9" },
          '& .MuiSlider-track': { backgroundColor: "#FF6A00" },
        }}
      />
    </Box>
  );
};

export default PriceFilter;