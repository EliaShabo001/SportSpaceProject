import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  Box,
  Container,
  Typography,
  Button,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Stack,
  Paper,
  useTheme,
  Avatar,
  IconButton,
  Divider,
  Rating,
  Tabs,
  Tab,
  useMediaQuery,
  TextField,
  FormControlLabel,
  Checkbox,
} from "@mui/material";
import { motion } from "framer-motion";
import SearchIcon from "@mui/icons-material/Search";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import PaymentIcon from "@mui/icons-material/Payment";
import SportsSoccerIcon from "@mui/icons-material/SportsSoccer";
import StarIcon from "@mui/icons-material/Star";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import FormatQuoteIcon from "@mui/icons-material/FormatQuote";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import GroupIcon from "@mui/icons-material/Group";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import PublicIcon from "@mui/icons-material/Public";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

// Use a night football field image for more dramatic effect
const heroImage =
  "https://plus.unsplash.com/premium_photo-1664304605904-d0aa3a50a5b7?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3";

// Animation variants
const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const Home = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [activeTestimonialIndex, setActiveTestimonialIndex] = useState(0);
  const [statsTab, setStatsTab] = useState(0);

  // Featured fields data (mock)
  const featuredFields = [
    {
      id: 1,
      name: "Downtown Stadium",
      image: "https://source.unsplash.com/random/600x400/?football,stadium",
      location: "Central City",
      rating: 4.8,
      price: "$50/hour",
    },
    {
      id: 2,
      name: "Riverside Field",
      image: "https://source.unsplash.com/random/600x400/?soccer,field",
      location: "Riverside District",
      rating: 4.6,
      price: "$45/hour",
    },
    {
      id: 3,
      name: "Green Valley Pitch",
      image: "https://source.unsplash.com/random/600x400/?football,pitch",
      location: "Green Valley",
      rating: 4.9,
      price: "$55/hour",
    },
  ];

  // Testimonials data
  const testimonials = [
    {
      id: 1,
      name: "John Smith",
      role: "Team Captain",
      avatar: "https://randomuser.me/api/portraits/men/32.jpg",
      quote:
        "SportSpace has completely transformed how we book fields for our weekly games. The platform is intuitive, and we can easily find available slots that work for everyone's schedule.",
      rating: 5,
    },
    {
      id: 2,
      name: "Sarah Johnson",
      role: "League Organizer",
      avatar: "https://randomuser.me/api/portraits/women/44.jpg",
      quote:
        "As someone who organizes multiple games per week, SportSpace has been a game-changer. The ability to book multiple fields at once and manage all reservations in one place saves me hours of work.",
      rating: 4.5,
    },
    {
      id: 3,
      name: "Michael Rodriguez",
      role: "Football Coach",
      avatar: "https://randomuser.me/api/portraits/men/67.jpg",
      quote:
        "I've been coaching youth football for over 10 years, and finding reliable fields was always a challenge until I discovered SportSpace. Now I can focus on coaching instead of logistics.",
      rating: 5,
    },
  ];

  // Statistics data
  const statistics = [
    {
      label: "Users",
      value: "25,000+",
      icon: <GroupIcon sx={{ fontSize: 40, color: "primary.main" }} />,
      description: "Active players and teams using our platform",
    },
    {
      label: "Fields",
      value: "1,200+",
      icon: <SportsSoccerIcon sx={{ fontSize: 40, color: "primary.main" }} />,
      description: "Football fields available for booking",
    },
    {
      label: "Bookings",
      value: "150,000+",
      icon: <EmojiEventsIcon sx={{ fontSize: 40, color: "primary.main" }} />,
      description: "Successful bookings completed",
    },
    {
      label: "Cities",
      value: "50+",
      icon: <PublicIcon sx={{ fontSize: 40, color: "primary.main" }} />,
      description: "Cities where our service is available",
    },
  ];

  const handlePrevTestimonial = () => {
    setActiveTestimonialIndex((prev) =>
      prev === 0 ? testimonials.length - 1 : prev - 1
    );
  };

  const handleNextTestimonial = () => {
    setActiveTestimonialIndex((prev) =>
      prev === testimonials.length - 1 ? 0 : prev + 1
    );
  };

  const handleStatsTabChange = (event, newValue) => {
    setStatsTab(newValue);
  };

  // Features data
  const features = [
    {
      icon: <SearchIcon sx={{ fontSize: 40, color: "primary.main" }} />,
      title: "Easy Search",
      description:
        "Find the perfect field in your area with our advanced search filters.",
    },
    {
      icon: <AccessTimeIcon sx={{ fontSize: 40, color: "primary.main" }} />,
      title: "Quick Booking",
      description:
        "Book your field in minutes with our streamlined reservation process.",
    },
    {
      icon: <PaymentIcon sx={{ fontSize: 40, color: "primary.main" }} />,
      title: "Secure Payment",
      description:
        "Pay securely online with multiple payment options available.",
    },
  ];

  // How it works steps
  const steps = [
    {
      number: "01",
      title: "Find a Field",
      description:
        "Search for fields based on location, availability, and amenities.",
    },
    {
      number: "02",
      title: "Book Your Slot",
      description:
        "Select your preferred date and time slot for your game or practice.",
    },
    {
      number: "03",
      title: "Play & Enjoy",
      description:
        "Arrive at the field, play your game, and leave a review afterward.",
    },
  ];

  return (
    <>
      {/* Hero Section */}
      <Box
        sx={{
          height: "100vh",
          minHeight: "600px",
          position: "relative",
          display: "flex",
          alignItems: "center",
          color: "white",
          overflow: "hidden",
          "&::before": {
            content: '""',
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundImage: `url(${heroImage})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            filter: "brightness(0.3)",
            zIndex: -1,
          },
          "&::after": {
            content: '""',
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            background:
              "linear-gradient(to bottom, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.4) 100%)",
            zIndex: -1,
          },
        }}
      >
        <Container maxWidth="lg">
          <Grid container spacing={2}>
            <Grid item xs={12} md={8} lg={6}>
              <motion.div
                initial="hidden"
                animate="visible"
                variants={staggerContainer}
              >
                <motion.div variants={fadeIn}>
                  <Typography
                    variant="h1"
                    sx={{
                      fontWeight: 700,
                      mb: 2,
                      fontSize: { xs: "2.5rem", md: "3.5rem" },
                    }}
                  >
                    Find & Book Football Fields Near You
                  </Typography>
                </motion.div>
                <motion.div variants={fadeIn}>
                  <Typography
                    variant="h5"
                    sx={{
                      mb: 4,
                      fontWeight: 400,
                      opacity: 0.9,
                    }}
                  >
                    The easiest way to reserve football fields for your games,
                    practices, and events.
                  </Typography>
                </motion.div>
                <motion.div variants={fadeIn}>
                  <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
                    <Button
                      component={Link}
                      to="/fields"
                      variant="contained"
                      color="primary"
                      size="large"
                      sx={{ px: 4, py: 1.5 }}
                    >
                      Browse Fields
                    </Button>
                    <Button
                      component={Link}
                      to="/register"
                      variant="outlined"
                      size="large"
                      sx={{
                        px: 4,
                        py: 1.5,
                        color: "white",
                        borderColor: "white",
                        "&:hover": {
                          borderColor: "primary.main",
                          backgroundColor: "rgba(255, 106, 0, 0.1)",
                        },
                      }}
                    >
                      Register Now
                    </Button>
                  </Stack>
                </motion.div>
              </motion.div>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Features Section */}
      <Box sx={{ py: 10, bgcolor: "background.default" }}>
        <Container maxWidth="lg">
          <Box sx={{ textAlign: "center", mb: 8 }}>
            <Typography
              variant="h2"
              component="h2"
              sx={{ fontWeight: 700, mb: 2 }}
            >
              Why Choose{" "}
              <span style={{ color: theme.palette.primary.main }}>
                SportSpace
              </span>
            </Typography>
            <Typography
              variant="h6"
              sx={{ maxWidth: "700px", mx: "auto", color: "text.secondary" }}
            >
              We make it easy to find and book football fields, so you can focus
              on the game.
            </Typography>
          </Box>

          <Grid container spacing={4}>
            {features.map((feature, index) => (
              <Grid item xs={12} md={4} key={index}>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Paper
                    elevation={2}
                    sx={{
                      p: 4,
                      height: "100%",
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      textAlign: "center",
                      borderRadius: 3,
                      transition: "transform 0.3s ease, box-shadow 0.3s ease",
                      "&:hover": {
                        transform: "translateY(-10px)",
                        boxShadow: "0 10px 30px rgba(0, 0, 0, 0.1)",
                      },
                    }}
                  >
                    <Box sx={{ mb: 2 }}>{feature.icon}</Box>
                    <Typography
                      variant="h5"
                      component="h3"
                      sx={{ mb: 2, fontWeight: 600 }}
                    >
                      {feature.title}
                    </Typography>
                    <Typography variant="body1" color="text.secondary">
                      {feature.description}
                    </Typography>
                  </Paper>
                </motion.div>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Featured Fields Section */}
      <Box sx={{ py: 10, bgcolor: "background.paper" }}>
        <Container maxWidth="lg">
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              mb: 6,
            }}
          >
            <Typography variant="h2" component="h2" sx={{ fontWeight: 700 }}>
              Featured Fields
            </Typography>
            <Button
              component={Link}
              to="/fields"
              variant="outlined"
              color="primary"
              sx={{ display: { xs: "none", md: "block" } }}
            >
              View All Fields
            </Button>
          </Box>

          <Grid container spacing={4}>
            {featuredFields.map((field, index) => (
              <Grid item xs={12} sm={6} md={4} key={field.id}>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Card
                    sx={{
                      height: "100%",
                      display: "flex",
                      flexDirection: "column",
                      borderRadius: 3,
                      overflow: "hidden",
                      transition: "transform 0.3s ease, box-shadow 0.3s ease",
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
                      <Typography
                        gutterBottom
                        variant="h5"
                        component="h3"
                        sx={{ fontWeight: 600 }}
                      >
                        {field.name}
                      </Typography>
                      <Box
                        sx={{ display: "flex", alignItems: "center", mb: 1 }}
                      >
                        <LocationOnIcon
                          sx={{
                            color: "text.secondary",
                            mr: 0.5,
                            fontSize: 20,
                          }}
                        />
                        <Typography variant="body2" color="text.secondary">
                          {field.location}
                        </Typography>
                      </Box>
                      <Box
                        sx={{ display: "flex", alignItems: "center", mb: 2 }}
                      >
                        <StarIcon
                          sx={{
                            color: theme.palette.primary.main,
                            mr: 0.5,
                            fontSize: 20,
                          }}
                        />
                        <Typography variant="body2" sx={{ fontWeight: 500 }}>
                          {field.rating}
                        </Typography>
                      </Box>
                      <Box sx={{ mt: 2 }}>
                        <Typography
                          variant="h6"
                          color="primary.main"
                          sx={{ fontWeight: 600, mb: 1.5 }}
                        >
                          {field.price}
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
                            size="medium"
                            fullWidth
                          >
                            Details
                          </Button>
                          <Button
                            component={Link}
                            to={`/fields/${field.id}/booking`}
                            variant="contained"
                            color="primary"
                            size="medium"
                            fullWidth
                          >
                            Book Now
                          </Button>
                        </Box>
                      </Box>
                    </CardContent>
                  </Card>
                </motion.div>
              </Grid>
            ))}
          </Grid>

          <Box
            sx={{
              mt: 4,
              display: { xs: "flex", md: "none" },
              justifyContent: "center",
            }}
          >
            <Button
              component={Link}
              to="/fields"
              variant="contained"
              color="primary"
            >
              View All Fields
            </Button>
          </Box>
        </Container>
      </Box>

      {/* How It Works Section */}
      <Box sx={{ py: 10, bgcolor: "secondary.main", color: "white" }}>
        <Container maxWidth="lg">
          <Box sx={{ textAlign: "center", mb: 8 }}>
            <Typography
              variant="h2"
              component="h2"
              sx={{ fontWeight: 700, mb: 2 }}
            >
              How It Works
            </Typography>
            <Typography
              variant="h6"
              sx={{ maxWidth: "700px", mx: "auto", opacity: 0.8 }}
            >
              Book your football field in three simple steps
            </Typography>
          </Box>

          <Grid container spacing={4}>
            {steps.map((step, index) => (
              <Grid item xs={12} md={4} key={index}>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Box
                    sx={{
                      position: "relative",
                      p: 4,
                      height: "100%",
                      borderRadius: 3,
                      bgcolor: "rgba(255, 255, 255, 0.05)",
                      transition: "transform 0.3s ease",
                      "&:hover": {
                        transform: "translateY(-10px)",
                        bgcolor: "rgba(255, 255, 255, 0.1)",
                      },
                    }}
                  >
                    <Typography
                      variant="h1"
                      sx={{
                        position: "absolute",
                        top: -20,
                        right: 20,
                        fontWeight: 800,
                        fontSize: "5rem",
                        color: "rgba(255, 255, 255, 0.1)",
                        zIndex: 0,
                      }}
                    >
                      {step.number}
                    </Typography>
                    <Box sx={{ position: "relative", zIndex: 1 }}>
                      <Typography
                        variant="h4"
                        component="h3"
                        sx={{
                          mb: 2,
                          fontWeight: 600,
                          color: theme.palette.primary.main,
                        }}
                      >
                        {step.title}
                      </Typography>
                      <Typography variant="body1" sx={{ opacity: 0.8 }}>
                        {step.description}
                      </Typography>
                    </Box>
                  </Box>
                </motion.div>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Statistics Section */}
      <Box sx={{ py: 10, bgcolor: "background.default" }}>
        <Container maxWidth="lg">
          <Box sx={{ textAlign: "center", mb: 6 }}>
            <Typography
              variant="h2"
              component="h2"
              sx={{ fontWeight: 700, mb: 2 }}
            >
              SportSpace{" "}
              <span style={{ color: theme.palette.primary.main }}>
                in Numbers
              </span>
            </Typography>
            <Typography
              variant="h6"
              sx={{
                maxWidth: "700px",
                mx: "auto",
                color: "text.secondary",
                mb: 4,
              }}
            >
              Join thousands of players and field owners on the leading football
              field booking platform
            </Typography>

            <Tabs
              value={statsTab}
              onChange={handleStatsTabChange}
              centered
              sx={{
                mb: 4,
                "& .MuiTabs-indicator": {
                  backgroundColor: "primary.main",
                },
                "& .MuiTab-root": {
                  fontWeight: 600,
                  fontSize: "1rem",
                  textTransform: "none",
                  minWidth: 100,
                },
                "& .Mui-selected": {
                  color: "primary.main",
                },
              }}
            >
              <Tab label="Global" />
              <Tab label="Monthly" />
              <Tab label="Growth" />
            </Tabs>
          </Box>

          <Grid container spacing={4} justifyContent="center">
            {statistics.map((stat, index) => (
              <Grid item xs={6} md={3} key={index}>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Paper
                    elevation={2}
                    sx={{
                      p: 3,
                      height: "100%",
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      textAlign: "center",
                      borderRadius: 3,
                      transition: "transform 0.3s ease, box-shadow 0.3s ease",
                      "&:hover": {
                        transform: "translateY(-10px)",
                        boxShadow: "0 10px 30px rgba(0, 0, 0, 0.1)",
                      },
                    }}
                  >
                    <Box sx={{ mb: 2 }}>{stat.icon}</Box>
                    <Typography
                      variant="h3"
                      component="div"
                      sx={{ fontWeight: 700, mb: 1 }}
                    >
                      {stat.value}
                    </Typography>
                    <Typography
                      variant="h6"
                      component="div"
                      sx={{ mb: 1, fontWeight: 600 }}
                    >
                      {stat.label}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {stat.description}
                    </Typography>
                  </Paper>
                </motion.div>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Testimonials Section */}
      <Box sx={{ py: 10, bgcolor: "#121212", color: "white" }}>
        <Container maxWidth="lg">
          <Box sx={{ textAlign: "center", mb: 6 }}>
            <Typography
              variant="h2"
              component="h2"
              sx={{ fontWeight: 700, mb: 2, color: "white" }}
            >
              What Our Users Say
            </Typography>
            <Typography
              variant="h6"
              sx={{
                maxWidth: "700px",
                mx: "auto",
                color: "rgba(255, 255, 255, 0.7)",
              }}
            >
              Hear from players and organizers who use SportSpace every day
            </Typography>
          </Box>

          <Box sx={{ position: "relative", mt: 6 }}>
            <IconButton
              onClick={handlePrevTestimonial}
              sx={{
                position: "absolute",
                left: { xs: "50%", md: -20 },
                top: { xs: "auto", md: "50%" },
                bottom: { xs: -60, md: "auto" },
                transform: {
                  xs: "translateX(-60px) translateY(0)",
                  md: "translateX(0) translateY(-50%)",
                },
                bgcolor: "rgba(255, 255, 255, 0.1)",
                color: "white",
                boxShadow: "0 4px 12px rgba(0,0,0,0.3)",
                "&:hover": {
                  bgcolor: "rgba(255, 255, 255, 0.2)",
                },
                zIndex: 2,
              }}
            >
              <ArrowBackIosNewIcon fontSize="small" />
            </IconButton>

            <IconButton
              onClick={handleNextTestimonial}
              sx={{
                position: "absolute",
                right: { xs: "50%", md: -20 },
                top: { xs: "auto", md: "50%" },
                bottom: { xs: -60, md: "auto" },
                transform: {
                  xs: "translateX(60px) translateY(0)",
                  md: "translateX(0) translateY(-50%)",
                },
                bgcolor: "rgba(255, 255, 255, 0.1)",
                color: "white",
                boxShadow: "0 4px 12px rgba(0,0,0,0.3)",
                "&:hover": {
                  bgcolor: "rgba(255, 255, 255, 0.2)",
                },
                zIndex: 2,
              }}
            >
              <ArrowForwardIosIcon fontSize="small" />
            </IconButton>

            <motion.div
              key={activeTestimonialIndex}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Paper
                elevation={3}
                sx={{
                  p: { xs: 3, md: 5 },
                  borderRadius: 4,
                  position: "relative",
                  mb: { xs: 8, md: 4 },
                  bgcolor: "#1E1E1E",
                  color: "white",
                }}
              >
                <Box
                  sx={{
                    position: "absolute",
                    top: 30,
                    left: 30,
                    color: "rgba(255,255,255,0.1)",
                    transform: "scale(3)",
                    transformOrigin: "top left",
                  }}
                >
                  <FormatQuoteIcon sx={{ fontSize: 40 }} />
                </Box>

                <Box sx={{ position: "relative", zIndex: 1 }}>
                  <Typography
                    variant="body1"
                    sx={{
                      fontSize: "1.2rem",
                      fontStyle: "italic",
                      mb: 4,
                      mt: 2,
                      color: "white",
                      lineHeight: 1.6,
                    }}
                  >
                    "{testimonials[activeTestimonialIndex].quote}"
                  </Typography>

                  <Divider
                    sx={{ mb: 3, borderColor: "rgba(255,255,255,0.1)" }}
                  />

                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      flexWrap: "wrap",
                    }}
                  >
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                      <Avatar
                        src={testimonials[activeTestimonialIndex].avatar}
                        alt={testimonials[activeTestimonialIndex].name}
                        sx={{ width: 64, height: 64, mr: 2 }}
                      />
                      <Box>
                        <Typography
                          variant="h6"
                          sx={{ fontWeight: 600, color: "white" }}
                        >
                          {testimonials[activeTestimonialIndex].name}
                        </Typography>
                        <Typography
                          variant="body2"
                          color="rgba(255,255,255,0.7)"
                        >
                          {testimonials[activeTestimonialIndex].role}
                        </Typography>
                      </Box>
                    </Box>

                    <Rating
                      value={testimonials[activeTestimonialIndex].rating}
                      precision={0.5}
                      readOnly
                      sx={{ mt: { xs: 2, sm: 0 } }}
                    />
                  </Box>
                </Box>
              </Paper>
            </motion.div>

            <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
              {testimonials.map((_, index) => (
                <Box
                  key={index}
                  onClick={() => setActiveTestimonialIndex(index)}
                  sx={{
                    width: 12,
                    height: 12,
                    borderRadius: "50%",
                    mx: 0.5,
                    bgcolor:
                      index === activeTestimonialIndex
                        ? "primary.main"
                        : "rgba(255,255,255,0.3)",
                    cursor: "pointer",
                    transition: "all 0.3s ease",
                    "&:hover": {
                      bgcolor:
                        index === activeTestimonialIndex
                          ? "primary.main"
                          : "rgba(255,255,255,0.5)",
                    },
                  }}
                />
              ))}
            </Box>
          </Box>
        </Container>
      </Box>
    </>
  );
};

export default Home;
