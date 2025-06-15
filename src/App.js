import React from "react";
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

// Customer Pages
import Home from "./pages/Home";
import BrowseFields from "./pages/customer/BrowseFields";
import FieldDetail from "./pages/customer/FieldDetail";
import Booking from "./pages/customer/Booking";
import Payment from "./pages/customer/Payment";
import MyBookings from "./pages/customer/MyBookings";
import OffersPage from "./pages/OffersPage"
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


// Error Page
import NotFound from "./pages/NotFound";

function App() {
  const handleLogin = (userData) => {
    console.log("بيانات المستخدم:", userData);
  };

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
          <Route element={<CustomerLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/fields" element={<BrowseFields />} />
            <Route path="/fields/:id" element={<FieldDetail />} />
            <Route path="/booking/:id" element={<Booking />} />
            <Route path="/payment/:id" element={<Payment />} />
            <Route path="/my-bookings" element={<MyBookings />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/subscription" element={<Subscription />} />
            <Route path="/about" element={<AboutUs />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/careers" element={<Careers />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/offerspage" element={<OffersPage/>}/>
          </Route>

          {/* Admin Routes */}
          <Route element={<AdminLayout />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/dashboard/fields" element={<ManageFields />} />
            <Route path="/dashboard/services" element={<ManageServices />} />
            <Route path="/dashboard/offers" element={<ManageOffers />} />
            <Route path="/dashboard/bookings" element={<ManageBookings />} />
            <Route path="/dashboard/reviews" element={<Reviews />} />
          </Route>

          {/* 404 Route */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>

    </ThemeProvider>
  );
}

export default App;
