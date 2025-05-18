import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  TextField,
  InputAdornment,
  IconButton,
  Box,
  Typography,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  Divider,
  Chip,
  Button,
  CircularProgress,
  useTheme,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import CloseIcon from "@mui/icons-material/Close";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import SportsSoccerIcon from "@mui/icons-material/SportsSoccer";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import Fuse from "fuse.js";

// Mock data for search
const searchData = {
  fields: [
    {
      id: 1,
      name: "Downtown Stadium",
      location: "Central City",
      image: "https://source.unsplash.com/random/600x400/?football,stadium",
      price: "$50/hour",
      type: "field",
    },
    {
      id: 2,
      name: "Riverside Field",
      location: "Riverside District",
      image: "https://source.unsplash.com/random/600x400/?soccer,field",
      price: "$45/hour",
      type: "field",
    },
    {
      id: 3,
      name: "Green Valley Pitch",
      location: "Green Valley",
      image: "https://source.unsplash.com/random/600x400/?football,pitch",
      price: "$55/hour",
      type: "field",
    },
    {
      id: 4,
      name: "Community Field",
      location: "Westside",
      image: "https://source.unsplash.com/random/600x400/?community,field",
      price: "$35/hour",
      type: "field",
    },
    {
      id: 5,
      name: "Elite Sports Complex",
      location: "Northside",
      image: "https://source.unsplash.com/random/600x400/?sports,complex",
      price: "$65/hour",
      type: "field",
    },
  ],
  locations: [
    { id: 1, name: "Central City", type: "location" },
    { id: 2, name: "Riverside District", type: "location" },
    { id: 3, name: "Green Valley", type: "location" },
    { id: 4, name: "Northside", type: "location" },
    { id: 5, name: "Westside", type: "location" },
  ],
  offers: [
    {
      id: 1,
      name: "Early Bird Special",
      description: "25% off morning bookings",
      type: "offer",
    },
    {
      id: 2,
      name: "Weekend Package",
      description: "Book 3 hours, pay for 2",
      type: "offer",
    },
    {
      id: 3,
      name: "Group Discount",
      description: "15% off for groups of 15+",
      type: "offer",
    },
    {
      id: 4,
      name: "Midweek Madness",
      description: "20% off Tuesday & Wednesday",
      type: "offer",
    },
  ],
  times: [
    { id: 1, name: "Morning (6AM-12PM)", type: "time" },
    { id: 2, name: "Afternoon (12PM-5PM)", type: "time" },
    { id: 3, name: "Evening (5PM-10PM)", type: "time" },
    { id: 4, name: "Late Night (10PM-12AM)", type: "time" },
  ],
};

// Initialize Fuse.js for fuzzy search
const fuseOptions = {
  includeScore: true,
  threshold: 0.4,
  keys: ["name", "location", "description"],
};

// Combine all search items
const allSearchItems = [
  ...searchData.fields,
  ...searchData.locations,
  ...searchData.offers,
  ...searchData.times,
];

// Create Fuse instance
const fuse = new Fuse(allSearchItems, fuseOptions);

const SearchDialog = ({ open, onClose }) => {
  const theme = useTheme();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [recentSearches, setRecentSearches] = useState([]);

  // Load recent searches from localStorage
  useEffect(() => {
    const savedSearches = localStorage.getItem("recentSearches");
    if (savedSearches) {
      setRecentSearches(JSON.parse(savedSearches));
    } else {
      setRecentSearches(["football field", "stadium", "indoor pitch"]);
    }
  }, []);

  // Save recent searches to localStorage
  const saveRecentSearch = (query) => {
    if (!query.trim()) return;

    const updatedSearches = [
      query,
      ...recentSearches.filter((item) => item !== query),
    ].slice(0, 5);

    setRecentSearches(updatedSearches);
    localStorage.setItem("recentSearches", JSON.stringify(updatedSearches));
  };

  // Handle search input change
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  // Perform search when search term changes
  useEffect(() => {
    if (searchTerm.trim() === "") {
      setSearchResults([]);
      return;
    }

    setIsSearching(true);

    // Use Fuse.js for fuzzy search with a small delay
    const timer = setTimeout(() => {
      const results = fuse.search(searchTerm);
      setSearchResults(results.map((result) => result.item));
      setIsSearching(false);
    }, 300);

    return () => clearTimeout(timer);
  }, [searchTerm]);

  // Handle search submission
  const handleSearch = (e) => {
    e.preventDefault();
    if (!searchTerm.trim()) return;

    saveRecentSearch(searchTerm);
    onClose();

    // Navigate to search results page
    navigate(`/fields?search=${encodeURIComponent(searchTerm)}`);
  };

  // Clear search
  const handleClearSearch = () => {
    setSearchTerm("");
    setSearchResults([]);
  };

  // Handle click on search result
  const handleResultClick = (result) => {
    saveRecentSearch(result.name);
    onClose();

    // Navigate based on result type
    switch (result.type) {
      case "field":
        navigate(`/fields/${result.id}`);
        break;
      case "location":
        navigate(`/fields?location=${encodeURIComponent(result.name)}`);
        break;
      case "offer":
        navigate(`/offers`);
        break;
      case "time":
        navigate(`/fields?time=${encodeURIComponent(result.name)}`);
        break;
      default:
        navigate(`/fields?search=${encodeURIComponent(result.name)}`);
    }
  };

  // Use recent search
  const handleUseRecentSearch = (term) => {
    setSearchTerm(term);
    saveRecentSearch(term);
  };

  // Group search results by type
  const groupedResults = searchResults.reduce((acc, result) => {
    if (!acc[result.type]) {
      acc[result.type] = [];
    }
    acc[result.type].push(result);
    return acc;
  }, {});

  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
      maxWidth="md"
      PaperProps={{
        sx: {
          borderRadius: 2,
          overflow: "hidden",
        },
      }}
    >
      <Box
        sx={{
          p: 2,
          bgcolor: "secondary.main",
          color: "white",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Typography variant="h6" fontWeight={600}>
          Search Fields
        </Typography>
        <IconButton color="inherit" onClick={onClose}>
          <CloseIcon />
        </IconButton>
      </Box>

      <DialogContent sx={{ p: 3 }}>
        <form onSubmit={handleSearch}>
          <TextField
            autoFocus
            fullWidth
            value={searchTerm}
            onChange={handleSearchChange}
            placeholder="Search for fields by name or location..."
            variant="outlined"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon color="primary" />
                </InputAdornment>
              ),
              endAdornment: searchTerm && (
                <InputAdornment position="end">
                  <IconButton onClick={handleClearSearch} size="small">
                    <CloseIcon fontSize="small" />
                  </IconButton>
                </InputAdornment>
              ),
              sx: {
                borderRadius: 2,
                "& .MuiOutlinedInput-notchedOutline": {
                  borderColor: "rgba(0, 0, 0, 0.1)",
                },
              },
            }}
          />
        </form>

        {recentSearches.length > 0 && searchTerm === "" && (
          <Box sx={{ mt: 3 }}>
            <Typography variant="subtitle2" color="text.secondary" gutterBottom>
              Recent Searches
            </Typography>
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
              {recentSearches.map((term, index) => (
                <Chip
                  key={index}
                  label={term}
                  onClick={() => handleUseRecentSearch(term)}
                  sx={{
                    bgcolor: "background.paper",
                    "&:hover": {
                      bgcolor: "rgba(255, 106, 0, 0.1)",
                    },
                  }}
                />
              ))}
            </Box>
          </Box>
        )}

        {isSearching && (
          <Box sx={{ display: "flex", justifyContent: "center", my: 4 }}>
            <CircularProgress color="primary" />
          </Box>
        )}

        {searchResults.length > 0 && (
          <Box sx={{ mt: 3 }}>
            <Typography variant="subtitle1" fontWeight={600} gutterBottom>
              {searchResults.length} results found
            </Typography>

            {/* Display results grouped by type */}
            {Object.entries(groupedResults).map(([type, results]) => (
              <Box key={type} sx={{ mb: 3 }}>
                <Typography
                  variant="subtitle2"
                  sx={{
                    px: 2,
                    py: 1,
                    bgcolor: "background.default",
                    color: "text.secondary",
                    fontWeight: 600,
                    borderRadius: "4px 4px 0 0",
                  }}
                >
                  {type.charAt(0).toUpperCase() + type.slice(1)}s
                </Typography>

                <List sx={{ width: "100%", mb: 2 }}>
                  {results.map((result, index) => (
                    <React.Fragment key={`${result.type}-${result.id}`}>
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: index * 0.05 }}
                      >
                        {result.type === "field" ? (
                          // Field result with image
                          <ListItem
                            button
                            onClick={() => handleResultClick(result)}
                            alignItems="flex-start"
                            sx={{
                              py: 2,
                              borderRadius: 2,
                              mb: 1,
                              "&:hover": {
                                bgcolor: "rgba(0, 0, 0, 0.02)",
                              },
                            }}
                          >
                            <ListItemAvatar>
                              <Avatar
                                src={result.image}
                                variant="rounded"
                                sx={{
                                  width: 80,
                                  height: 80,
                                  borderRadius: 2,
                                  mr: 1,
                                }}
                              />
                            </ListItemAvatar>
                            <ListItemText
                              primary={
                                <Typography
                                  variant="h6"
                                  component="div"
                                  fontWeight={600}
                                >
                                  {result.name}
                                </Typography>
                              }
                              secondary={
                                <>
                                  <Box
                                    sx={{
                                      display: "flex",
                                      alignItems: "center",
                                      mt: 0.5,
                                    }}
                                  >
                                    <LocationOnIcon
                                      fontSize="small"
                                      color="primary"
                                      sx={{ mr: 0.5 }}
                                    />
                                    <Typography
                                      variant="body2"
                                      color="text.secondary"
                                    >
                                      {result.location}
                                    </Typography>
                                  </Box>
                                  <Typography
                                    variant="body2"
                                    color="primary"
                                    fontWeight={600}
                                    sx={{ mt: 1 }}
                                  >
                                    {result.price}
                                  </Typography>
                                </>
                              }
                              sx={{ ml: 1 }}
                            />
                          </ListItem>
                        ) : (
                          // Other result types
                          <ListItem
                            button
                            onClick={() => handleResultClick(result)}
                            sx={{
                              py: 1.5,
                              "&:hover": {
                                bgcolor: "rgba(0, 0, 0, 0.02)",
                              },
                            }}
                          >
                            <ListItemAvatar>
                              <Avatar
                                sx={{
                                  bgcolor:
                                    result.type === "location"
                                      ? "error.light"
                                      : result.type === "offer"
                                      ? "success.light"
                                      : "info.light",
                                }}
                              >
                                {result.type === "location" && (
                                  <LocationOnIcon />
                                )}
                                {result.type === "offer" && <LocalOfferIcon />}
                                {result.type === "time" && <AccessTimeIcon />}
                              </Avatar>
                            </ListItemAvatar>
                            <ListItemText
                              primary={result.name}
                              secondary={result.description || ""}
                            />
                          </ListItem>
                        )}
                      </motion.div>
                      {index < results.length - 1 && (
                        <Divider variant="inset" component="li" />
                      )}
                    </React.Fragment>
                  ))}
                </List>
              </Box>
            ))}

            <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
              <Button
                variant="outlined"
                color="primary"
                component={Link}
                to="/fields"
                onClick={onClose}
              >
                View All Results
              </Button>
            </Box>
          </Box>
        )}

        {searchTerm && searchResults.length === 0 && !isSearching && (
          <Box
            sx={{
              mt: 4,
              textAlign: "center",
              p: 4,
              bgcolor: "background.paper",
              borderRadius: 2,
            }}
          >
            <SportsSoccerIcon
              sx={{ fontSize: 60, color: "text.disabled", mb: 2 }}
            />
            <Typography variant="h6" gutterBottom>
              No results found
            </Typography>
            <Typography variant="body2" color="text.secondary">
              We couldn't find any matches for "{searchTerm}". Try different
              keywords or browse our categories.
            </Typography>
            <Button
              variant="contained"
              color="primary"
              component={Link}
              to="/fields"
              sx={{ mt: 2 }}
              onClick={onClose}
            >
              Browse All Fields
            </Button>
          </Box>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default SearchDialog;
