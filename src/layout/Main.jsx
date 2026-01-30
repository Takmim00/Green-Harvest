import React from 'react';
import { Outlet } from 'react-router';
import Navbar from '../shared/Navbar';
import Footer from '../shared/Footer';
import Breadcrumb from '../shared/Breadcrumb';

const Main = () => {
    return (
        <div className="overflow-x-hidden">
           <Navbar/>
           <Breadcrumb/>
            <Outlet/>
            <Footer/>
        </div>
    );
};

export default Main;