import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import {
  Box,
  Container,
  Typography,
  Grid,
  Paper,
  Button,
  Chip,
  Rating,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Tabs,
  Tab,
  TextField,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
  Alert,
  Snackbar,
  IconButton,
  useTheme,
  ImageList,
  ImageListItem,
  Card,
  CardContent,
  Avatar,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  CircularProgress,
} from "@mui/material";

// Date picker imports removed temporarily
import { motion } from "framer-motion";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import PeopleIcon from "@mui/icons-material/People";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import WifiIcon from "@mui/icons-material/Wifi";
import LocalParkingIcon from "@mui/icons-material/LocalParking";
import ShowerIcon from "@mui/icons-material/Shower";
import RestaurantIcon from "@mui/icons-material/Restaurant";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import EventAvailableIcon from "@mui/icons-material/EventAvailable";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ShareIcon from "@mui/icons-material/Share";
import StarIcon from "@mui/icons-material/Star";
import InfoIcon from "@mui/icons-material/Info";
// date-fns import removed temporarily

const FieldDetail = () => {
  const { id } = useParams();
  const theme = useTheme();
  const navigate = useNavigate();
  const [tabValue, setTabValue] = useState(0);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedTime, setSelectedTime] = useState(new Date());
  const [duration, setDuration] = useState(2);
  const [players, setPlayers] = useState(10);
  const [isFavorite, setIsFavorite] = useState(false);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  // Confirmation dialog state
  const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);
  const [bookingData, setBookingData] = useState(null);

  // Mock field data
  const [field, setField] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Load mock field data
    const loadField = async () => {
      setLoading(true);
      try {
        // Simulate loading delay
        await new Promise((resolve) => setTimeout(resolve, 1000));

        // Create mock field data based on the ID
        const mockField = {
          id: parseInt(id),
          name: `Field ${id}`,
          location: "Central City, 123 Main St",
          description:
            "A premium football field with excellent facilities, perfect for both casual games and competitive matches.",
          hourlyRate: 50,
          capacity: 22,
          rating: 4.8,
          reviewCount: 124,
          images: [
            `https://source.unsplash.com/random/800x600/?football,stadium,${id}`,
            `https://source.unsplash.com/random/800x600/?soccer,field,${id}`,
            `https://source.unsplash.com/random/800x600/?football,pitch,${id}`,
            `https://source.unsplash.com/random/800x600/?stadium,grass,${id}`,
          ],
          amenities: [
            { name: "Changing Rooms", icon: <ShowerIcon /> },
            { name: "Parking", icon: <LocalParkingIcon /> },
            { name: "WiFi", icon: <WifiIcon /> },
            { name: "Cafeteria", icon: <RestaurantIcon /> },
          ],
          availabilityHours: "08:00-22:00",
          reviews: [
            {
              id: 1,
              user: "John Smith",
              avatar: "https://randomuser.me/api/portraits/men/32.jpg",
              rating: 5,
              date: "2023-05-15",
              comment:
                "Excellent field with great facilities. The turf is well-maintained and the staff is very helpful.",
            },
            {
              id: 2,
              user: "Sarah Johnson",
              avatar: "https://randomuser.me/api/portraits/women/44.jpg",
              rating: 4,
              date: "2023-04-28",
              comment:
                "Good field, but the changing rooms could be cleaner. Otherwise, a great experience.",
            },
          ],
          nearbyFields: [
            {
              id: 2,
              name: "Riverside Field",
              image: `https://source.unsplash.com/random/400x300/?football,2`,
              location: "Riverside District",
              price: "$45/hour",
            },
            {
              id: 3,
              name: "Green Valley Pitch",
              image: `https://source.unsplash.com/random/400x300/?soccer,3`,
              location: "Green Valley",
              price: "$55/hour",
            },
          ],
        };

        setField(mockField);
      } catch (error) {
        console.error("Error loading field:", error);
      } finally {
        setLoading(false);
      }
    };

    loadField();
  }, [id]);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const handleFavoriteToggle = () => {
    setIsFavorite(!isFavorite);
    setSnackbar({
      open: true,
      message: isFavorite ? "Removed from favorites" : "Added to favorites",
      severity: "success",
    });
  };

  const handleShare = () => {
    // In a real app, you would implement sharing functionality
    navigator.clipboard.writeText(window.location.href);
    setSnackbar({
      open: true,
      message: "Link copied to clipboard",
      severity: "success",
    });
  };

  const handleBookNow = () => {
    // Navigate to the booking page for this field
    navigate(`/fields/${field.id}/booking`);
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

  if (loading) {
    return (
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          gap: 2,
        }}
      >
        <CircularProgress size={60} />
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
          to="/fields"
          startIcon={<ArrowBackIcon />}
          sx={{ mb: 3 }}
        >
          Back to Fields
        </Button>

        {/* Field Header */}
        <Grid container spacing={3}>
          <Grid item xs={12} md={8}>
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
                {field.name}
              </Typography>

              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  mb: 2,
                  flexWrap: "wrap",
                  gap: 1,
                }}
              >
                <Box sx={{ display: "flex", alignItems: "center", mr: 2 }}>
                  <LocationOnIcon color="primary" sx={{ mr: 0.5 }} />
                  <Typography variant="body1" color="text.secondary">
                    {field.location}
                  </Typography>
                </Box>

                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <Rating
                    value={field.rating}
                    precision={0.1}
                    readOnly
                    size="small"
                    sx={{ mr: 1 }}
                  />
                  <Typography variant="body2" color="text.secondary">
                    {field.rating} ({field.reviewCount} reviews)
                  </Typography>
                </Box>
              </Box>
            </motion.div>
          </Grid>

          <Grid
            item
            xs={12}
            md={4}
            sx={{
              display: "flex",
              justifyContent: { xs: "flex-start", md: "flex-end" },
              alignItems: "center",
            }}
          >
            <Box sx={{ display: "flex", gap: 1 }}>
              <IconButton
                onClick={handleFavoriteToggle}
                sx={{
                  color: isFavorite ? "error.main" : "action.active",
                  bgcolor: "background.paper",
                  boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
                  "&:hover": { bgcolor: "background.paper" },
                }}
              >
                {isFavorite ? <FavoriteIcon /> : <FavoriteBorderIcon />}
              </IconButton>

              <IconButton
                onClick={handleShare}
                sx={{
                  bgcolor: "background.paper",
                  boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
                  "&:hover": { bgcolor: "background.paper" },
                }}
              >
                <ShareIcon />
              </IconButton>

              <Button
                variant="contained"
                color="primary"
                size="large"
                onClick={() => setTabValue(1)}
                sx={{ ml: 1 }}
              >
                Book Now
              </Button>
            </Box>
          </Grid>
        </Grid>

        {/* Field Images */}
        <Box sx={{ my: 4 }}>
          <ImageList
            sx={{
              width: "100%",
              height: 450,
              borderRadius: 2,
              overflow: "hidden",
              "& .MuiImageListItem-root": {
                overflow: "hidden",
              },
            }}
            variant="quilted"
            cols={4}
            rowHeight={225}
          >
            {field.images.map((image, index) => (
              <ImageListItem
                key={index}
                cols={index === 0 ? 2 : 1}
                rows={index === 0 ? 2 : 1}
              >
                <img
                  src={image}
                  alt={`${field.name} - Image ${index + 1}`}
                  loading="lazy"
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    transition: "transform 0.3s ease",
                    "&:hover": {
                      transform: "scale(1.05)",
                    },
                  }}
                />
              </ImageListItem>
            ))}
          </ImageList>
        </Box>

        {/* Field Details and Booking Form */}
        <Grid container spacing={4}>
          <Grid item xs={12} md={8}>
            <Paper elevation={2} sx={{ borderRadius: 3, overflow: "hidden" }}>
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
                <Tab label="Details" icon={<InfoIcon />} iconPosition="start" />
                <Tab
                  label="Book"
                  icon={<EventAvailableIcon />}
                  iconPosition="start"
                />
                <Tab label="Reviews" icon={<StarIcon />} iconPosition="start" />
              </Tabs>

              <Box sx={{ p: 4 }}>
                {/* Details Tab */}
                {tabValue === 0 && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5 }}
                  >
                    <Typography
                      variant="h5"
                      component="h2"
                      sx={{ fontWeight: 600, mb: 3 }}
                    >
                      About this field
                    </Typography>

                    <Typography variant="body1" paragraph>
                      {field.description}
                    </Typography>

                    <Grid container spacing={4} sx={{ mt: 2 }}>
                      <Grid item xs={12} sm={6}>
                        <Typography
                          variant="h6"
                          sx={{ fontWeight: 600, mb: 2 }}
                        >
                          Field Information
                        </Typography>

                        <List disablePadding>
                          <ListItem sx={{ px: 0, py: 1 }}>
                            <ListItemIcon sx={{ minWidth: 40 }}>
                              <PeopleIcon color="primary" />
                            </ListItemIcon>
                            <ListItemText
                              primary="Capacity"
                              secondary={`${field.capacity} players`}
                            />
                          </ListItem>

                          <ListItem sx={{ px: 0, py: 1 }}>
                            <ListItemIcon sx={{ minWidth: 40 }}>
                              <AttachMoneyIcon color="primary" />
                            </ListItemIcon>
                            <ListItemText
                              primary="Hourly Rate"
                              secondary={`$${field.hourlyRate} per hour`}
                            />
                          </ListItem>

                          <ListItem sx={{ px: 0, py: 1 }}>
                            <ListItemIcon sx={{ minWidth: 40 }}>
                              <AccessTimeIcon color="primary" />
                            </ListItemIcon>
                            <ListItemText
                              primary="Availability Hours"
                              secondary={field.availabilityHours}
                            />
                          </ListItem>
                        </List>
                      </Grid>

                      <Grid item xs={12} sm={6}>
                        <Typography
                          variant="h6"
                          sx={{ fontWeight: 600, mb: 2 }}
                        >
                          Amenities
                        </Typography>

                        <Grid container spacing={2}>
                          {field.amenities.map((amenity, index) => (
                            <Grid item xs={6} key={index}>
                              <Box
                                sx={{ display: "flex", alignItems: "center" }}
                              >
                                <Box
                                  sx={{
                                    mr: 1,
                                    color: "primary.main",
                                  }}
                                >
                                  {amenity.icon}
                                </Box>
                                <Typography variant="body1">
                                  {amenity.name}
                                </Typography>
                              </Box>
                            </Grid>
                          ))}
                        </Grid>
                      </Grid>
                    </Grid>
                  </motion.div>
                )}

                {/* Booking Tab */}
                {tabValue === 1 && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5 }}
                  >
                    <Typography
                      variant="h5"
                      component="h2"
                      sx={{ fontWeight: 600, mb: 3 }}
                    >
                      Book this field
                    </Typography>

                    <Box sx={{ textAlign: "center", py: 4 }}>
                      <Typography variant="h6" gutterBottom>
                        Ready to book {field.name}?
                      </Typography>
                      <Typography
                        variant="body1"
                        color="text.secondary"
                        sx={{ mb: 4 }}
                      >
                        Click below to proceed to the booking page where you can
                        select your preferred date, time, and other details.
                      </Typography>

                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "center",
                          mb: 4,
                        }}
                      >
                        <Box
                          sx={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            mx: 2,
                          }}
                        >
                          <Typography
                            variant="h4"
                            color="primary.main"
                            fontWeight={700}
                          >
                            ${field.hourlyRate}
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            per hour
                          </Typography>
                        </Box>
                      </Box>

                      <Button
                        variant="contained"
                        color="primary"
                        size="large"
                        onClick={handleBookNow}
                        sx={{ px: 6, py: 1.5 }}
                      >
                        Proceed to Booking
                      </Button>
                    </Box>
                  </motion.div>
                )}

                {/* Reviews Tab */}
                {tabValue === 2 && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5 }}
                  >
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        mb: 3,
                      }}
                    >
                      <Typography
                        variant="h5"
                        component="h2"
                        sx={{ fontWeight: 600 }}
                      >
                        Reviews
                      </Typography>

                      <Box sx={{ display: "flex", alignItems: "center" }}>
                        <Rating
                          value={field.rating}
                          precision={0.1}
                          readOnly
                          sx={{ mr: 1 }}
                        />
                        <Typography variant="h6" fontWeight={600}>
                          {field.rating}
                        </Typography>
                        <Typography
                          variant="body2"
                          color="text.secondary"
                          sx={{ ml: 1 }}
                        >
                          ({field.reviewCount} reviews)
                        </Typography>
                      </Box>
                    </Box>

                    <Divider sx={{ mb: 3 }} />

                    {field.reviews.map((review, index) => (
                      <React.Fragment key={review.id}>
                        <Box sx={{ mb: 3 }}>
                          <Box
                            sx={{ display: "flex", alignItems: "flex-start" }}
                          >
                            <Avatar src={review.avatar} sx={{ mr: 2 }} />
                            <Box sx={{ flexGrow: 1 }}>
                              <Box
                                sx={{
                                  display: "flex",
                                  justifyContent: "space-between",
                                  alignItems: "center",
                                  mb: 1,
                                }}
                              >
                                <Typography
                                  variant="subtitle1"
                                  fontWeight={600}
                                >
                                  {review.user}
                                </Typography>
                                <Typography
                                  variant="body2"
                                  color="text.secondary"
                                >
                                  {review.date}
                                </Typography>
                              </Box>
                              <Rating
                                value={review.rating}
                                readOnly
                                size="small"
                                sx={{ mb: 1 }}
                              />
                              <Typography variant="body1">
                                {review.comment}
                              </Typography>
                            </Box>
                          </Box>
                        </Box>
                        {index < field.reviews.length - 1 && (
                          <Divider sx={{ mb: 3 }} />
                        )}
                      </React.Fragment>
                    ))}

                    <Box sx={{ mt: 4, textAlign: "center" }}>
                      <Button variant="outlined" color="primary">
                        View All Reviews
                      </Button>
                    </Box>
                  </motion.div>
                )}
              </Box>
            </Paper>

            {/* Nearby Fields */}
            <Box sx={{ mt: 4 }}>
              <Typography
                variant="h5"
                component="h2"
                sx={{ fontWeight: 600, mb: 3 }}
              >
                Nearby Fields
              </Typography>

              <Grid container spacing={3}>
                {field.nearbyFields.map((nearbyField) => (
                  <Grid item xs={12} sm={6} key={nearbyField.id}>
                    <Card
                      component={Link}
                      to={`/fields/${nearbyField.id}`}
                      sx={{
                        display: "flex",
                        height: "100%",
                        textDecoration: "none",
                        borderRadius: 3,
                        overflow: "hidden",
                        transition: "transform 0.3s ease, box-shadow 0.3s ease",
                        "&:hover": {
                          transform: "translateY(-5px)",
                          boxShadow: "0 10px 30px rgba(0, 0, 0, 0.1)",
                        },
                      }}
                    >
                      <Box sx={{ width: 120, flexShrink: 0 }}>
                        <img
                          src={nearbyField.image}
                          alt={nearbyField.name}
                          style={{
                            width: "100%",
                            height: "100%",
                            objectFit: "cover",
                          }}
                        />
                      </Box>
                      <CardContent sx={{ flexGrow: 1, p: 2 }}>
                        <Typography
                          variant="h6"
                          component="div"
                          sx={{ fontWeight: 600, mb: 0.5 }}
                        >
                          {nearbyField.name}
                        </Typography>
                        <Box
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            mb: 0.5,
                          }}
                        >
                          <LocationOnIcon
                            fontSize="small"
                            color="primary"
                            sx={{ mr: 0.5 }}
                          />
                          <Typography variant="body2" color="text.secondary">
                            {nearbyField.location}
                          </Typography>
                        </Box>
                        <Typography
                          variant="body2"
                          color="primary.main"
                          fontWeight={600}
                        >
                          {nearbyField.price}
                        </Typography>
                      </CardContent>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            </Box>
          </Grid>

          {/* Sidebar */}
          <Grid item xs={12} md={4}>
            {/* Quick Booking Card */}
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
                Quick Booking
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

              <Button
                variant="contained"
                color="primary"
                size="large"
                fullWidth
                onClick={handleBookNow}
                sx={{ mb: 2 }}
              >
                Book Now
              </Button>

              <Button
                variant="outlined"
                fullWidth
                onClick={() => window.open(`tel:+1234567890`)}
              >
                Contact Field Owner
              </Button>
            </Paper>
          </Grid>
        </Grid>
      </Container>

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
    </Box>
  );
};

export default FieldDetail;
