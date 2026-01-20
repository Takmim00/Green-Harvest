import { useEffect, useState } from "react";

const PromoBanners = () => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 2,
    mins: 18,
    secs: 46,
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        let { days, hours, mins, secs } = prev;

        if (secs > 0) {
          secs--;
        } else {
          secs = 59;
          if (mins > 0) {
            mins--;
          } else {
            mins = 59;
            if (hours > 0) {
              hours--;
            } else {
              hours = 23;
              if (days > 0) {
                days--;
              }
            }
          }
        }

        return { days, hours, mins, secs };
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative w-full  bg-cover bg-center"
      style={{ backgroundImage: "url(/PromoBanner.png)" }}>
      <div className="py-12 px-4 md:px-8 lg:px-16 max-w-11/12 mx-auto">
        <div className="grid md:grid-cols-2 gap-6">
          {/* Fruit & Vegetable Banner */}
          <div className="relative bg-gray-900 rounded-xl overflow-hidden h-64 md:h-72">
            <img
              src="/fresh-vegetables-basket.png"
              alt="Fresh vegetables"
              className="absolute inset-0 w-full h-full object-cover opacity-60"
            />
            <div className="relative z-10 p-8 h-full flex flex-col justify-center">
              <span className="text-white/80 text-xs uppercase tracking-wider mb-2">
                Best Deals
              </span>
              <h3 className="text-2xl md:text-3xl font-bold text-white mb-3">
                Fruit & Vegetable
              </h3>
              <p className="text-white/80 text-sm mb-4">
                Starting at{" "}
                <span className="bg-yellow-500 text-gray-900 px-2 py-1 rounded font-semibold">
                  $7.99
                </span>
              </p>
              <a
                href="/shop"
                className="inline-flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white px-5 py-2.5 rounded-full font-medium transition-colors w-fit"
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
              </a>
            </div>
          </div>

          {/* Sales of the Year Banner */}
          <div className="relative bg-gray-900 rounded-xl overflow-hidden h-64 md:h-72">
            <img
              src="/farm-fresh-produce.png"
              alt="Fresh produce sale"
              className="absolute inset-0 w-full h-full object-cover opacity-50"
            />
            <div className="relative z-10 p-8 h-full flex flex-col justify-center">
              <span className="text-orange-400 text-xs uppercase tracking-wider mb-2">
                Deal of the Week
              </span>
              <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
                Sales of the Year
              </h3>

              {/* Countdown Timer */}
              <div className="flex gap-3 mb-4">
                {[
                  { value: timeLeft.days, label: "DAYS" },
                  { value: timeLeft.hours, label: "HOURS" },
                  { value: timeLeft.mins, label: "MINS" },
                  { value: timeLeft.secs, label: "SECS" },
                ].map((item, index) => (
                  <div key={index} className="text-center">
                    <div className="bg-white text-gray-900 rounded-lg w-12 h-12 flex items-center justify-center font-bold text-lg">
                      {String(item.value).padStart(2, "0")}
                    </div>
                    <span className="text-white/60 text-[10px] mt-1 block">
                      {item.label}
                    </span>
                  </div>
                ))}
              </div>

              <a
                href="/shop"
                className="inline-flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white px-5 py-2.5 rounded-full font-medium transition-colors w-fit"
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
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PromoBanners;
