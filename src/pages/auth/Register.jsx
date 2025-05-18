import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import {
  Box,
  TextField,
  Button,
  Typography,
  InputAdornment,
  IconButton,
  Divider,
  Alert,
  Tabs,
  Tab,
  Checkbox,
  FormControlLabel,
  Paper,
} from "@mui/material";
import { registerUser } from "../../services/authService";
import { useFormik } from "formik";
import * as Yup from "yup";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import GoogleIcon from "@mui/icons-material/Google";
import FacebookIcon from "@mui/icons-material/Facebook";

// Tab Panel component
function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`register-tabpanel-${index}`}
      aria-labelledby={`register-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ pt: 3 }}>{children}</Box>}
    </div>
  );
}

// Validation schemas
const customerValidationSchema = Yup.object({
  firstName: Yup.string().required("First name is required"),
  lastName: Yup.string().required("Last name is required"),
  email: Yup.string()
    .email("Enter a valid email")
    .required("Email is required"),
  password: Yup.string()
    .min(8, "Password should be of minimum 8 characters length")
    .required("Password is required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "Passwords must match")
    .required("Confirm password is required"),
  agreeTerms: Yup.boolean()
    .oneOf([true], "You must accept the terms and conditions")
    .required("You must accept the terms and conditions"),
});

const ownerValidationSchema = Yup.object({
  businessName: Yup.string().required("Business name is required"),
  contactName: Yup.string().required("Contact name is required"),
  email: Yup.string()
    .email("Enter a valid email")
    .required("Email is required"),
  phone: Yup.string().required("Phone number is required"),
  password: Yup.string()
    .min(8, "Password should be of minimum 8 characters length")
    .required("Password is required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "Passwords must match")
    .required("Confirm password is required"),
  agreeTerms: Yup.boolean()
    .oneOf([true], "You must accept the terms and conditions")
    .required("You must accept the terms and conditions"),
});

const Register = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [tabValue, setTabValue] = useState(0);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [registerError, setRegisterError] = useState(null);

  // Check if user was redirected from subscription page
  const fromSubscription = location.state?.from === "/subscription";

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const customerFormik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
      agreeTerms: false,
    },
    validationSchema: customerValidationSchema,
    onSubmit: async (values) => {
      try {
        // Clear any previous errors
        setRegisterError(null);

        // Register the user using our Supabase auth service
        console.log("Customer registration form submitted:", values);
        await registerUser(values, "customer");

        // Show success message (in a real app)
        // setRegisterSuccess("Registration successful! You can now log in.");

        // Redirect based on where the user came from
        if (fromSubscription) {
          navigate("/subscription");
        } else {
          navigate("/login");
        }
      } catch (error) {
        // Show error message
        console.error("Registration error:", error);

        // Handle specific error cases
        if (error.message.includes("Invalid API key")) {
          setRegisterError(
            "Database connection error. Please contact the administrator to check the Supabase API key."
          );
        } else {
          setRegisterError(error.message);
        }
      }
    },
  });

  const ownerFormik = useFormik({
    initialValues: {
      businessName: "",
      contactName: "",
      email: "",
      phone: "",
      password: "",
      confirmPassword: "",
      agreeTerms: false,
    },
    validationSchema: ownerValidationSchema,
    onSubmit: async (values) => {
      try {
        // Clear any previous errors
        setRegisterError(null);

        // Register the user using our Supabase auth service
        console.log("Owner registration form submitted:", values);
        await registerUser(values, "owner");

        // Show success message (in a real app)
        // setRegisterSuccess("Registration successful! You can now log in.");

        // Redirect based on where the user came from
        if (fromSubscription) {
          navigate("/subscription");
        } else {
          navigate("/login");
        }
      } catch (error) {
        // Show error message
        setRegisterError(error.message);
      }
    },
  });

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleClickShowConfirmPassword = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  return (
    <Box>
      <Typography
        variant="h4"
        component="h1"
        gutterBottom
        sx={{ fontWeight: 700, textAlign: "center" }}
      >
        Create an Account
      </Typography>
      <Typography
        variant="body1"
        sx={{ mb: 3, textAlign: "center", color: "text.secondary" }}
      >
        Join SportSpace to book football fields or list your own
      </Typography>

      {registerError && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {registerError}
        </Alert>
      )}

      <Tabs
        value={tabValue}
        onChange={handleTabChange}
        variant="fullWidth"
        sx={{
          mb: 3,
          "& .MuiTab-root": {
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
        <Tab
          label="Customer"
          id="register-tab-0"
          aria-controls="register-tabpanel-0"
        />
        <Tab
          label="Field Owner"
          id="register-tab-1"
          aria-controls="register-tabpanel-1"
        />
      </Tabs>

      {/* Customer Registration Form */}
      <TabPanel value={tabValue} index={0}>
        <form onSubmit={customerFormik.handleSubmit}>
          <Box sx={{ display: "flex", gap: 2, mb: 2 }}>
            <TextField
              fullWidth
              id="firstName"
              name="firstName"
              label="First Name"
              variant="outlined"
              value={customerFormik.values.firstName}
              onChange={customerFormik.handleChange}
              onBlur={customerFormik.handleBlur}
              error={
                customerFormik.touched.firstName &&
                Boolean(customerFormik.errors.firstName)
              }
              helperText={
                customerFormik.touched.firstName &&
                customerFormik.errors.firstName
              }
            />
            <TextField
              fullWidth
              id="lastName"
              name="lastName"
              label="Last Name"
              variant="outlined"
              value={customerFormik.values.lastName}
              onChange={customerFormik.handleChange}
              onBlur={customerFormik.handleBlur}
              error={
                customerFormik.touched.lastName &&
                Boolean(customerFormik.errors.lastName)
              }
              helperText={
                customerFormik.touched.lastName &&
                customerFormik.errors.lastName
              }
            />
          </Box>
          <TextField
            fullWidth
            id="email"
            name="email"
            label="Email Address"
            variant="outlined"
            margin="normal"
            value={customerFormik.values.email}
            onChange={customerFormik.handleChange}
            onBlur={customerFormik.handleBlur}
            error={
              customerFormik.touched.email &&
              Boolean(customerFormik.errors.email)
            }
            helperText={
              customerFormik.touched.email && customerFormik.errors.email
            }
          />
          <TextField
            fullWidth
            id="password"
            name="password"
            label="Password"
            type={showPassword ? "text" : "password"}
            variant="outlined"
            margin="normal"
            value={customerFormik.values.password}
            onChange={customerFormik.handleChange}
            onBlur={customerFormik.handleBlur}
            error={
              customerFormik.touched.password &&
              Boolean(customerFormik.errors.password)
            }
            helperText={
              customerFormik.touched.password && customerFormik.errors.password
            }
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          <TextField
            fullWidth
            id="confirmPassword"
            name="confirmPassword"
            label="Confirm Password"
            type={showConfirmPassword ? "text" : "password"}
            variant="outlined"
            margin="normal"
            value={customerFormik.values.confirmPassword}
            onChange={customerFormik.handleChange}
            onBlur={customerFormik.handleBlur}
            error={
              customerFormik.touched.confirmPassword &&
              Boolean(customerFormik.errors.confirmPassword)
            }
            helperText={
              customerFormik.touched.confirmPassword &&
              customerFormik.errors.confirmPassword
            }
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle confirm password visibility"
                    onClick={handleClickShowConfirmPassword}
                    edge="end"
                  >
                    {showConfirmPassword ? (
                      <VisibilityOffIcon />
                    ) : (
                      <VisibilityIcon />
                    )}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />

          <FormControlLabel
            control={
              <Checkbox
                id="agreeTerms"
                name="agreeTerms"
                color="primary"
                checked={customerFormik.values.agreeTerms}
                onChange={customerFormik.handleChange}
              />
            }
            label={
              <Typography variant="body2">
                I agree to the{" "}
                <Link
                  to="/terms"
                  style={{ textDecoration: "none", color: "primary.main" }}
                >
                  Terms of Service
                </Link>{" "}
                and{" "}
                <Link
                  to="/privacy"
                  style={{ textDecoration: "none", color: "primary.main" }}
                >
                  Privacy Policy
                </Link>
              </Typography>
            }
            sx={{ mt: 2 }}
          />
          {customerFormik.touched.agreeTerms &&
            customerFormik.errors.agreeTerms && (
              <Typography variant="caption" color="error">
                {customerFormik.errors.agreeTerms}
              </Typography>
            )}

          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            size="large"
            sx={{ mt: 3, mb: 3, py: 1.5 }}
          >
            Sign Up as Customer
          </Button>
        </form>

        <Divider sx={{ my: 3 }}>
          <Typography variant="body2" color="text.secondary">
            OR
          </Typography>
        </Divider>

        <Box sx={{ display: "flex", gap: 2, mb: 3 }}>
          <Button
            fullWidth
            variant="outlined"
            startIcon={<GoogleIcon />}
            sx={{ py: 1.5 }}
          >
            Google
          </Button>
          <Button
            fullWidth
            variant="outlined"
            startIcon={<FacebookIcon />}
            sx={{ py: 1.5 }}
          >
            Facebook
          </Button>
        </Box>
      </TabPanel>

      {/* Field Owner Registration Form */}
      <TabPanel value={tabValue} index={1}>
        <form onSubmit={ownerFormik.handleSubmit}>
          <TextField
            fullWidth
            id="businessName"
            name="businessName"
            label="Business Name"
            variant="outlined"
            margin="normal"
            value={ownerFormik.values.businessName}
            onChange={ownerFormik.handleChange}
            onBlur={ownerFormik.handleBlur}
            error={
              ownerFormik.touched.businessName &&
              Boolean(ownerFormik.errors.businessName)
            }
            helperText={
              ownerFormik.touched.businessName &&
              ownerFormik.errors.businessName
            }
          />
          <TextField
            fullWidth
            id="contactName"
            name="contactName"
            label="Contact Person Name"
            variant="outlined"
            margin="normal"
            value={ownerFormik.values.contactName}
            onChange={ownerFormik.handleChange}
            onBlur={ownerFormik.handleBlur}
            error={
              ownerFormik.touched.contactName &&
              Boolean(ownerFormik.errors.contactName)
            }
            helperText={
              ownerFormik.touched.contactName && ownerFormik.errors.contactName
            }
          />
          <TextField
            fullWidth
            id="email"
            name="email"
            label="Email Address"
            variant="outlined"
            margin="normal"
            value={ownerFormik.values.email}
            onChange={ownerFormik.handleChange}
            onBlur={ownerFormik.handleBlur}
            error={
              ownerFormik.touched.email && Boolean(ownerFormik.errors.email)
            }
            helperText={ownerFormik.touched.email && ownerFormik.errors.email}
          />
          <TextField
            fullWidth
            id="phone"
            name="phone"
            label="Phone Number"
            variant="outlined"
            margin="normal"
            value={ownerFormik.values.phone}
            onChange={ownerFormik.handleChange}
            onBlur={ownerFormik.handleBlur}
            error={
              ownerFormik.touched.phone && Boolean(ownerFormik.errors.phone)
            }
            helperText={ownerFormik.touched.phone && ownerFormik.errors.phone}
          />
          <TextField
            fullWidth
            id="password"
            name="password"
            label="Password"
            type={showPassword ? "text" : "password"}
            variant="outlined"
            margin="normal"
            value={ownerFormik.values.password}
            onChange={ownerFormik.handleChange}
            onBlur={ownerFormik.handleBlur}
            error={
              ownerFormik.touched.password &&
              Boolean(ownerFormik.errors.password)
            }
            helperText={
              ownerFormik.touched.password && ownerFormik.errors.password
            }
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          <TextField
            fullWidth
            id="confirmPassword"
            name="confirmPassword"
            label="Confirm Password"
            type={showConfirmPassword ? "text" : "password"}
            variant="outlined"
            margin="normal"
            value={ownerFormik.values.confirmPassword}
            onChange={ownerFormik.handleChange}
            onBlur={ownerFormik.handleBlur}
            error={
              ownerFormik.touched.confirmPassword &&
              Boolean(ownerFormik.errors.confirmPassword)
            }
            helperText={
              ownerFormik.touched.confirmPassword &&
              ownerFormik.errors.confirmPassword
            }
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle confirm password visibility"
                    onClick={handleClickShowConfirmPassword}
                    edge="end"
                  >
                    {showConfirmPassword ? (
                      <VisibilityOffIcon />
                    ) : (
                      <VisibilityIcon />
                    )}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />

          <FormControlLabel
            control={
              <Checkbox
                id="agreeTerms"
                name="agreeTerms"
                color="primary"
                checked={ownerFormik.values.agreeTerms}
                onChange={ownerFormik.handleChange}
              />
            }
            label={
              <Typography variant="body2">
                I agree to the{" "}
                <Link
                  to="/terms"
                  style={{ textDecoration: "none", color: "primary.main" }}
                >
                  Terms of Service
                </Link>{" "}
                and{" "}
                <Link
                  to="/privacy"
                  style={{ textDecoration: "none", color: "primary.main" }}
                >
                  Privacy Policy
                </Link>
              </Typography>
            }
            sx={{ mt: 2 }}
          />
          {ownerFormik.touched.agreeTerms && ownerFormik.errors.agreeTerms && (
            <Typography variant="caption" color="error">
              {ownerFormik.errors.agreeTerms}
            </Typography>
          )}

          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            size="large"
            sx={{ mt: 3, mb: 3, py: 1.5 }}
          >
            Sign Up as Field Owner
          </Button>
        </form>
      </TabPanel>

      <Typography variant="body2" align="center" sx={{ mt: 2 }}>
        Already have an account?{" "}
        <Link to="/login" style={{ textDecoration: "none" }}>
          <Typography
            component="span"
            variant="body2"
            color="primary"
            sx={{ fontWeight: 600 }}
          >
            Sign In
          </Typography>
        </Link>
      </Typography>
    </Box>
  );
};

export default Register;
