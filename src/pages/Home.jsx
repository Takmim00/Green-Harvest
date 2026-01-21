import Banner from "../components/Banner";
import BestSellerProducts from "../components/BestSellerProducts";
import FeatureSection from "../components/FeatureSection";
import LatestNews from "../components/LatestNews";
import PromoBanners from "../components/PromoBanners";
import Stats from "../components/Stats";
import Testimonials from "../components/Testimonials";
import TopCategories from "../components/TopCategories";
import TrustedStore from "../components/TrustedStore";
import IntroducingProducts from './../components/IntroducingProducts';

const Home = () => {
  return (
    <div>
      <Banner />
      <FeatureSection />
      <IntroducingProducts/>
      <TopCategories/>
      <TrustedStore/>
      <Stats/>
      <PromoBanners/>
      <BestSellerProducts/>
      <LatestNews/>
      <Testimonials/>
    </div>
  );
};

export default Home;
