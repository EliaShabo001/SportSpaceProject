import React, { useState, useEffect, useRef } from "react";
import {
  Box,
  TextField,
  InputAdornment,
  IconButton,
  Paper,
  Typography,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Divider,
  Chip,
  CircularProgress,
  Fade,
  Popper,
  ClickAwayListener,
  useTheme,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import CloseIcon from "@mui/icons-material/Close";
import SportsSoccerIcon from "@mui/icons-material/SportsSoccer";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import EventIcon from "@mui/icons-material/Event";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";
import HistoryIcon from "@mui/icons-material/History";
import { Link, useNavigate } from "react-router-dom";
import Fuse from "fuse.js";

// Mock data for search
const searchData = {
  fields: [
    {
      id: 1,
      name: "Downtown Stadium",
      location: "Central City",
      type: "field",
    },
    {
      id: 2,
      name: "Riverside Field",
      location: "Riverside District",
      type: "field",
    },
    {
      id: 3,
      name: "Green Valley Pitch",
      location: "Green Valley",
      type: "field",
    },
    {
      id: 4,
      name: "Elite Sports Complex",
      location: "Northside",
      type: "field",
    },
    { id: 5, name: "Community Field", location: "Westside", type: "field" },
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

const allSearchItems = [
  ...searchData.fields,
  ...searchData.locations,
  ...searchData.offers,
  ...searchData.times,
];

const fuse = new Fuse(allSearchItems, fuseOptions);

const AdvancedSearchBar = ({ fullWidth = false, variant = "standard" }) => {
  const theme = useTheme();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [recentSearches, setRecentSearches] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const searchRef = useRef(null);
  const inputRef = useRef(null);

  // Load recent searches from localStorage
  useEffect(() => {
    const savedSearches = localStorage.getItem("recentSearches");
    if (savedSearches) {
      setRecentSearches(JSON.parse(savedSearches));
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
    const query = e.target.value;
    setSearchQuery(query);

    if (query.trim() === "") {
      setSearchResults([]);
      return;
    }

    setIsSearching(true);

    // Simulate network delay for search
    setTimeout(() => {
      const results = fuse.search(query);
      setSearchResults(results.map((result) => result.item));
      setIsSearching(false);
    }, 300);
  };

  // Handle search submission
  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;

    saveRecentSearch(searchQuery);
    setShowResults(false);

    // Navigate to search results page
    navigate(`/fields?search=${encodeURIComponent(searchQuery)}`);
  };

  // Clear search input
  const handleClearSearch = () => {
    setSearchQuery("");
    setSearchResults([]);
    inputRef.current?.focus();
  };

  // Handle click on search result
  const handleResultClick = (result) => {
    saveRecentSearch(result.name);
    setShowResults(false);

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

  // Handle click on recent search
  const handleRecentSearchClick = (query) => {
    setSearchQuery(query);
    saveRecentSearch(query);
    setShowResults(false);
    navigate(`/fields?search=${encodeURIComponent(query)}`);
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
    <Box
      ref={searchRef}
      sx={{
        position: "relative",
        width: fullWidth ? "100%" : { xs: "100%", sm: 400 },
      }}
    >
      <form onSubmit={handleSearchSubmit}>
        <TextField
          ref={inputRef}
          variant={variant}
          fullWidth
          placeholder="Search"
          value={searchQuery}
          onChange={handleSearchChange}
          onFocus={() => setShowResults(true)}
          size="small"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon color="action" fontSize="small" />
              </InputAdornment>
            ),
            endAdornment: searchQuery && (
              <InputAdornment position="end">
                {isSearching ? (
                  <CircularProgress size={16} color="inherit" />
                ) : (
                  <IconButton
                    edge="end"
                    onClick={handleClearSearch}
                    size="small"
                  >
                    <CloseIcon fontSize="small" />
                  </IconButton>
                )}
              </InputAdornment>
            ),
            sx: {
              borderRadius: variant === "standard" ? 0 : 2,
              bgcolor: "transparent",
              height: 32,
              boxShadow: "none",
              "&:hover": {
                boxShadow: "none",
              },
              "& .MuiInputBase-root::before": {
                borderColor: "rgba(255, 255, 255, 0.5)",
              },
              "& .MuiInputBase-root:hover::before": {
                borderColor: "rgba(255, 255, 255, 0.8) !important",
              },
              "& .MuiInputBase-root::after": {
                borderColor: "primary.main",
              },
            },
          }}
          sx={{
            "& .MuiOutlinedInput-root": {
              borderRadius: 2,
              fontSize: "0.85rem",
            },
            "& .MuiInput-root": {
              fontSize: "0.85rem",
            },
            "& .MuiInputBase-input": {
              py: 0.25,
              px: variant === "standard" ? 0 : 1,
              color: variant === "standard" ? "white" : "inherit",
            },
            "& .MuiInputAdornment-root .MuiSvgIcon-root": {
              color:
                variant === "standard" ? "rgba(255, 255, 255, 0.7)" : "inherit",
            },
            "& .MuiIconButton-root": {
              color:
                variant === "standard" ? "rgba(255, 255, 255, 0.7)" : "inherit",
            },
          }}
        />
      </form>

      <Popper
        open={showResults}
        anchorEl={searchRef.current}
        placement="bottom-start"
        transition
        style={{ width: searchRef.current?.offsetWidth, zIndex: 1300 }}
      >
        {({ TransitionProps }) => (
          <ClickAwayListener onClickAway={() => setShowResults(false)}>
            <Fade {...TransitionProps} timeout={350}>
              <Paper
                elevation={3}
                sx={{
                  mt: 1,
                  maxHeight: 400,
                  overflow: "auto",
                  borderRadius: 2,
                }}
              >
                {isSearching ? (
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      p: 3,
                    }}
                  >
                    <CircularProgress size={24} />
                  </Box>
                ) : searchResults.length > 0 ? (
                  <Box>
                    {Object.entries(groupedResults).map(([type, results]) => (
                      <Box key={type}>
                        <Typography
                          variant="subtitle2"
                          sx={{
                            px: 2,
                            py: 1,
                            bgcolor: "background.default",
                            color: "text.secondary",
                            fontWeight: 600,
                          }}
                        >
                          {type.charAt(0).toUpperCase() + type.slice(1)}s
                        </Typography>
                        <List disablePadding>
                          {results.map((result) => (
                            <ListItem
                              key={`${result.type}-${result.id}`}
                              button
                              onClick={() => handleResultClick(result)}
                              sx={{
                                py: 1,
                                px: 2,
                                "&:hover": {
                                  bgcolor: "rgba(0, 0, 0, 0.04)",
                                },
                              }}
                            >
                              <ListItemIcon sx={{ minWidth: 40 }}>
                                {result.type === "field" && (
                                  <SportsSoccerIcon color="primary" />
                                )}
                                {result.type === "location" && (
                                  <LocationOnIcon color="error" />
                                )}
                                {result.type === "offer" && (
                                  <LocalOfferIcon color="success" />
                                )}
                                {result.type === "time" && (
                                  <EventIcon color="info" />
                                )}
                              </ListItemIcon>
                              <ListItemText
                                primary={result.name}
                                secondary={
                                  result.location || result.description || ""
                                }
                                primaryTypographyProps={{
                                  fontWeight: 500,
                                }}
                              />
                            </ListItem>
                          ))}
                        </List>
                      </Box>
                    ))}
                  </Box>
                ) : searchQuery ? (
                  <Box sx={{ p: 3, textAlign: "center" }}>
                    <Typography color="text.secondary">
                      No results found for "{searchQuery}"
                    </Typography>
                  </Box>
                ) : recentSearches.length > 0 ? (
                  <Box>
                    <Typography
                      variant="subtitle2"
                      sx={{
                        px: 2,
                        py: 1,
                        bgcolor: "background.default",
                        color: "text.secondary",
                        fontWeight: 600,
                      }}
                    >
                      Recent Searches
                    </Typography>
                    <List disablePadding>
                      {recentSearches.map((query, index) => (
                        <ListItem
                          key={index}
                          button
                          onClick={() => handleRecentSearchClick(query)}
                          sx={{
                            py: 1,
                            px: 2,
                            "&:hover": {
                              bgcolor: "rgba(0, 0, 0, 0.04)",
                            },
                          }}
                        >
                          <ListItemIcon sx={{ minWidth: 40 }}>
                            <HistoryIcon color="action" />
                          </ListItemIcon>
                          <ListItemText primary={query} />
                        </ListItem>
                      ))}
                    </List>
                  </Box>
                ) : (
                  <Box sx={{ p: 3, textAlign: "center" }}>
                    <Typography color="text.secondary">
                      Start typing to search
                    </Typography>
                  </Box>
                )}
              </Paper>
            </Fade>
          </ClickAwayListener>
        )}
      </Popper>
    </Box>
  );
};

export default AdvancedSearchBar;
