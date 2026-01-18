import { Headset, RotateCcw, ShieldCheck, TruckElectric } from "lucide-react";

const FeatureSection = () => {
  return (
    <section
      className=" py-10"
      style={{
        background: "linear-gradient(to top, #EDF2EE 50%, #FFFFFF 50%)",
      }}
    >
      <div className="max-w-11/12 mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 rounded-lg overflow-hidden shadow-sm bg-white">
          {/* Item 1 (Active / Green) */}
          <div className="bg-green-600 text-white px-6 py-8 flex flex-col gap-4 items-start">
            <div className="w-15 h-15 rounded-full bg-white flex items-center justify-center">
              <TruckElectric className="text-green-600" size={35} />
            </div>
            <div>
              <h4 className="font-semibold">Free Shipping</h4>
              <p className="text-sm  text-white/80">
                Free shipping with discount
              </p>
            </div>
          </div>

          {/* Item 2 */}
          <div className="px-6 py-8 flex flex-col  gap-4 items-start border-l border-[#DAE6DA]">
            <div className="w-15 h-15 rounded-full border border-[#DAE6DA]  flex items-center justify-center text-green-600">
              <Headset size={35} />
            </div>
            <div>
              <h4 className="font-semibold text-gray-900">
                Great Support 24/7
              </h4>
              <p className="text-sm text-gray-500">Instant access to Contact</p>
            </div>
          </div>

          {/* Item 3 */}
          <div className="px-6 py-8 flex flex-col  gap-4 items-start border-l border-[#DAE6DA]">
            <div className="w-15 h-15 rounded-full border  border-[#DAE6DA] flex  items-center justify-center text-green-600">
              <ShieldCheck size={35} />
            </div>
            <div>
              <h4 className="font-semibold text-gray-900">
                100% Secure Payment
              </h4>
              <p className="text-sm text-gray-500">
                We ensure your money is safe
              </p>
            </div>
          </div>

          {/* Item 4 */}
          <div className="px-6 py-8 flex flex-col   gap-4 items-start border-l border-[#DAE6DA]">
            <div className="w-15 h-15 rounded-full border  border-[#DAE6DA]  flex  items-center justify-center text-green-600">
              <RotateCcw size={35} />
            </div>
            <div>
              <h4 className="font-semibold text-gray-900">
                Money-Back Guarantee
              </h4>
              <p className="text-sm text-gray-500">
                30 days money-back guarantee
              </p>
            </div>
          </div>
        </div>
      </div>

    </section>
  );
};
export default FeatureSection;
