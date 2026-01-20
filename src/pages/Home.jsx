import Banner from "../components/Banner";
import FeatureSection from "../components/FeatureSection";
import Stats from "../components/Stats";
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
    </div>
  );
};

export default Home;
