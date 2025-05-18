import React, { useState } from "react";
import {
  Box,
  Container,
  Typography,
  Grid,
  Paper,
  TextField,
  Button,
  MenuItem,
  Snackbar,
  Alert,
  useTheme,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { motion } from "framer-motion";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import SendIcon from "@mui/icons-material/Send";

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

const Contact = () => {
  const theme = useTheme();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });
  const [errors, setErrors] = useState({});
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  // Contact information
  const contactInfo = [
    {
      icon: <EmailIcon color="primary" fontSize="large" />,
      title: "Email",
      details: "alishabo64686722@gmail.com",
      action: "mailto:alishabo64686722@gmail.com",
    },
    {
      icon: <PhoneIcon color="primary" fontSize="large" />,
      title: "Phone",
      details: "+1 (555) 123-4567",
      action: "tel:+15551234567",
    },
    {
      icon: <LocationOnIcon color="primary" fontSize="large" />,
      title: "Address",
      details: "123 Sports Avenue, New York, NY 10001",
      action:
        "https://maps.google.com/?q=123+Sports+Avenue,+New+York,+NY+10001",
    },
    {
      icon: <AccessTimeIcon color="primary" fontSize="large" />,
      title: "Business Hours",
      details: "Monday - Friday: 9AM - 6PM",
    },
  ];

  // Subject options for dropdown
  const subjectOptions = [
    "General Inquiry",
    "Field Booking Issue",
    "Account Support",
    "Payment Problem",
    "Partnership Opportunity",
    "Feedback",
    "Other",
  ];

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    // Clear error when user types
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: "",
      });
    }
  };

  // Validate form
  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(formData.email)
    ) {
      newErrors.email = "Invalid email address";
    }

    if (!formData.subject) {
      newErrors.subject = "Please select a subject";
    }

    if (!formData.message.trim()) {
      newErrors.message = "Message is required";
    } else if (formData.message.trim().length < 10) {
      newErrors.message = "Message must be at least 10 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    if (validateForm()) {
      // In a real app, you would send the form data to your backend here
      console.log("Form submitted:", formData);

      // Prepare email data for sending to alishabo64686722@gmail.com
      const emailData = {
        to: "alishabo64686722@gmail.com",
        subject: `SportSpace Contact Form: ${formData.subject}`,
        body: `
          Name: ${formData.name}
          Email: ${formData.email}
          Phone: ${formData.phone || "Not provided"}
          Subject: ${formData.subject}

          Message:
          ${formData.message}
        `,
      };

      console.log("Email data to be sent:", emailData);

      // Show success message
      setSnackbar({
        open: true,
        message:
          "Your message has been sent successfully! We will get back to you soon.",
        severity: "success",
      });

      // Reset form
      setFormData({
        name: "",
        email: "",
        phone: "",
        subject: "",
        message: "",
      });
    } else {
      // Show error message
      setSnackbar({
        open: true,
        message: "Please fix the errors in the form.",
        severity: "error",
      });
    }
  };

  // Handle snackbar close
  const handleSnackbarClose = () => {
    setSnackbar({
      ...snackbar,
      open: false,
    });
  };

  return (
    <Box sx={{ pt: 12, pb: 10 }}>
      {/* Hero Section */}
      <Box
        sx={{
          bgcolor: "secondary.main",
          color: "white",
          py: 10,
          position: "relative",
          overflow: "hidden",
          "&::after": {
            content: '""',
            position: "absolute",
            right: -100,
            bottom: -100,
            width: 400,
            height: 400,
            borderRadius: "50%",
            backgroundColor: "rgba(255, 106, 0, 0.1)",
            zIndex: 0,
          },
          "&::before": {
            content: '""',
            position: "absolute",
            left: -50,
            top: -50,
            width: 200,
            height: 200,
            borderRadius: "50%",
            backgroundColor: "rgba(255, 106, 0, 0.1)",
            zIndex: 0,
          },
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
                Contact{" "}
                <span style={{ color: theme.palette.primary.main }}>Us</span>
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
                Have questions or need assistance? We're here to help! Get in
                touch with our friendly support team.
              </Typography>
            </motion.div>
          </motion.div>
        </Container>
      </Box>

      {/* Contact Form and Info Section */}
      <Container maxWidth="lg" sx={{ my: 10 }}>
        <Grid container spacing={6}>
          {/* Contact Form */}
          <Grid item xs={12} md={7}>
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <Paper
                elevation={3}
                sx={{
                  p: 4,
                  borderRadius: 3,
                  height: "100%",
                }}
              >
                <Typography
                  variant="h4"
                  component="h2"
                  sx={{ fontWeight: 700, mb: 3 }}
                >
                  Send Us a Message
                </Typography>
                <Typography
                  variant="body1"
                  color="text.secondary"
                  sx={{ mb: 4 }}
                >
                  Fill out the form below and we'll get back to you as soon as
                  possible.
                </Typography>

                <form onSubmit={handleSubmit}>
                  <Grid container spacing={3}>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        label="Your Name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        error={!!errors.name}
                        helperText={errors.name}
                        required
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        label="Email Address"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        error={!!errors.email}
                        helperText={errors.email}
                        required
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        label="Phone Number (Optional)"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        select
                        label="Subject"
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        error={!!errors.subject}
                        helperText={errors.subject}
                        required
                      >
                        {subjectOptions.map((option) => (
                          <MenuItem key={option} value={option}>
                            {option}
                          </MenuItem>
                        ))}
                      </TextField>
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        fullWidth
                        multiline
                        rows={6}
                        label="Your Message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        error={!!errors.message}
                        helperText={errors.message}
                        required
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        size="large"
                        endIcon={<SendIcon />}
                        sx={{ px: 4, py: 1.5 }}
                      >
                        Send Message
                      </Button>
                    </Grid>
                  </Grid>
                </form>
              </Paper>
            </motion.div>
          </Grid>

          {/* Contact Information */}
          <Grid item xs={12} md={5}>
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <Paper
                elevation={3}
                sx={{
                  p: 4,
                  borderRadius: 3,
                  height: "100%",
                  bgcolor: "secondary.main",
                  color: "white",
                  position: "relative",
                  overflow: "hidden",
                  "&::after": {
                    content: '""',
                    position: "absolute",
                    right: -50,
                    bottom: -50,
                    width: 200,
                    height: 200,
                    borderRadius: "50%",
                    backgroundColor: "rgba(255, 106, 0, 0.1)",
                    zIndex: 0,
                  },
                }}
              >
                <Box sx={{ position: "relative", zIndex: 1 }}>
                  <Typography
                    variant="h4"
                    component="h2"
                    sx={{ fontWeight: 700, mb: 3 }}
                  >
                    Contact Information
                  </Typography>
                  <Typography variant="body1" sx={{ mb: 4, opacity: 0.9 }}>
                    You can reach out to us through any of the following
                    channels:
                  </Typography>

                  <List sx={{ p: 0 }}>
                    {contactInfo.map((item, index) => (
                      <React.Fragment key={index}>
                        <ListItem
                          component={item.action ? "a" : "div"}
                          href={item.action}
                          target={
                            item.action?.startsWith("http")
                              ? "_blank"
                              : undefined
                          }
                          rel={
                            item.action?.startsWith("http")
                              ? "noopener noreferrer"
                              : undefined
                          }
                          sx={{
                            px: 0,
                            py: 2,
                            color: "white",
                            textDecoration: "none",
                            transition: "transform 0.2s ease",
                            "&:hover": {
                              transform: item.action
                                ? "translateX(10px)"
                                : "none",
                            },
                          }}
                        >
                          <ListItemIcon sx={{ color: "primary.main" }}>
                            {item.icon}
                          </ListItemIcon>
                          <ListItemText
                            primary={
                              <Typography variant="h6" sx={{ fontWeight: 600 }}>
                                {item.title}
                              </Typography>
                            }
                            secondary={
                              <Typography
                                variant="body1"
                                sx={{ color: "rgba(255, 255, 255, 0.8)" }}
                              >
                                {item.details}
                              </Typography>
                            }
                          />
                        </ListItem>
                        {index < contactInfo.length - 1 && (
                          <Divider
                            sx={{ borderColor: "rgba(255, 255, 255, 0.1)" }}
                          />
                        )}
                      </React.Fragment>
                    ))}
                  </List>

                  <Box sx={{ mt: 6 }}>
                    <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
                      Follow Us
                    </Typography>
                    <Box sx={{ display: "flex", gap: 2 }}>
                      {["facebook", "twitter", "instagram", "linkedin"].map(
                        (social) => (
                          <Box
                            key={social}
                            component="a"
                            href={`https://${social}.com/sportspace`}
                            target="_blank"
                            rel="noopener noreferrer"
                            sx={{
                              width: 40,
                              height: 40,
                              borderRadius: "50%",
                              bgcolor: "rgba(255, 255, 255, 0.1)",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              transition: "all 0.3s ease",
                              "&:hover": {
                                bgcolor: "primary.main",
                                transform: "translateY(-5px)",
                              },
                            }}
                          >
                            <Box
                              component="img"
                              src={`/assets/icons/${social}.svg`}
                              alt={social}
                              sx={{
                                width: 20,
                                height: 20,
                                filter: "invert(1)",
                              }}
                            />
                          </Box>
                        )
                      )}
                    </Box>
                  </Box>
                </Box>
              </Paper>
            </motion.div>
          </Grid>
        </Grid>
      </Container>

      {/* Map Section */}
      <Box sx={{ bgcolor: "background.paper", py: 10 }}>
        <Container maxWidth="lg">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <Typography
              variant="h2"
              component="h2"
              sx={{
                fontWeight: 700,
                mb: 2,
                textAlign: "center",
              }}
            >
              Our Location
            </Typography>
            <Typography
              variant="h6"
              sx={{
                maxWidth: 700,
                mx: "auto",
                textAlign: "center",
                color: "text.secondary",
                mb: 6,
              }}
            >
              Visit our headquarters in the heart of New York City
            </Typography>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <Paper
              elevation={3}
              sx={{
                borderRadius: 3,
                overflow: "hidden",
                height: 450,
              }}
            >
              <Box
                component="iframe"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3022.215256349542!2d-73.98784492404045!3d40.75798833646281!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c25855c6480299%3A0x55194ec5a1ae072e!2sTimes%20Square!5e0!3m2!1sen!2sus!4v1710349523279!5m2!1sen!2sus"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="SportSpace Headquarters Location"
              />
            </Paper>
          </motion.div>
        </Container>
      </Box>

      {/* Snackbar for form submission feedback */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          onClose={handleSnackbarClose}
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

export default Contact;
