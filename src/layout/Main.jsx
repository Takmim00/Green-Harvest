import React, { useState, useEffect } from "react";
import { Outlet } from "react-router";
import Navbar from "../shared/Navbar";
import Footer from "../shared/Footer";
import Breadcrumb from "../shared/Breadcrumb";
import Loader from "../components/Loader/Loader";

const Main = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate page loading (or wait for actual content)
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1500); // adjust time if needed

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {loading && <Loader />} {/* Show loader while loading */}

      <div className={`overflow-x-hidden ${loading ? "hidden" : "block"}`}>
        <Navbar />
        <Breadcrumb />
        <Outlet />
        <Footer />
      </div>
    </>
  );
};

export default Main;