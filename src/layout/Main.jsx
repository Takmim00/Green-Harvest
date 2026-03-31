import React, { useState, useEffect } from "react";
import { Outlet } from "react-router";
import Navbar from "../shared/Navbar";
import Footer from "../shared/Footer";
import Breadcrumb from "../shared/Breadcrumb";
import Loader from "../components/Loader/Loader";

const Main = () => {

  const [loading,setLoading] = useState(true)
  const [showLoader,setShowLoader] = useState(true)

  useEffect(()=>{

    const t1 = setTimeout(()=>{
      setLoading(false)     // start slide animation
    },2000)

    const t2 = setTimeout(()=>{
      setShowLoader(false)  // remove loader after animation
    },3200)

    return ()=>{
      clearTimeout(t1)
      clearTimeout(t2)
    }

  },[])

  return (
    <>
      {showLoader && <Loader hide={!loading} />}

      <div className="overflow-x-hidden">
        <Navbar/>
        <Breadcrumb/>
        <Outlet/>
        <Footer/>
      </div>
    </>
  );
};

export default Main;