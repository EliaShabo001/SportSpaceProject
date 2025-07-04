import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Box,
  TextField,
  Button,
  Typography,
  InputAdornment,
  IconButton,
  Divider,
  Alert,
  Checkbox,
  FormControlLabel,
} from "@mui/material";

import { useFormik } from "formik";
import * as Yup from "yup";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import GoogleIcon from "@mui/icons-material/Google";
import FacebookIcon from "@mui/icons-material/Facebook";
import { GoogleLogin } from '@react-oauth/google';
import { GoogleOAuthProvider } from '@react-oauth/google';
import {jwtDecode} from 'jwt-decode';
// Validation schema
const validationSchema = Yup.object({
  email: Yup.string()
    .email("Enter a valid email")
    .required("Email is required"),
  password: Yup.string()
    .min(8, "Password should be of minimum 8 characters length")
    .required("Password is required"),
});

const Login = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [loginError, setLoginError] = useState(null);
  const [userData, setUserData] = useState(null);
const handleGoogleSuccess = (credentialResponse) => {
  const decoded = jwtDecode(credentialResponse.credential);
  console.log("Google User:", decoded);
  alert(`أهلاً ${decoded.name} من Google`);
  setUserData({
    name: decoded.name,
    email: decoded.email,
    picture: decoded.picture,
    provider: 'google',
  });

};
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      rememberMe: false,
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      // Here you would typically make an API call to authenticate
      console.log("Login form submitted:", values);

      try {
        // Set loading state
        setLoginError(null);

        // For now, just redirect to fields page
        // TODO: Implement actual authentication logic
        navigate("/fields");
      } catch (error) {
        // Show login error
        setLoginError(error.message);
      }
    },
  });

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <Box>
      <Typography
        variant="h4"
        component="h1"
        gutterBottom
        sx={{ fontWeight: 700, textAlign: "center" }}
      >
        Welcome Back
      </Typography>
      <Typography
        variant="body1"
        sx={{ mb: 4, textAlign: "center", color: "text.secondary" }}
      >
        Sign in to continue to SportSpace
      </Typography>

      {loginError && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {loginError}
        </Alert>
      )}

      <form onSubmit={formik.handleSubmit}>
        <TextField
          fullWidth
          id="email"
          name="email"
          label="Email Address"
          variant="outlined"
          margin="normal"
          value={formik.values.email}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.email && Boolean(formik.errors.email)}
          helperText={formik.touched.email && formik.errors.email}
        />
        <TextField
          fullWidth
          id="password"
          name="password"
          label="Password"
          type={showPassword ? "text" : "password"}
          variant="outlined"
          margin="normal"
          value={formik.values.password}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.password && Boolean(formik.errors.password)}
          helperText={formik.touched.password && formik.errors.password}
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

        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 2,
          }}
        >
          <FormControlLabel
            control={
              <Checkbox
                id="rememberMe"
                name="rememberMe"
                color="primary"
                checked={formik.values.rememberMe}
                onChange={formik.handleChange}
              />
            }
            label="Remember me"
          />
          <Link
            to="/forgot-password"
            style={{ textDecoration: "none", color: "inherit" }}
          >
            <Typography
              variant="body2"
              color="primary"
              sx={{ fontWeight: 500 }}
            >
              Forgot password?
            </Typography>
          </Link>
        </Box>

        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          size="large"
          sx={{ mt: 2, mb: 3, py: 1.5 }}
        >
          Sign In
        </Button>
      </form>

      <Divider sx={{ my: 3 }}>
        <Typography variant="body2" color="text.secondary">
          OR
        </Typography>
      </Divider>

       <Box sx={{ display: "flex", gap: 2, mb: 3 }}>
             <GoogleOAuthProvider clientId="642145349107-mvrf49cvb4s97ve4anb9rap3hciftd72.apps.googleusercontent.com">
           <Box  sx={{ display: "flex", justifyContent: "center", mt: 10 }} className="googleButton">
             <GoogleLogin 
                theme="filled_"  
            size="xx-large"
               onSuccess={handleGoogleSuccess}
               onError={() => console.log("Google Login Failed")}
             />
           </Box>
         </GoogleOAuthProvider>

      </Box>

      <Typography variant="body2" align="center" sx={{ mt: 2 }}>
        Don't have an account?{" "}
        <Link to="/register" style={{ textDecoration: "none" }}>
          <Typography
            component="span"
            variant="body2"
            color="primary"
            sx={{ fontWeight: 600 }}
          >
            Sign Up
          </Typography>
        </Link>
      </Typography>
    </Box>
  );
};

export default Login;
