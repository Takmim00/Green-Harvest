import React from 'react';
import Banner from '../components/Banner';
import FeatureSection from '../components/FeatureSection';
import IntroducingProducts from './IntroducingProducts';

const Home = () => {
    return (
        <div>
            <Banner/>
            <FeatureSection/>
            <IntroducingProducts/>
        </div>
    );
};

export default Home;