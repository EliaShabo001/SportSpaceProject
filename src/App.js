import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import "./App.css";
import "./assets/styles/custom.css";
import theme from "./theme";

// Layouts
import CustomerLayout from "./layouts/CustomerLayout";
import AdminLayout from "./layouts/AdminLayout";
import AuthLayout from "./layouts/AuthLayout";

// Components
import ProtectedRoute from "./components/ProtectedRoute";

// Services
import { isAuthenticated, getCurrentUser } from "./services/authService";
import supabase from "./services/supabaseClient";

// Customer Pages
import Home from "./pages/Home";
import BrowseFields from "./pages/customer/BrowseFields";
import FieldDetail from "./pages/customer/FieldDetail";
import Booking from "./pages/customer/Booking";
import Payment from "./pages/customer/Payment";
import MyBookings from "./pages/customer/MyBookings";
import Offers from "./pages/customer/Offers";
import Profile from "./pages/customer/Profile";
import Subscription from "./pages/customer/Subscription";

// Info Pages
import AboutUs from "./pages/AboutUs";
import Contact from "./pages/Contact";
import Careers from "./pages/Careers";
import Blog from "./pages/Blog";

// Auth Pages
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import Logout from "./pages/auth/Logout";

// Admin Pages
import Dashboard from "./pages/admin/Dashboard";
import ManageFields from "./pages/admin/ManageFields";
import ManageServices from "./pages/admin/ManageServices";
import ManageOffers from "./pages/admin/ManageOffers";
import ManageBookings from "./pages/admin/ManageBookings";
import Reviews from "./pages/admin/Reviews";
import SetupDatabase from "./pages/admin/SetupDatabase";
import CheckSupabase from "./pages/admin/CheckSupabase";

// Error Page
import NotFound from "./pages/NotFound";

function App() {
  // State to track authentication status
  const [authenticated, setAuthenticated] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Check authentication status on component mount
  useEffect(() => {
    const checkAuth = async () => {
      try {
        setLoading(true);
        const authStatus = await isAuthenticated();
        setAuthenticated(authStatus);

        if (authStatus) {
          const user = await getCurrentUser();
          setCurrentUser(user);
        }
      } catch (error) {
        console.error("Error checking authentication:", error);
      } finally {
        setLoading(false);
      }
    };

    // Initial auth check
    checkAuth();

    // Set up auth state change listener
    const { data: authListener } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (event === "SIGNED_IN") {
          setAuthenticated(true);
          const user = await getCurrentUser();
          setCurrentUser(user);
        } else if (event === "SIGNED_OUT") {
          setAuthenticated(false);
          setCurrentUser(null);
        }
      }
    );

    // Clean up listener on unmount
    return () => {
      if (authListener && authListener.subscription) {
        authListener.subscription.unsubscribe();
      }
    };
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Routes>
          {/* Auth Routes */}
          <Route element={<AuthLayout />}>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/logout" element={<Logout />} />
          </Route>

          {/* Customer Routes */}
          <Route
            element={
              <CustomerLayout
                isAuthenticated={authenticated}
                currentUser={currentUser}
              />
            }
          >
            <Route path="/" element={<Home />} />
            <Route path="/fields" element={<BrowseFields />} />
            <Route path="/fields/:id" element={<FieldDetail />} />
            <Route path="/booking/:id" element={<Booking />} />
            <Route path="/payment/:id" element={<Payment />} />
            <Route path="/my-bookings" element={<MyBookings />} />
            <Route path="/offers" element={<Offers />} />
            <Route path="/profile" element={<Profile />} />
            <Route
              path="/subscription"
              element={
                <ProtectedRoute
                  isAuthenticated={authenticated}
                  loading={loading}
                  redirectTo="/register"
                >
                  <Subscription />
                </ProtectedRoute>
              }
            />
            <Route path="/about" element={<AboutUs />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/careers" element={<Careers />} />
            <Route path="/blog" element={<Blog />} />
          </Route>

          {/* Admin Routes */}
          <Route element={<AdminLayout />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/dashboard/fields" element={<ManageFields />} />
            <Route path="/dashboard/services" element={<ManageServices />} />
            <Route path="/dashboard/offers" element={<ManageOffers />} />
            <Route path="/dashboard/bookings" element={<ManageBookings />} />
            <Route path="/dashboard/reviews" element={<Reviews />} />
            <Route
              path="/dashboard/setup-database"
              element={<SetupDatabase />}
            />
            <Route
              path="/dashboard/check-supabase"
              element={<CheckSupabase />}
            />
          </Route>

          {/* 404 Route */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
