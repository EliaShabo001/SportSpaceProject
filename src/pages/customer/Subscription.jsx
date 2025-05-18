import React, { useState } from "react";
import {
  Box,
  Container,
  Typography,
  Grid,
  Paper,
  Button,
  Card,
  CardContent,
  CardActions,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  useTheme,
  Stack,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import { motion } from "framer-motion";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import PaymentIcon from "@mui/icons-material/Payment";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";

const Subscription = () => {
  const theme = useTheme();
  const [paymentDialogOpen, setPaymentDialogOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState(null);

  const plans = [
    {
      id: "basic",
      title: "Basic Plan",
      price: "$20",
      period: "per month",
      description: "Perfect for individuals or small teams",
      features: [
        "Access to all standard fields",
        "Up to 5 bookings per month",
        "24/7 customer support",
        "Basic analytics",
      ],
    },
    {
      id: "premium",
      title: "Premium Plan",
      price: "$65",
      period: "per month",
      description: "Ideal for teams and frequent players",
      features: [
        "Access to all premium fields",
        "Unlimited bookings",
        "Priority customer support",
        "Advanced analytics and insights",
        "Exclusive discounts and offers",
        "Free equipment rental",
      ],
    },
  ];

  const handleSubscribeClick = (plan) => {
    setSelectedPlan(plan);
    setPaymentDialogOpen(true);
  };

  const handleClosePaymentDialog = () => {
    setPaymentDialogOpen(false);
  };

  return (
    <Box sx={{ pt: 12, pb: 10, bgcolor: "background.default" }}>
      <Container maxWidth="lg">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Box sx={{ textAlign: "center", mb: 8 }}>
            <Typography
              variant="h2"
              component="h1"
              sx={{ fontWeight: 700, mb: 2 }}
            >
              Choose Your{" "}
              <span style={{ color: theme.palette.primary.main }}>
                Subscription
              </span>{" "}
              Plan
            </Typography>
            <Typography
              variant="h6"
              sx={{ maxWidth: "700px", mx: "auto", color: "text.secondary" }}
            >
              Select the perfect plan for your football needs and enjoy premium
              benefits
            </Typography>
          </Box>
        </motion.div>

        <Grid container spacing={4} justifyContent="center">
          {plans.map((plan, index) => (
            <Grid item xs={12} md={6} key={plan.id}>
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
              >
                <Card
                  elevation={3}
                  sx={{
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    borderRadius: 3,
                    overflow: "hidden",
                    border:
                      plan.id === "premium"
                        ? `2px solid ${theme.palette.primary.main}`
                        : "none",
                  }}
                >
                  <Box
                    sx={{
                      bgcolor:
                        plan.id === "premium"
                          ? "primary.main"
                          : "secondary.main",
                      py: 3,
                      px: 4,
                      color: "white",
                    }}
                  >
                    <Typography variant="h5" fontWeight={700}>
                      {plan.title}
                    </Typography>
                    <Box sx={{ mt: 2 }}>
                      <Typography
                        variant="h3"
                        component="span"
                        fontWeight={700}
                      >
                        {plan.price}
                      </Typography>
                      <Typography
                        variant="subtitle1"
                        component="span"
                        sx={{ ml: 1, opacity: 0.8 }}
                      >
                        {plan.period}
                      </Typography>
                    </Box>
                    <Typography
                      variant="body2"
                      sx={{ mt: 1, opacity: 0.9 }}
                    >
                      {plan.description}
                    </Typography>
                  </Box>
                  <CardContent sx={{ flexGrow: 1, p: 4 }}>
                    <List disablePadding>
                      {plan.features.map((feature, i) => (
                        <ListItem key={i} disablePadding sx={{ mb: 2 }}>
                          <ListItemIcon sx={{ minWidth: 36 }}>
                            <CheckCircleIcon
                              color={
                                plan.id === "premium" ? "primary" : "secondary"
                              }
                            />
                          </ListItemIcon>
                          <ListItemText primary={feature} />
                        </ListItem>
                      ))}
                    </List>
                  </CardContent>
                  <CardActions sx={{ p: 4, pt: 0 }}>
                    <Button
                      variant="contained"
                      color={plan.id === "premium" ? "primary" : "secondary"}
                      size="large"
                      fullWidth
                      onClick={() => handleSubscribeClick(plan)}
                      sx={{
                        py: 1.5,
                        fontWeight: 600,
                        fontSize: "1rem",
                      }}
                    >
                      Subscribe Now
                    </Button>
                  </CardActions>
                </Card>
              </motion.div>
            </Grid>
          ))}
        </Grid>

        {/* Payment Options Dialog */}
        <Dialog
          open={paymentDialogOpen}
          onClose={handleClosePaymentDialog}
          maxWidth="sm"
          fullWidth
        >
          <DialogTitle sx={{ fontWeight: 700 }}>
            Payment Options for {selectedPlan?.title}
          </DialogTitle>
          <DialogContent>
            <Typography variant="body1" sx={{ mb: 3 }}>
              Please select your preferred payment method to complete your
              subscription.
            </Typography>
            <Stack spacing={2}>
              <Paper
                variant="outlined"
                sx={{
                  p: 2,
                  cursor: "pointer",
                  "&:hover": { bgcolor: "rgba(255, 106, 0, 0.05)" },
                }}
              >
                <Stack direction="row" alignItems="center" spacing={2}>
                  <AccountBalanceIcon color="primary" fontSize="large" />
                  <Typography variant="h6">Credit Card</Typography>
                </Stack>
              </Paper>
              <Paper
                variant="outlined"
                sx={{
                  p: 2,
                  cursor: "pointer",
                  "&:hover": { bgcolor: "rgba(255, 106, 0, 0.05)" },
                }}
              >
                <Stack direction="row" alignItems="center" spacing={2}>
                  <CreditCardIcon color="primary" fontSize="large" />
                  <Typography variant="h6">Debit Card</Typography>
                </Stack>
              </Paper>
              <Paper
                variant="outlined"
                sx={{
                  p: 2,
                  cursor: "pointer",
                  "&:hover": { bgcolor: "rgba(255, 106, 0, 0.05)" },
                }}
              >
                <Stack direction="row" alignItems="center" spacing={2}>
                  <PaymentIcon color="primary" fontSize="large" />
                  <Typography variant="h6">PayPal</Typography>
                </Stack>
              </Paper>
            </Stack>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClosePaymentDialog}>Cancel</Button>
            <Button variant="contained" color="primary">
              Proceed to Payment
            </Button>
          </DialogActions>
        </Dialog>
      </Container>
    </Box>
  );
};

export default Subscription;
