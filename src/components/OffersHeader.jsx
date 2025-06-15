import { Typography, Box } from "@mui/material";
import { orange } from "@mui/material/colors";

const OffersHeader = () => {
  return (
  <div className="offerHeader">
  
    <Box textAlign="center"> 
      <Typography
        variant="h1"
        component="h1"
        sx={{
          fontWeight: 700,
          mb: 2,
          fontSize: { xs: "2.5rem", md: "3.5rem" },
        }}
      >
        Our{" "}
        <span style={{ color: "#ff6a00" }}>Offers</span>
      </Typography>

      {/* النص أسفل العنوان */}
      <Typography variant="h5" sx={{ mt: 2, color: "#eae8e7" }}>
        Our offers are truly outstanding—great prices, unbeatable deals, and top-notch quality. Don’t miss out on incredible savings today!
      </Typography>
    </Box>
    </div>
  );
};

export default OffersHeader;