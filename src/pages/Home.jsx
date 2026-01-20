import Banner from "../components/Banner";
import FeatureSection from "../components/FeatureSection";
import TopCategories from "../components/TopCategories";
import IntroducingProducts from './../components/IntroducingProducts';

const Home = () => {
  return (
    <div>
      <Banner />
      <FeatureSection />
      <IntroducingProducts/>
      <TopCategories/>
    </div>
  );
};

export default Home;
