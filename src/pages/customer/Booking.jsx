import React, { useState, useEffect } from "react";
import { useParams, useLocation, useNavigate, Link } from "react-router-dom";
import {
  Box,
  Container,
  Typography,
  Grid,
  Paper,
  Button,
  Divider,
  TextField,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
  Alert,
  Snackbar,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import { motion } from "framer-motion";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import PeopleIcon from "@mui/icons-material/People";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

const Booking = () => {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const [duration, setDuration] = useState(2);
  const [players, setPlayers] = useState(10);
  const [selectedDate, setSelectedDate] = useState(
    new Date().toISOString().split("T")[0]
  );
  const [selectedTime, setSelectedTime] = useState("12:00");
  const [field, setField] = useState(null);
  const [loading, setLoading] = useState(true);
  const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);
  const [bookingData, setBookingData] = useState(null);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  useEffect(() => {
    // Simulate API call to fetch field details
    const fetchField = async () => {
      setLoading(true);
      try {
        // In a real app, you would fetch data from your API
        // For now, we'll use mock data
        setTimeout(() => {
          const mockField = {
            id: parseInt(id),
            name:
              id === "1"
                ? "Downtown Stadium"
                : id === "2"
                ? "Riverside Field"
                : id === "3"
                ? "Green Valley Pitch"
                : id === "4"
                ? "Mountain View Arena"
                : id === "5"
                ? "Sunset Park Field"
                : "Lakeside Stadium",
            location:
              id === "1"
                ? "Central City, 123 Main St"
                : id === "2"
                ? "Riverside District, 45 River Rd"
                : id === "3"
                ? "Green Valley, 78 Valley Ave"
                : id === "4"
                ? "Mountain District, 90 Peak Rd"
                : id === "5"
                ? "Sunset District, 34 West Blvd"
                : "Lakeside Area, 56 Lake Dr",
            description:
              "A premium football field with excellent facilities, perfect for both casual games and competitive matches. The field features high-quality artificial turf that provides excellent ball control and player comfort.",
            hourlyRate:
              id === "1"
                ? 50
                : id === "2"
                ? 45
                : id === "3"
                ? 55
                : id === "4"
                ? 60
                : id === "5"
                ? 40
                : 65,
            capacity:
              id === "1"
                ? 22
                : id === "2"
                ? 18
                : id === "3"
                ? 22
                : id === "4"
                ? 24
                : id === "5"
                ? 16
                : 22,
            availabilityHours: "08:00-22:00",
            image: `https://source.unsplash.com/random/800x600/?football,stadium,${id}`,
          };

          setField(mockField);
          setLoading(false);
        }, 1000);
      } catch (error) {
        console.error("Error fetching field:", error);
        setLoading(false);
      }
    };

    fetchField();
  }, [id]);

  const handleBookNow = () => {
    // In a real app, you would validate the form and proceed to booking
    const data = {
      fieldId: field.id,
      fieldName: field.name,
      date: selectedDate,
      time: selectedTime,
      duration,
      players,
      totalPrice: field.hourlyRate * duration,
    };

    // Store the booking data and open confirmation dialog
    setBookingData(data);
    setConfirmDialogOpen(true);
  };

  const handleConfirmBooking = () => {
    // Close the dialog
    setConfirmDialogOpen(false);

    console.log("Booking confirmed:", bookingData);

    // Show success message
    setSnackbar({
      open: true,
      message: "Booking successful! Your field has been reserved.",
      severity: "success",
    });

    // In a real app, you would navigate to a booking confirmation page
    // For now, we'll just navigate to the my-bookings page after a short delay
    setTimeout(() => {
      navigate("/my-bookings");
    }, 2000);
  };

  const handleCancelBooking = () => {
    // Just close the dialog
    setConfirmDialogOpen(false);
  };

  const handleCloseSnackbar = () => {
    setSnackbar({
      ...snackbar,
      open: false,
    });
  };

  // Auto-confirm booking when dialog opens (as per requirement)
  useEffect(() => {
    if (confirmDialogOpen) {
      // Automatically confirm the booking after a short delay
      const timer = setTimeout(() => {
        handleConfirmBooking();
      }, 500);

      return () => clearTimeout(timer);
    }
  }, [confirmDialogOpen]);

  if (loading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <Typography variant="h5">Loading field details...</Typography>
      </Box>
    );
  }

  if (!field) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <Typography variant="h5">Field not found</Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ pt: 12, pb: 10 }}>
      <Container maxWidth="lg">
        {/* Back Button */}
        <Button
          component={Link}
          to={`/fields/${id}`}
          startIcon={<ArrowBackIcon />}
          sx={{ mb: 3 }}
        >
          Back to Field Details
        </Button>

        <Grid container spacing={4}>
          {/* Booking Form */}
          <Grid item xs={12} md={8}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Paper elevation={3} sx={{ p: 4, borderRadius: 3 }}>
                <Typography
                  variant="h4"
                  component="h1"
                  sx={{ mb: 3, fontWeight: 700 }}
                >
                  Book {field.name}
                </Typography>

                <Box sx={{ mb: 4, display: "flex", alignItems: "center" }}>
                  <LocationOnIcon color="primary" sx={{ mr: 1 }} />
                  <Typography variant="body1" color="text.secondary">
                    {field.location}
                  </Typography>
                </Box>

                <Grid container spacing={3}>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      label="Select Date"
                      type="date"
                      fullWidth
                      value={selectedDate}
                      onChange={(e) => setSelectedDate(e.target.value)}
                      InputLabelProps={{
                        shrink: true,
                      }}
                    />
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <TextField
                      label="Select Time"
                      type="time"
                      fullWidth
                      value={selectedTime}
                      onChange={(e) => setSelectedTime(e.target.value)}
                      InputLabelProps={{
                        shrink: true,
                      }}
                    />
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <FormControl fullWidth variant="outlined">
                      <InputLabel>Duration</InputLabel>
                      <Select
                        value={duration}
                        onChange={(e) => setDuration(e.target.value)}
                        label="Duration"
                      >
                        <MenuItem value={1}>1 hour</MenuItem>
                        <MenuItem value={2}>2 hours</MenuItem>
                        <MenuItem value={3}>3 hours</MenuItem>
                        <MenuItem value={4}>4 hours</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <FormControl fullWidth variant="outlined">
                      <InputLabel>Number of Players</InputLabel>
                      <Select
                        value={players}
                        onChange={(e) => setPlayers(e.target.value)}
                        label="Number of Players"
                      >
                        {[...Array(field.capacity)].map((_, i) => (
                          <MenuItem key={i + 1} value={i + 1}>
                            {i + 1} {i === 0 ? "player" : "players"}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Grid>

                  <Grid item xs={12}>
                    <Divider sx={{ my: 2 }} />

                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        mb: 3,
                      }}
                    >
                      <Typography variant="h6">Total Price:</Typography>
                      <Typography
                        variant="h6"
                        color="primary.main"
                        fontWeight={600}
                      >
                        ${field.hourlyRate * duration}
                      </Typography>
                    </Box>

                    <Button
                      variant="contained"
                      color="primary"
                      size="large"
                      fullWidth
                      onClick={handleBookNow}
                    >
                      Book Now
                    </Button>
                  </Grid>
                </Grid>
              </Paper>
            </motion.div>
          </Grid>

          {/* Sidebar */}
          <Grid item xs={12} md={4}>
            <Paper
              elevation={3}
              sx={{
                p: 3,
                borderRadius: 3,
                position: "sticky",
                top: 100,
              }}
            >
              <Typography
                variant="h5"
                component="h3"
                sx={{ fontWeight: 600, mb: 2 }}
              >
                Field Information
              </Typography>

              <Box sx={{ mb: 2 }}>
                <Typography
                  variant="h4"
                  component="div"
                  color="primary.main"
                  fontWeight={700}
                >
                  ${field.hourlyRate}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  per hour
                </Typography>
              </Box>

              <List disablePadding sx={{ mb: 3 }}>
                <ListItem sx={{ px: 0, py: 1 }}>
                  <ListItemIcon sx={{ minWidth: 36 }}>
                    <PeopleIcon color="primary" fontSize="small" />
                  </ListItemIcon>
                  <ListItemText
                    primary="Capacity"
                    secondary={`${field.capacity} players`}
                  />
                </ListItem>
                <ListItem sx={{ px: 0, py: 1 }}>
                  <ListItemIcon sx={{ minWidth: 36 }}>
                    <AccessTimeIcon color="primary" fontSize="small" />
                  </ListItemIcon>
                  <ListItemText
                    primary="Availability"
                    secondary={field.availabilityHours}
                  />
                </ListItem>
              </List>

              <Divider sx={{ my: 2 }} />

              <Typography variant="subtitle1" fontWeight={600} gutterBottom>
                Booking Benefits:
              </Typography>

              <List disablePadding sx={{ mb: 3 }}>
                <ListItem sx={{ px: 0, py: 1 }}>
                  <ListItemIcon sx={{ minWidth: 36 }}>
                    <CheckCircleIcon color="primary" fontSize="small" />
                  </ListItemIcon>
                  <ListItemText primary="Instant confirmation" />
                </ListItem>
                <ListItem sx={{ px: 0, py: 1 }}>
                  <ListItemIcon sx={{ minWidth: 36 }}>
                    <CheckCircleIcon color="primary" fontSize="small" />
                  </ListItemIcon>
                  <ListItemText primary="Free cancellation up to 24h before" />
                </ListItem>
                <ListItem sx={{ px: 0, py: 1 }}>
                  <ListItemIcon sx={{ minWidth: 36 }}>
                    <CheckCircleIcon color="primary" fontSize="small" />
                  </ListItemIcon>
                  <ListItemText primary="Secure payment" />
                </ListItem>
              </List>
            </Paper>
          </Grid>
        </Grid>
      </Container>

      {/* Booking Confirmation Dialog */}
      <Dialog
        open={confirmDialogOpen}
        onClose={handleCancelBooking}
        aria-labelledby="booking-confirmation-dialog"
      >
        <DialogTitle id="booking-confirmation-dialog" sx={{ fontWeight: 600 }}>
          Confirm Your Booking
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            You are about to book <strong>{bookingData?.fieldName}</strong> for{" "}
            {bookingData?.duration} hour{bookingData?.duration > 1 ? "s" : ""}{" "}
            with {bookingData?.players} player
            {bookingData?.players > 1 ? "s" : ""}.
          </DialogContentText>
          <Box
            sx={{
              mt: 2,
              p: 2,
              bgcolor: "background.paper",
              borderRadius: 1,
              border: "1px solid",
              borderColor: "divider",
            }}
          >
            <Typography variant="subtitle1" fontWeight={600} gutterBottom>
              Booking Details:
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <Typography variant="body2" color="text.secondary">
                  Date:
                </Typography>
                <Typography variant="body1">{bookingData?.date}</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="body2" color="text.secondary">
                  Time:
                </Typography>
                <Typography variant="body1">{bookingData?.time}</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="body2" color="text.secondary">
                  Duration:
                </Typography>
                <Typography variant="body1">
                  {bookingData?.duration} hour
                  {bookingData?.duration > 1 ? "s" : ""}
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="body2" color="text.secondary">
                  Players:
                </Typography>
                <Typography variant="body1">{bookingData?.players}</Typography>
              </Grid>
              <Grid item xs={12}>
                <Divider sx={{ my: 1 }} />
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <Typography variant="subtitle1">Total Price:</Typography>
                  <Typography
                    variant="h6"
                    color="primary.main"
                    fontWeight={600}
                  >
                    ${bookingData?.totalPrice}
                  </Typography>
                </Box>
              </Grid>
            </Grid>
          </Box>
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 3 }}>
          <Button onClick={handleCancelBooking} color="inherit">
            Cancel
          </Button>
          <Button
            onClick={handleConfirmBooking}
            variant="contained"
            color="primary"
            autoFocus
          >
            Confirm Booking
          </Button>
        </DialogActions>
      </Dialog>

      {/* Snackbar for notifications */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={4000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={snackbar.severity}
          variant="filled"
          sx={{ width: "100%" }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default Booking;
