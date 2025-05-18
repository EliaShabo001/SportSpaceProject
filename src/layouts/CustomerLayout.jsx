import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ScrollToTop from "../components/ScrollToTop";

const CustomerLayout = ({ isAuthenticated }) => {
  return (
    <>
      <ScrollToTop />
      <Navbar userRole={isAuthenticated ? "customer" : null} />
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  );
};

export default CustomerLayout;
