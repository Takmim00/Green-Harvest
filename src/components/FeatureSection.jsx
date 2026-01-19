import { Headset, RotateCcw, ShieldCheck, TruckElectric } from "lucide-react";

const features = [
  {
    icon: TruckElectric,
    title: "Free Shipping",
    desc: "Free shipping with discount",
  },
  {
    icon: Headset,
    title: "Great Support 24/7",
    desc: "Instant access to Contact",
  },
  {
    icon: ShieldCheck,
    title: "100% Secure Payment",
    desc: "We ensure your money is safe",
  },
  {
    icon: RotateCcw,
    title: "Money-Back Guarantee",
    desc: "30 days money-back guarantee",
  },
];

const FeatureSection = () => {
  return (
    <section className="py-10">
      <div className="max-w-11/12 mx-auto ">
        <div className="grid grid-cols-1 md:grid-cols-4 rounded-lg overflow-hidden shadow-sm bg-white">
          {features.map((item, index) => {
            const Icon = item.icon;
            return (
              <div
                key={index}
                className="group px-6 py-8 flex flex-col gap-4 items-center text-center 
                           border-l border-[#DAE6DA] 
                           border-b-4 border-b-transparent
                           hover:border-b-green-600
                           transition-all duration-300"
              >
                {/* Icon */}
                <div className="relative w-15 h-15 rounded-full overflow-hidden flex items-center justify-center">
                  {/* Default bg */}
                  <div className="absolute inset-0 bg-[#d9f4da] group-hover:opacity-0 transition-opacity duration-300" />

                  {/* Hover bg */}
                  <div className="absolute inset-0 bg-green-600 opacity-0 group-hover:opacity-100 transition-all duration-300" />

                  <Icon
                    size={35}
                    className="relative z-10 text-green-600 group-hover:text-white transition-colors duration-300"
                  />
                </div>

                {/* Text */}
                <div>
                  <h4 className="font-semibold mb-1 text-gray-900">
                    {item.title}
                  </h4>
                  <p className="text-sm text-gray-500">{item.desc}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

    </section>
  );
};

export default FeatureSection;
