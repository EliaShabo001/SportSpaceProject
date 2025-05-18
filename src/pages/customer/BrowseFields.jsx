import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Box,
  Container,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
  TextField,
  InputAdornment,
  Slider,
  FormControl,
  FormGroup,
  FormControlLabel,
  Checkbox,
  Divider,
  Chip,
  Rating,
  IconButton,
  Drawer,
  useMediaQuery,
  useTheme,
  Paper,
  CircularProgress,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import FilterListIcon from "@mui/icons-material/FilterList";
import CloseIcon from "@mui/icons-material/Close";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import StarIcon from "@mui/icons-material/Star";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import LocalParkingIcon from "@mui/icons-material/LocalParking";
import ShowerIcon from "@mui/icons-material/Shower";
import RestaurantIcon from "@mui/icons-material/Restaurant";
import WifiIcon from "@mui/icons-material/Wifi";
import { getAllFields } from "../../services/fieldsService";
import supabase from "../../services/supabaseClient";

// Mock data for fields (fallback)
const mockFields = [
  {
    id: 1,
    name: "Downtown Stadium",
    image: "https://source.unsplash.com/random/600x400/?football,stadium",
    location: "Central City",
    rating: 4.8,
    price: 50,
    type: "Indoor",
    capacity: "5v5",
    amenities: ["Parking", "Showers", "Cafeteria"],
    distance: 1.2,
  },
  {
    id: 2,
    name: "Riverside Field",
    image: "https://source.unsplash.com/random/600x400/?soccer,field",
    location: "Riverside District",
    rating: 4.6,
    price: 45,
    type: "Outdoor",
    capacity: "11v11",
    amenities: ["Parking", "Showers", "WiFi"],
    distance: 2.5,
  },
  // Add more mock fields as needed
];

const BrowseFields = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [priceRange, setPriceRange] = useState([0, 100]);
  const [selectedTypes, setSelectedTypes] = useState([]);
  const [selectedCapacities, setSelectedCapacities] = useState([]);
  const [selectedAmenities, setSelectedAmenities] = useState([]);
  const [sortBy, setSortBy] = useState("recommended");

  // State for fields data
  const [fields, setFields] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch fields from Supabase
  useEffect(() => {
    const fetchFields = async () => {
      try {
        setLoading(true);
        console.log("Fetching fields from Supabase...");

        // First, check if the Field table exists
        const { data: tableData, error: tableError } = await supabase
          .from("information_schema.tables")
          .select("table_name")
          .eq("table_schema", "public")
          .eq("table_name", "Field");

        console.log("Table check result:", tableData, tableError);

        if (tableError) {
          console.error("Error checking for Field table:", tableError);
          throw new Error("Database error: " + tableError.message);
        }

        if (!tableData || tableData.length === 0) {
          console.error("Field table does not exist");
          throw new Error(
            "Database not set up. Please visit /dashboard/setup-database to set up the database."
          );
        }

        // Now try to get the fields
        const { data: fieldsData, error: fieldsError } = await supabase.from(
          "Field"
        ).select(`
            *,
            Owner (Name, Email, Phone_Number)
          `);

        console.log("Fields query result:", fieldsData, fieldsError);

        if (fieldsError) {
          console.error("Error fetching fields:", fieldsError);
          throw new Error("Failed to fetch fields: " + fieldsError.message);
        }

        if (!fieldsData || fieldsData.length === 0) {
          console.log("No fields found in database");
          setFields(mockFields);
          return;
        }

        // Transform data to match our expected format
        const transformedFields = fieldsData.map((field) => ({
          id: field.Field_ID,
          name: field.Field_Name,
          image: `https://source.unsplash.com/random/600x400/?football,field,${field.Field_ID}`,
          location: field.Location,
          rating: 4.5, // Default rating until we implement reviews
          price: 50, // Default price until we implement pricing
          type: field.Field_Type,
          capacity:
            field.Capacity <= 10
              ? "5v5"
              : field.Capacity <= 14
              ? "7v7"
              : "11v11",
          amenities: ["Parking", "Showers"], // Default amenities
          distance: 2.5, // Mock distance until we implement geolocation
          owner: field.Owner ? field.Owner.Name : "Unknown Owner",
        }));

        console.log("Transformed fields:", transformedFields);
        setFields(transformedFields);
      } catch (err) {
        console.error("Error fetching fields:", err);
        setError(
          err.message || "Failed to load fields. Please try again later."
        );
        // Fall back to mock data in case of error
        setFields(mockFields);
      } finally {
        setLoading(false);
      }
    };

    fetchFields();
  }, []);

  // Filter types
  const fieldTypes = ["Indoor", "Outdoor"];
  const capacityTypes = ["5v5", "7v7", "11v11"];
  const amenityTypes = ["Parking", "Showers", "Cafeteria", "WiFi"];

  // Handle filter changes
  const handleTypeChange = (type) => {
    if (selectedTypes.includes(type)) {
      setSelectedTypes(selectedTypes.filter((item) => item !== type));
    } else {
      setSelectedTypes([...selectedTypes, type]);
    }
  };

  const handleCapacityChange = (capacity) => {
    if (selectedCapacities.includes(capacity)) {
      setSelectedCapacities(
        selectedCapacities.filter((item) => item !== capacity)
      );
    } else {
      setSelectedCapacities([...selectedCapacities, capacity]);
    }
  };

  const handleAmenityChange = (amenity) => {
    if (selectedAmenities.includes(amenity)) {
      setSelectedAmenities(
        selectedAmenities.filter((item) => item !== amenity)
      );
    } else {
      setSelectedAmenities([...selectedAmenities, amenity]);
    }
  };

  // Filter fields based on criteria
  const filteredFields = fields.filter((field) => {
    // Search query filter
    if (
      searchQuery &&
      !field.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
      !field.location.toLowerCase().includes(searchQuery.toLowerCase())
    ) {
      return false;
    }

    // Price range filter
    if (field.price < priceRange[0] || field.price > priceRange[1]) {
      return false;
    }

    // Type filter
    if (selectedTypes.length > 0 && !selectedTypes.includes(field.type)) {
      return false;
    }

    // Capacity filter
    if (
      selectedCapacities.length > 0 &&
      !selectedCapacities.includes(field.capacity)
    ) {
      return false;
    }

    // Amenities filter
    if (selectedAmenities.length > 0) {
      for (const amenity of selectedAmenities) {
        if (!field.amenities.includes(amenity)) {
          return false;
        }
      }
    }

    return true;
  });

  // Sort fields
  const sortedFields = [...filteredFields].sort((a, b) => {
    switch (sortBy) {
      case "price-low":
        return a.price - b.price;
      case "price-high":
        return b.price - a.price;
      case "rating":
        return b.rating - a.rating;
      case "distance":
        return a.distance - b.distance;
      case "recommended":
      default:
        return b.rating - a.rating; // Default sort by rating
    }
  });

  // Get amenity icon
  const getAmenityIcon = (amenity) => {
    switch (amenity) {
      case "Parking":
        return <LocalParkingIcon fontSize="small" />;
      case "Showers":
        return <ShowerIcon fontSize="small" />;
      case "Cafeteria":
        return <RestaurantIcon fontSize="small" />;
      case "WiFi":
        return <WifiIcon fontSize="small" />;
      default:
        return null;
    }
  };

  // Reset all filters
  const resetFilters = () => {
    setSearchQuery("");
    setPriceRange([0, 100]);
    setSelectedTypes([]);
    setSelectedCapacities([]);
    setSelectedAmenities([]);
    setSortBy("recommended");
  };

  // Filter sidebar content
  const filterContent = (
    <Box sx={{ p: isMobile ? 3 : 0 }}>
      {isMobile && (
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 2,
          }}
        >
          <Typography variant="h6" fontWeight={600}>
            Filters
          </Typography>
          <IconButton onClick={() => setMobileFiltersOpen(false)}>
            <CloseIcon />
          </IconButton>
        </Box>
      )}

      <Box sx={{ mb: 4 }}>
        <Typography variant="subtitle1" fontWeight={600} gutterBottom>
          Price Range (per hour)
        </Typography>
        <Slider
          value={priceRange}
          onChange={(e, newValue) => setPriceRange(newValue)}
          valueLabelDisplay="auto"
          min={0}
          max={100}
          sx={{ color: "primary.main" }}
        />
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Typography variant="body2" color="text.secondary">
            ${priceRange[0]}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            ${priceRange[1]}
          </Typography>
        </Box>
      </Box>

      <Divider sx={{ my: 3 }} />

      <Box sx={{ mb: 4 }}>
        <Typography variant="subtitle1" fontWeight={600} gutterBottom>
          Field Type
        </Typography>
        <FormGroup>
          {fieldTypes.map((type) => (
            <FormControlLabel
              key={type}
              control={
                <Checkbox
                  checked={selectedTypes.includes(type)}
                  onChange={() => handleTypeChange(type)}
                  color="primary"
                />
              }
              label={type}
            />
          ))}
        </FormGroup>
      </Box>

      <Divider sx={{ my: 3 }} />

      <Box sx={{ mb: 4 }}>
        <Typography variant="subtitle1" fontWeight={600} gutterBottom>
          Capacity
        </Typography>
        <FormGroup>
          {capacityTypes.map((capacity) => (
            <FormControlLabel
              key={capacity}
              control={
                <Checkbox
                  checked={selectedCapacities.includes(capacity)}
                  onChange={() => handleCapacityChange(capacity)}
                  color="primary"
                />
              }
              label={capacity}
            />
          ))}
        </FormGroup>
      </Box>

      <Divider sx={{ my: 3 }} />

      <Box sx={{ mb: 4 }}>
        <Typography variant="subtitle1" fontWeight={600} gutterBottom>
          Amenities
        </Typography>
        <FormGroup>
          {amenityTypes.map((amenity) => (
            <FormControlLabel
              key={amenity}
              control={
                <Checkbox
                  checked={selectedAmenities.includes(amenity)}
                  onChange={() => handleAmenityChange(amenity)}
                  color="primary"
                />
              }
              label={
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  {getAmenityIcon(amenity)}
                  <Typography sx={{ ml: 1 }}>{amenity}</Typography>
                </Box>
              }
            />
          ))}
        </FormGroup>
      </Box>

      <Button
        variant="outlined"
        color="primary"
        fullWidth
        onClick={resetFilters}
        sx={{ mt: 2 }}
      >
        Reset Filters
      </Button>
    </Box>
  );
  return (
    <Box
      sx={{ pt: 8, pb: 6, bgcolor: "background.default", minHeight: "100vh" }}
    >
      <Container maxWidth="xl">
        <Box sx={{ mb: 4, mt: 4 }}>
          <Typography variant="h4" component="h1" fontWeight={700} gutterBottom>
            Browse Football Fields
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Find and book the perfect field for your game
          </Typography>
        </Box>

        <Grid container spacing={4}>
          {/* Filter Sidebar - Desktop */}
          <Grid
            item
            xs={12}
            md={3}
            lg={2.5}
            sx={{ display: { xs: "none", md: "block" } }}
          >
            <Paper
              elevation={1}
              sx={{
                p: 3,
                borderRadius: 2,
                position: "sticky",
                top: 100,
              }}
            >
              {filterContent}
            </Paper>
          </Grid>

          {/* Main Content */}
          <Grid item xs={12} md={9} lg={9.5}>
            {/* Loading State */}
            {loading && (
              <Box sx={{ display: "flex", justifyContent: "center", my: 8 }}>
                <CircularProgress />
              </Box>
            )}

            {/* Error State */}
            {error && !loading && (
              <Box sx={{ textAlign: "center", my: 8 }}>
                <Typography variant="h6" color="error" gutterBottom>
                  {error}
                </Typography>
                <Button
                  variant="contained"
                  color="primary"
                  sx={{ mt: 2 }}
                  onClick={() => window.location.reload()}
                >
                  Try Again
                </Button>
              </Box>
            )}

            {/* Search and Sort Bar */}
            {!loading && !error && (
              <>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: { xs: "column", sm: "row" },
                    justifyContent: "space-between",
                    alignItems: { xs: "flex-start", sm: "center" },
                    mb: 3,
                    gap: 2,
                  }}
                >
                  <TextField
                    placeholder="Search by name or location"
                    variant="outlined"
                    fullWidth
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    sx={{ maxWidth: { sm: "400px" } }}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <SearchIcon />
                        </InputAdornment>
                      ),
                    }}
                  />
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: 2,
                    }}
                  >
                    <Button
                      variant="outlined"
                      color="primary"
                      startIcon={<FilterListIcon />}
                      onClick={() => setMobileFiltersOpen(true)}
                      sx={{ display: { md: "none" } }}
                    >
                      Filters
                    </Button>
                    <FormControl variant="outlined" size="small">
                      <TextField
                        select
                        label="Sort by"
                        value={sortBy}
                        onChange={(e) => setSortBy(e.target.value)}
                        SelectProps={{
                          native: true,
                        }}
                        variant="outlined"
                        size="small"
                      >
                        <option value="recommended">Recommended</option>
                        <option value="price-low">Price: Low to High</option>
                        <option value="price-high">Price: High to Low</option>
                        <option value="rating">Highest Rated</option>
                        <option value="distance">Nearest</option>
                      </TextField>
                    </FormControl>
                  </Box>
                </Box>

                {/* Active Filters */}
                {(selectedTypes.length > 0 ||
                  selectedCapacities.length > 0 ||
                  selectedAmenities.length > 0 ||
                  priceRange[0] > 0 ||
                  priceRange[1] < 100) && (
                  <Box
                    sx={{ display: "flex", flexWrap: "wrap", gap: 1, mb: 3 }}
                  >
                    <Typography
                      variant="body2"
                      sx={{ mr: 1, display: "flex", alignItems: "center" }}
                    >
                      Active Filters:
                    </Typography>

                    {priceRange[0] > 0 || priceRange[1] < 100 ? (
                      <Chip
                        label={`$${priceRange[0]} - $${priceRange[1]}`}
                        onDelete={() => setPriceRange([0, 100])}
                        size="small"
                      />
                    ) : null}

                    {selectedTypes.map((type) => (
                      <Chip
                        key={type}
                        label={type}
                        onDelete={() => handleTypeChange(type)}
                        size="small"
                      />
                    ))}

                    {selectedCapacities.map((capacity) => (
                      <Chip
                        key={capacity}
                        label={capacity}
                        onDelete={() => handleCapacityChange(capacity)}
                        size="small"
                      />
                    ))}

                    {selectedAmenities.map((amenity) => (
                      <Chip
                        key={amenity}
                        label={amenity}
                        onDelete={() => handleAmenityChange(amenity)}
                        size="small"
                      />
                    ))}

                    <Chip
                      label="Clear All"
                      onClick={resetFilters}
                      size="small"
                      color="primary"
                      variant="outlined"
                    />
                  </Box>
                )}

                {/* Results Count */}
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ mb: 3 }}
                >
                  Showing {sortedFields.length}{" "}
                  {sortedFields.length === 1 ? "field" : "fields"}
                </Typography>

                {/* Fields Grid */}
                {sortedFields.length > 0 ? (
                  <Grid container spacing={3}>
                    {sortedFields.map((field) => (
                      <Grid item xs={12} sm={6} md={6} lg={4} key={field.id}>
                        <Card
                          sx={{
                            height: "100%",
                            display: "flex",
                            flexDirection: "column",
                            borderRadius: 3,
                            overflow: "hidden",
                            transition:
                              "transform 0.3s ease, box-shadow 0.3s ease",
                            "&:hover": {
                              transform: "translateY(-10px)",
                              boxShadow: "0 10px 30px rgba(0, 0, 0, 0.15)",
                            },
                          }}
                        >
                          <CardMedia
                            component="img"
                            height="200"
                            image={field.image}
                            alt={field.name}
                          />
                          <CardContent sx={{ flexGrow: 1 }}>
                            <Box
                              sx={{
                                display: "flex",
                                justifyContent: "space-between",
                                alignItems: "flex-start",
                              }}
                            >
                              <Typography
                                gutterBottom
                                variant="h5"
                                component="h2"
                                sx={{ fontWeight: 600 }}
                              >
                                {field.name}
                              </Typography>
                              <Chip
                                label={field.type}
                                size="small"
                                sx={{
                                  bgcolor:
                                    field.type === "Indoor"
                                      ? "rgba(255, 106, 0, 0.1)"
                                      : "rgba(0, 128, 0, 0.1)",
                                  color:
                                    field.type === "Indoor"
                                      ? "primary.main"
                                      : "success.main",
                                  fontWeight: 500,
                                }}
                              />
                            </Box>

                            <Box
                              sx={{
                                display: "flex",
                                alignItems: "center",
                                mb: 1,
                              }}
                            >
                              <LocationOnIcon
                                sx={{
                                  color: "text.secondary",
                                  mr: 0.5,
                                  fontSize: 20,
                                }}
                              />
                              <Typography
                                variant="body2"
                                color="text.secondary"
                              >
                                {field.location} ({field.distance} miles away)
                              </Typography>
                            </Box>

                            <Box
                              sx={{
                                display: "flex",
                                alignItems: "center",
                                mb: 1,
                              }}
                            >
                              <AccessTimeIcon
                                sx={{
                                  color: "text.secondary",
                                  mr: 0.5,
                                  fontSize: 20,
                                }}
                              />
                              <Typography
                                variant="body2"
                                color="text.secondary"
                              >
                                Available today
                              </Typography>
                            </Box>

                            <Box
                              sx={{
                                display: "flex",
                                alignItems: "center",
                                mb: 2,
                              }}
                            >
                              <Rating
                                value={field.rating}
                                precision={0.1}
                                readOnly
                                size="small"
                                sx={{ mr: 1 }}
                              />
                              <Typography
                                variant="body2"
                                sx={{ fontWeight: 500 }}
                              >
                                {field.rating}
                              </Typography>
                            </Box>

                            <Box
                              sx={{
                                display: "flex",
                                gap: 1,
                                mb: 2,
                                flexWrap: "wrap",
                              }}
                            >
                              {field.amenities.map((amenity) => (
                                <Chip
                                  key={amenity}
                                  icon={getAmenityIcon(amenity)}
                                  label={amenity}
                                  size="small"
                                  variant="outlined"
                                  sx={{ borderRadius: 1 }}
                                />
                              ))}
                            </Box>

                            <Typography
                              variant="h6"
                              color="primary.main"
                              sx={{ fontWeight: 600, mb: 2 }}
                            >
                              ${field.price}/hour
                            </Typography>
                            <Box
                              sx={{
                                display: "flex",
                                justifyContent: "space-between",
                                gap: 1,
                              }}
                            >
                              <Button
                                component={Link}
                                to={`/fields/${field.id}`}
                                variant="outlined"
                                color="primary"
                                fullWidth
                              >
                                Details
                              </Button>
                              <Button
                                component={Link}
                                to={`/fields/${field.id}/booking`}
                                variant="contained"
                                color="primary"
                                fullWidth
                              >
                                Book Now
                              </Button>
                            </Box>
                          </CardContent>
                        </Card>
                      </Grid>
                    ))}
                  </Grid>
                ) : (
                  <Box sx={{ textAlign: "center", py: 8 }}>
                    <Typography variant="h5" gutterBottom>
                      No fields match your criteria
                    </Typography>
                    <Typography
                      variant="body1"
                      color="text.secondary"
                      sx={{ mb: 3 }}
                    >
                      Try adjusting your filters or search query
                    </Typography>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={resetFilters}
                    >
                      Reset Filters
                    </Button>
                  </Box>
                )}
              </>
            )}
          </Grid>
        </Grid>
      </Container>

      {/* Mobile Filters Drawer */}
      <Drawer
        anchor="left"
        open={mobileFiltersOpen}
        onClose={() => setMobileFiltersOpen(false)}
        sx={{
          "& .MuiDrawer-paper": {
            width: "85%",
            maxWidth: "350px",
            boxSizing: "border-box",
          },
        }}
      >
        {filterContent}
      </Drawer>
    </Box>
  );
};

export default BrowseFields;
