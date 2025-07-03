import React, { useState } from "react";
import { Container, Grid, Select, MenuItem, TextField } from "@mui/material";

const SearchFilter = ({ setFilters }) => {
  const [searchType, setSearchType] = useState("name");
  const [searchValue, setSearchValue] = useState("");

  const handleSearchChange = (e) => {
    setSearchValue(e.target.value);
    setFilters({ searchType, searchValue: e.target.value });
  };

  return (
    <>
       <div className="headSearchFilter"> choose Your suitable <span>offer</span> </div>
    <Container className="search-container">
      <Grid container spacing={2}>
        {/* Dropdown to select search type */}
        <Grid item xs={12} sm={4}>
          <Select 
            fullWidth 
            value={searchType} 
            onChange={(e) => setSearchType(e.target.value)} 
            className="glass-select"
          >
          
            <MenuItem value="name">🔎 Search by Field Name</MenuItem>
            <MenuItem value="location">📍 Search by Location</MenuItem>
            <MenuItem value="date">📅 Search by Date</MenuItem>
          </Select>
        </Grid>

        {/* Dynamic input based on search type */}
        <Grid item xs={12} sm={8}>
          <TextField 
            fullWidth 
            variant="outlined" 
            placeholder={`Search by ${searchType === "name" ? "Field Name" : searchType === "location" ? "Location" : "Date"}`}
            type={searchType === "date" ? "date" : "text"}
            value={searchValue}
            onChange={handleSearchChange}
            className="glass-search"
          />
        </Grid>
      </Grid>
    </Container>
    </>
  );
};

export default SearchFilter;