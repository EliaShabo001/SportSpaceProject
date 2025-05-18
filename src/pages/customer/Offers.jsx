import React from "react";
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Button,
  Chip,
  useTheme,
  Paper,
} from "@mui/material";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";
import EventIcon from "@mui/icons-material/Event";

const Offers = () => {
  const theme = useTheme();

  // Mock offers data
  const offers = [
    {
      id: 1,
      title: "Early Bird Special",
      description:
        "Book any field before 10 AM and get 25% off the regular price. Perfect for morning practice sessions!",
      image: "https://source.unsplash.com/random/600x400/?football,morning",
      discount: "25% OFF",
      validUntil: "December 31, 2023",
      code: "EARLYBIRD25",
      fields: ["All Fields"],
    },
    {
      id: 2,
      title: "Weekend Package",
      description:
        "Book a field for 3 hours on Saturday or Sunday and pay for only 2 hours. Bring your team for an extended weekend session!",
      image: "https://source.unsplash.com/random/600x400/?football,weekend",
      discount: "3 for 2",
      validUntil: "November 30, 2023",
      code: "WEEKEND3FOR2",
      fields: ["Downtown Stadium", "Riverside Field"],
    },
    {
      id: 3,
      title: "Group Discount",
      description:
        "Book for a group of 15 or more players and receive a 15% discount on any field. Great for tournaments and large team practices!",
      image: "https://source.unsplash.com/random/600x400/?football,team",
      discount: "15% OFF",
      validUntil: "January 15, 2024",
      code: "GROUP15",
      fields: ["All Fields"],
    },
    {
      id: 4,
      title: "Midweek Madness",
      description:
        "Book any field on Tuesday or Wednesday and get 20% off. Perfect for midweek training sessions!",
      image: "https://source.unsplash.com/random/600x400/?football,training",
      discount: "20% OFF",
      validUntil: "December 15, 2023",
      code: "MIDWEEK20",
      fields: ["All Fields"],
    },
  ];

  // Hero section animation variants
  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
      },
    },
  };

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
      },
    },
  };

  return (
    <>
      {/* Hero Section */}
      <Box
        sx={{
          pt: 15,
          pb: 10,
          bgcolor: "secondary.main",
          color: "white",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <Container maxWidth="lg" sx={{ position: "relative", zIndex: 1 }}>
          <motion.div
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
          >
            <motion.div variants={fadeIn}>
              <Typography
                variant="h1"
                component="h1"
                sx={{
                  fontWeight: 700,
                  mb: 2,
                  fontSize: { xs: "2.5rem", md: "3.5rem" },
                  textAlign: "center",
                }}
              >
                Special{" "}
                <span style={{ color: theme.palette.primary.main }}>
                  Offers
                </span>
              </Typography>
            </motion.div>
            <motion.div variants={fadeIn}>
              <Typography
                variant="h5"
                sx={{
                  mb: 4,
                  maxWidth: 800,
                  mx: "auto",
                  textAlign: "center",
                  opacity: 0.9,
                }}
              >
                Take advantage of our limited-time promotions and discounts on
                football field bookings
              </Typography>
            </motion.div>
          </motion.div>
        </Container>
      </Box>

      {/* Offers Section */}
      <Container maxWidth="lg" sx={{ my: 10 }}>
        <Grid container spacing={4}>
          {offers.map((offer, index) => (
            <Grid item xs={12} md={6} key={offer.id}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    height: "100%",
                    borderRadius: 3,
                    overflow: "hidden",
                    transition: "transform 0.3s ease, box-shadow 0.3s ease",
                    "&:hover": {
                      transform: "translateY(-10px)",
                      boxShadow: "0 10px 30px rgba(0, 0, 0, 0.15)",
                    },
                  }}
                >
                  <Box sx={{ position: "relative" }}>
                    <CardMedia
                      component="img"
                      height="240"
                      image={offer.image}
                      alt={offer.title}
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
                        label={offer.discount}
                        color="primary"
                        sx={{
                          fontWeight: 700,
                          fontSize: "1rem",
                          py: 2,
                          px: 1,
                        }}
                      />
                    </Box>
                  </Box>
                  <CardContent sx={{ flexGrow: 1, p: 3 }}>
                    <Typography
                      gutterBottom
                      variant="h5"
                      component="h2"
                      sx={{ fontWeight: 700, mb: 2 }}
                    >
                      {offer.title}
                    </Typography>
                    <Typography
                      variant="body1"
                      color="text.secondary"
                      sx={{ mb: 3 }}
                    >
                      {offer.description}
                    </Typography>
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        mb: 1,
                      }}
                    >
                      <EventIcon
                        sx={{ color: "text.secondary", mr: 1, fontSize: 20 }}
                      />
                      <Typography variant="body2" color="text.secondary">
                        Valid until: {offer.validUntil}
                      </Typography>
                    </Box>
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        mb: 1,
                      }}
                    >
                      <LocalOfferIcon
                        sx={{ color: "text.secondary", mr: 1, fontSize: 20 }}
                      />
                      <Typography variant="body2" color="text.secondary">
                        Promo code: <strong>{offer.code}</strong>
                      </Typography>
                    </Box>
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "flex-start",
                        mb: 3,
                      }}
                    >
                      <AccessTimeIcon
                        sx={{
                          color: "text.secondary",
                          mr: 1,
                          fontSize: 20,
                          mt: 0.5,
                        }}
                      />
                      <Typography variant="body2" color="text.secondary">
                        Applicable to: {offer.fields.join(", ")}
                      </Typography>
                    </Box>
                    <Button
                      component={Link}
                      to="/fields"
                      variant="contained"
                      color="primary"
                      fullWidth
                      size="large"
                    >
                      Book Now
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* CTA Section */}
      <Box
        sx={{
          py: 10,
          bgcolor: "secondary.main",
          color: "white",
          position: "relative",
        }}
      >
        <Container maxWidth="md">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <Paper
              elevation={0}
              sx={{
                p: 4,
                borderRadius: 3,
                bgcolor: "rgba(255, 255, 255, 0.05)",
                backdropFilter: "blur(10px)",
                border: "1px solid rgba(255, 255, 255, 0.1)",
              }}
            >
              <Box sx={{ textAlign: "center" }}>
                <Typography
                  variant="h4"
                  component="h2"
                  sx={{ fontWeight: 700, mb: 2 }}
                >
                  Subscribe for Exclusive Offers
                </Typography>
                <Typography
                  variant="body1"
                  sx={{ mb: 4, maxWidth: 600, mx: "auto" }}
                >
                  Sign up for our newsletter to receive exclusive offers and
                  promotions directly to your inbox.
                </Typography>
                <Button
                  component={Link}
                  to="/contact"
                  variant="contained"
                  color="primary"
                  size="large"
                  sx={{ px: 4, py: 1.5 }}
                >
                  Subscribe Now
                </Button>
              </Box>
            </Paper>
          </motion.div>
        </Container>
      </Box>
    </>
  );
};

export default Offers;
