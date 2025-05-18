import React, { useState } from "react";
import {
  Box,
  Container,
  Typography,
  Grid,
  Paper,
  Tabs,
  Tab,
  Button,
  Chip,
  Divider,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  useTheme,
  Card,
  CardContent,
  CardActions,
  Stack,
  Alert,
} from "@mui/material";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import EventIcon from "@mui/icons-material/Event";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import PeopleIcon from "@mui/icons-material/People";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import VisibilityIcon from "@mui/icons-material/Visibility";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import StarIcon from "@mui/icons-material/Star";
import StarBorderIcon from "@mui/icons-material/StarBorder";

const MyBookings = () => {
  const theme = useTheme();
  const [tabValue, setTabValue] = useState(0);
  const [cancelDialogOpen, setCancelDialogOpen] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [rateDialogOpen, setRateDialogOpen] = useState(false);
  const [rating, setRating] = useState(0);

  // Mock bookings data
  const bookings = [
    {
      id: "B1001",
      fieldId: 1,
      fieldName: "Downtown Stadium",
      fieldImage:
        "https://source.unsplash.com/random/600x400/?football,stadium",
      location: "Central City",
      date: "2023-11-25",
      time: "18:00 - 20:00",
      duration: 2,
      players: 10,
      price: 100,
      status: "Upcoming",
      paymentStatus: "Paid",
    },
    {
      id: "B1002",
      fieldId: 2,
      fieldName: "Riverside Field",
      fieldImage: "https://source.unsplash.com/random/600x400/?soccer,field",
      location: "Riverside District",
      date: "2023-11-30",
      time: "16:00 - 18:00",
      duration: 2,
      players: 14,
      price: 90,
      status: "Upcoming",
      paymentStatus: "Paid",
    },
    {
      id: "B1003",
      fieldId: 3,
      fieldName: "Green Valley Pitch",
      fieldImage: "https://source.unsplash.com/random/600x400/?football,pitch",
      location: "Green Valley",
      date: "2023-10-15",
      time: "19:00 - 21:00",
      duration: 2,
      players: 8,
      price: 110,
      status: "Completed",
      paymentStatus: "Paid",
      rated: true,
      rating: 4,
    },
    {
      id: "B1004",
      fieldId: 1,
      fieldName: "Downtown Stadium",
      fieldImage:
        "https://source.unsplash.com/random/600x400/?football,stadium",
      location: "Central City",
      date: "2023-10-08",
      time: "14:00 - 16:00",
      duration: 2,
      players: 12,
      price: 100,
      status: "Completed",
      paymentStatus: "Paid",
      rated: false,
    },
    {
      id: "B1005",
      fieldId: 4,
      fieldName: "Elite Sports Complex",
      fieldImage: "https://source.unsplash.com/random/600x400/?sports,complex",
      location: "Northside",
      date: "2023-10-01",
      time: "10:00 - 12:00",
      duration: 2,
      players: 16,
      price: 130,
      status: "Completed",
      paymentStatus: "Paid",
      rated: true,
      rating: 5,
    },
  ];

  // Filter bookings based on tab
  const upcomingBookings = bookings.filter(
    (booking) => booking.status === "Upcoming"
  );
  const completedBookings = bookings.filter(
    (booking) => booking.status === "Completed"
  );

  // Handle tab change
  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  // Handle cancel booking
  const handleCancelBooking = (booking) => {
    setSelectedBooking(booking);
    setCancelDialogOpen(true);
  };

  // Confirm cancel booking
  const confirmCancelBooking = () => {
    // In a real app, you would call an API to cancel the booking
    console.log("Cancelling booking:", selectedBooking);
    setCancelDialogOpen(false);
    setSelectedBooking(null);
  };

  // Handle rate booking
  const handleRateBooking = (booking) => {
    setSelectedBooking(booking);
    setRating(booking.rating || 0);
    setRateDialogOpen(true);
  };

  // Submit rating
  const submitRating = () => {
    // In a real app, you would call an API to submit the rating
    console.log("Rating booking:", selectedBooking, "with", rating, "stars");
    setRateDialogOpen(false);
    setSelectedBooking(null);
  };

  // Format date
  const formatDate = (dateString) => {
    const options = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    return new Date(dateString).toLocaleDateString("en-US", options);
  };

  return (
    <Box sx={{ pt: 12, pb: 10 }}>
      <Container maxWidth="lg">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Typography
            variant="h3"
            component="h1"
            sx={{ fontWeight: 700, mb: 1 }}
          >
            My Bookings
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
            View and manage your field reservations
          </Typography>

          {/* Booking Stats */}
          <Grid container spacing={3} sx={{ mb: 4 }}>
            <Grid item xs={12} sm={6} md={3}>
              <Paper
                elevation={2}
                sx={{
                  p: 3,
                  borderRadius: 3,
                  bgcolor: "primary.main",
                  color: "white",
                }}
              >
                <Typography variant="h6" sx={{ mb: 1 }}>
                  Total Bookings
                </Typography>
                <Typography variant="h3" sx={{ fontWeight: 700 }}>
                  {bookings.length}
                </Typography>
              </Paper>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Paper
                elevation={2}
                sx={{
                  p: 3,
                  borderRadius: 3,
                  bgcolor: "secondary.main",
                  color: "white",
                }}
              >
                <Typography variant="h6" sx={{ mb: 1 }}>
                  Upcoming
                </Typography>
                <Typography variant="h3" sx={{ fontWeight: 700 }}>
                  {upcomingBookings.length}
                </Typography>
              </Paper>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Paper
                elevation={2}
                sx={{
                  p: 3,
                  borderRadius: 3,
                  bgcolor: "success.main",
                  color: "white",
                }}
              >
                <Typography variant="h6" sx={{ mb: 1 }}>
                  Completed
                </Typography>
                <Typography variant="h3" sx={{ fontWeight: 700 }}>
                  {completedBookings.length}
                </Typography>
              </Paper>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Paper
                elevation={2}
                sx={{
                  p: 3,
                  borderRadius: 3,
                  bgcolor: "info.main",
                  color: "white",
                }}
              >
                <Typography variant="h6" sx={{ mb: 1 }}>
                  Total Spent
                </Typography>
                <Typography variant="h3" sx={{ fontWeight: 700 }}>
                  ${bookings.reduce((sum, booking) => sum + booking.price, 0)}
                </Typography>
              </Paper>
            </Grid>
          </Grid>

          {/* Booking Tabs */}
          <Paper elevation={2} sx={{ borderRadius: 3, mb: 4 }}>
            <Tabs
              value={tabValue}
              onChange={handleTabChange}
              variant="fullWidth"
              sx={{
                borderBottom: 1,
                borderColor: "divider",
                "& .MuiTab-root": {
                  py: 2,
                  fontWeight: 600,
                },
                "& .Mui-selected": {
                  color: "primary.main",
                },
                "& .MuiTabs-indicator": {
                  backgroundColor: "primary.main",
                },
              }}
            >
              <Tab label={`Upcoming (${upcomingBookings.length})`} />
              <Tab label={`Completed (${completedBookings.length})`} />
            </Tabs>

            <Box sx={{ p: 3 }}>
              {/* Upcoming Bookings Tab */}
              {tabValue === 0 && (
                <>
                  {upcomingBookings.length > 0 ? (
                    <Grid container spacing={3}>
                      {upcomingBookings.map((booking) => (
                        <Grid item xs={12} md={6} key={booking.id}>
                          <Card
                            sx={{
                              borderRadius: 3,
                              overflow: "hidden",
                              transition:
                                "transform 0.3s ease, box-shadow 0.3s ease",
                              "&:hover": {
                                transform: "translateY(-5px)",
                                boxShadow: "0 10px 30px rgba(0, 0, 0, 0.1)",
                              },
                            }}
                          >
                            <Box
                              sx={{
                                height: 140,
                                overflow: "hidden",
                                position: "relative",
                              }}
                            >
                              <Box
                                component="img"
                                src={booking.fieldImage}
                                alt={booking.fieldName}
                                sx={{
                                  width: "100%",
                                  height: "100%",
                                  objectFit: "cover",
                                }}
                              />
                              <Box
                                sx={{
                                  position: "absolute",
                                  top: 16,
                                  right: 16,
                                  zIndex: 1,
                                }}
                              >
                                <Chip
                                  label={booking.status}
                                  color="primary"
                                  sx={{ fontWeight: 600 }}
                                />
                              </Box>
                            </Box>
                            <CardContent>
                              <Typography
                                variant="h5"
                                component="h2"
                                sx={{ fontWeight: 700, mb: 2 }}
                              >
                                {booking.fieldName}
                              </Typography>
                              <Box
                                sx={{
                                  display: "flex",
                                  alignItems: "center",
                                  mb: 1,
                                }}
                              >
                                <EventIcon
                                  sx={{
                                    color: "text.secondary",
                                    mr: 1,
                                    fontSize: 20,
                                  }}
                                />
                                <Typography
                                  variant="body2"
                                  color="text.secondary"
                                >
                                  {formatDate(booking.date)}
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
                                    mr: 1,
                                    fontSize: 20,
                                  }}
                                />
                                <Typography
                                  variant="body2"
                                  color="text.secondary"
                                >
                                  {booking.time} ({booking.duration} hours)
                                </Typography>
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
                                    mr: 1,
                                    fontSize: 20,
                                  }}
                                />
                                <Typography
                                  variant="body2"
                                  color="text.secondary"
                                >
                                  {booking.location}
                                </Typography>
                              </Box>
                              <Box
                                sx={{
                                  display: "flex",
                                  alignItems: "center",
                                  mb: 2,
                                }}
                              >
                                <PeopleIcon
                                  sx={{
                                    color: "text.secondary",
                                    mr: 1,
                                    fontSize: 20,
                                  }}
                                />
                                <Typography
                                  variant="body2"
                                  color="text.secondary"
                                >
                                  {booking.players} players
                                </Typography>
                              </Box>
                              <Divider sx={{ mb: 2 }} />
                              <Box
                                sx={{
                                  display: "flex",
                                  justifyContent: "space-between",
                                  alignItems: "center",
                                }}
                              >
                                <Typography
                                  variant="h6"
                                  color="primary.main"
                                  sx={{ fontWeight: 700 }}
                                >
                                  ${booking.price}
                                </Typography>
                                <Chip
                                  label={booking.paymentStatus}
                                  color="success"
                                  size="small"
                                  sx={{ fontWeight: 600 }}
                                />
                              </Box>
                            </CardContent>
                            <CardActions sx={{ p: 2, pt: 0 }}>
                              <Button
                                component={Link}
                                to={`/fields/${booking.fieldId}`}
                                variant="outlined"
                                size="small"
                                startIcon={<VisibilityIcon />}
                              >
                                View Field
                              </Button>
                              <Button
                                variant="outlined"
                                color="error"
                                size="small"
                                startIcon={<DeleteIcon />}
                                onClick={() => handleCancelBooking(booking)}
                                sx={{ ml: "auto" }}
                              >
                                Cancel
                              </Button>
                            </CardActions>
                          </Card>
                        </Grid>
                      ))}
                    </Grid>
                  ) : (
                    <Box sx={{ textAlign: "center", py: 4 }}>
                      <Typography variant="h6" sx={{ mb: 2 }}>
                        You don't have any upcoming bookings
                      </Typography>
                      <Button
                        component={Link}
                        to="/fields"
                        variant="contained"
                        color="primary"
                      >
                        Book a Field
                      </Button>
                    </Box>
                  )}
                </>
              )}

              {/* Completed Bookings Tab */}
              {tabValue === 1 && (
                <>
                  {completedBookings.length > 0 ? (
                    <TableContainer>
                      <Table sx={{ minWidth: 650 }}>
                        <TableHead>
                          <TableRow>
                            <TableCell>Booking ID</TableCell>
                            <TableCell>Field</TableCell>
                            <TableCell>Date</TableCell>
                            <TableCell>Time</TableCell>
                            <TableCell>Players</TableCell>
                            <TableCell>Amount</TableCell>
                            <TableCell>Rating</TableCell>
                            <TableCell>Actions</TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {completedBookings.map((booking) => (
                            <TableRow key={booking.id}>
                              <TableCell>{booking.id}</TableCell>
                              <TableCell>{booking.fieldName}</TableCell>
                              <TableCell>{formatDate(booking.date)}</TableCell>
                              <TableCell>{booking.time}</TableCell>
                              <TableCell>{booking.players}</TableCell>
                              <TableCell>${booking.price}</TableCell>
                              <TableCell>
                                {booking.rated ? (
                                  <Box
                                    sx={{
                                      display: "flex",
                                      alignItems: "center",
                                    }}
                                  >
                                    {[...Array(5)].map((_, i) => (
                                      <StarIcon
                                        key={i}
                                        sx={{
                                          color:
                                            i < booking.rating
                                              ? "primary.main"
                                              : "text.disabled",
                                          fontSize: 18,
                                        }}
                                      />
                                    ))}
                                  </Box>
                                ) : (
                                  <Button
                                    variant="outlined"
                                    size="small"
                                    onClick={() => handleRateBooking(booking)}
                                  >
                                    Rate
                                  </Button>
                                )}
                              </TableCell>
                              <TableCell>
                                <Button
                                  component={Link}
                                  to={`/fields/${booking.fieldId}`}
                                  variant="outlined"
                                  size="small"
                                  sx={{ mr: 1 }}
                                >
                                  View Field
                                </Button>
                                <Button
                                  component={Link}
                                  to={`/fields/${booking.fieldId}/booking`}
                                  variant="contained"
                                  color="primary"
                                  size="small"
                                >
                                  Book Again
                                </Button>
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </TableContainer>
                  ) : (
                    <Box sx={{ textAlign: "center", py: 4 }}>
                      <Typography variant="h6" sx={{ mb: 2 }}>
                        You don't have any completed bookings
                      </Typography>
                      <Button
                        component={Link}
                        to="/fields"
                        variant="contained"
                        color="primary"
                      >
                        Book a Field
                      </Button>
                    </Box>
                  )}
                </>
              )}
            </Box>
          </Paper>

          {/* Need Help Section */}
          <Paper
            elevation={2}
            sx={{
              p: 4,
              borderRadius: 3,
              bgcolor: "secondary.main",
              color: "white",
            }}
          >
            <Grid container spacing={3} alignItems="center">
              <Grid item xs={12} md={8}>
                <Typography variant="h5" sx={{ fontWeight: 700, mb: 1 }}>
                  Need Help with Your Booking?
                </Typography>
                <Typography variant="body1" sx={{ opacity: 0.9 }}>
                  Our customer support team is available 24/7 to assist you with
                  any questions or issues regarding your bookings.
                </Typography>
              </Grid>
              <Grid item xs={12} md={4} sx={{ textAlign: { md: "right" } }}>
                <Button
                  component={Link}
                  to="/contact"
                  variant="contained"
                  color="primary"
                  size="large"
                >
                  Contact Support
                </Button>
              </Grid>
            </Grid>
          </Paper>
        </motion.div>
      </Container>

      {/* Cancel Booking Dialog */}
      <Dialog
        open={cancelDialogOpen}
        onClose={() => setCancelDialogOpen(false)}
        aria-labelledby="cancel-dialog-title"
      >
        <DialogTitle id="cancel-dialog-title">Cancel Booking</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to cancel your booking at{" "}
            <strong>{selectedBooking?.fieldName}</strong> on{" "}
            {selectedBooking && formatDate(selectedBooking.date)} at{" "}
            {selectedBooking?.time}? This action cannot be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setCancelDialogOpen(false)}>
            No, Keep It
          </Button>
          <Button
            onClick={confirmCancelBooking}
            variant="contained"
            color="error"
          >
            Yes, Cancel Booking
          </Button>
        </DialogActions>
      </Dialog>

      {/* Rate Booking Dialog */}
      <Dialog
        open={rateDialogOpen}
        onClose={() => setRateDialogOpen(false)}
        aria-labelledby="rate-dialog-title"
      >
        <DialogTitle id="rate-dialog-title">Rate Your Experience</DialogTitle>
        <DialogContent>
          <DialogContentText sx={{ mb: 3 }}>
            How would you rate your experience at{" "}
            <strong>{selectedBooking?.fieldName}</strong> on{" "}
            {selectedBooking && formatDate(selectedBooking.date)}?
          </DialogContentText>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              mb: 2,
            }}
          >
            {[...Array(5)].map((_, i) => (
              <IconButton
                key={i}
                onClick={() => setRating(i + 1)}
                sx={{ p: 1 }}
              >
                {i < rating ? (
                  <StarIcon sx={{ fontSize: 40, color: "primary.main" }} />
                ) : (
                  <StarBorderIcon
                    sx={{ fontSize: 40, color: "text.secondary" }}
                  />
                )}
              </IconButton>
            ))}
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setRateDialogOpen(false)}>Cancel</Button>
          <Button
            onClick={submitRating}
            variant="contained"
            color="primary"
            disabled={rating === 0}
          >
            Submit Rating
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default MyBookings;
