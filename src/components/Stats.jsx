import { useStaggeredAnimation } from "../hooks/useScrollAnimation";

const stats = [
  {
    value: "37+",
    label: "Years of Hard Work",
  },
  {
    value: "500k+",
    label: "Happy Customer",
  },
  {
    value: "28",
    label: "Qualified Team Member",
  },
  {
    value: "750k+",
    label: "Monthly Orders",
  },
];

const Stats = () => {
  const { containerRef, visibleItems } = useStaggeredAnimation(stats.length, 150);

  return (
    <section
      className="relative inset-0 w-full bg-cover bg-center bg-no-repeat py-10"
      style={{ backgroundImage: "url(/STATSBG.png)" }}
    >
      <div className="lg:max-w-7xl max-w-11/12 mx-auto px-4 md:px-8 lg:px-16">
        <div 
          ref={containerRef}
          className="grid grid-cols-2 md:grid-cols-4 gap-4"
        >
          {stats.map((stat, index) => (
            <div
              key={index}
              className={`rounded-lg bg-white/10 backdrop-blur-sm py-6 px-4 text-center
                transition-all duration-500 hover:bg-white/20 hover:scale-105
                ${visibleItems.has(index) 
                  ? 'opacity-100 translate-y-0' 
                  : 'opacity-0 translate-y-8'
                }`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <div className="text-3xl md:text-4xl font-light text-[#00B307] mb-1">
                {stat.value}
              </div>
              <div className="text-white text-sm">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Stats;
