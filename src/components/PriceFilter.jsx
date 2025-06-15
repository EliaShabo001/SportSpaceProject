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
        backgroundColor: "#00809D",
        padding: 3,
        borderRadius: 2,
        color: "#FCECDD",
        boxShadow: 3,
        width: "60%",
        
      }}
    >
      <Typography variant="h6" fontWeight="bold">
        Filter by Price
      </Typography>
      <Typography variant="h4" fontWeight="bold">
        ${price}
      </Typography>
      <Slider
        value={price}
        min={0}
        max={5000}
        step={50}
        onChange={handleChange}
        sx={{
          color: "white",
          '& .MuiSlider-thumb': { backgroundColor: "white" },
          '& .MuiSlider-track': { backgroundColor: "#fff" },
        }}
      />
    </Box>
  );
};

export default PriceFilter;