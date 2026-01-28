import { Check } from "lucide-react";
import { Link } from "react-router";

const TrustedStore = () => {
  return (
    <section
      className="relative w-full  bg-cover bg-center"
      style={{ backgroundImage: "url(/TrustedBG.png)" }}
    >
      <div className="py-16 px-4 md:px-8 lg:px-16 lg:max-w-7xl max-w-11/12 mx-auto">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          {/* Left Side - Images */}
          <div className="relative flex items-center">
            <div className="flex  flex-col md:flex-row gap-6 items-start">
              {/* Small Image */}
              <div className="w-full md:w-56 h-64 md:h-72 rounded overflow-hidden shadow-lg">
                <img
                  src="/trusted1.png"
                  alt="Farmer with organic produce"
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Big Image */}
              <div className="w-full md:w-80 h-80 md:h-96 rounded overflow-hidden shadow-xl ">
                <img
                  src="/trusted2.png"
                  alt="Fresh farm produce"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            {/* Decorative leaf */}
            <div className="absolute bottom-18 -left-8 w-16 h-16 ">
              <img src="/trustedlip.png" alt="" />
            </div>
          </div>

          {/* Right Side - Content */}
          <div className="space-y-6">
            <h2 className="text-3xl md:text-4xl font-semibold text-gray-900 leading-tight">
              100% Trusted
              <br />
              Organic Food Store
            </h2>

            <div className="space-y-4">
              <div className="flex gap-3">
                <div className="shrink-0 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                  <Check className="w-4 h-4 text-white" />
                </div>
                <div>
                  <h3 className="font-medium text-gray-900">
                    Healthy & natural food for lovers of healthy food.
                  </h3>
                  <p className="text-gray-600 text-sm mt-1">
                    Ut ultricies imperdiet sodales. Aliquam fringilla aliquam ex
                    sit amet elementum. Proin bibendum sollicitudin feugiat.
                    Curabitur ut egestas justo, vitae molestie ante.
                  </p>
                </div>
              </div>

              <div className="flex gap-3">
                <div className="shrink-0 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                  <Check className="w-4 h-4 text-white" />
                </div>
                <div>
                  <h3 className="font-medium text-gray-900">
                    Every day fresh and quality products for you.
                  </h3>
                  <p className="text-gray-600 text-sm mt-1">
                    Maecenas vehicula a diam mattis vulputate. Suspendisse
                    tincidunt, elit eu cursus venenatis. Maecenas vel finibus
                    nibh, quis gravida libero.
                  </p>
                </div>
              </div>
            </div>

            <Link
              to="/shop"
              className="inline-flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-full font-medium transition-colors"
            >
              Shop Now
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TrustedStore;
