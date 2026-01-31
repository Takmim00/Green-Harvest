import { Minus, Plus } from "lucide-react";
import { useState } from "react";

const faqData = [
  {
    id: 1,
    question: "In elementum est a ante sodales iaculis.",
    answer:
      "Morbi porttitor ligula in nunc varius sagittis. Proin dui nisi, laoreet ut tempor ac, cursus vitae eros. Cras quis ultricies elit. Proin ac lectus arcu. Maecenas aliquet vel tellus at accumsan. Donec a eros non massa vulputate ornare. Vivamus ornare commodo ante, at commodo felis congue vitae.",
  },
  {
    id: 2,
    question: "Etiam lobortis massa eu nibh tempor elementum.",
    answer:
      "Morbi porttitor ligula in nunc varius sagittis. Proin dui nisi, laoreet ut tempor ac, cursus vitae eros. Cras quis ultricies elit. Proin ac lectus arcu. Maecenas aliquet vel tellus at accumsan.",
  },
  {
    id: 3,
    question: "In elementum est a ante sodales iaculis.",
    answer:
      "Morbi porttitor ligula in nunc varius sagittis. Proin dui nisi, laoreet ut tempor ac, cursus vitae eros. Cras quis ultricies elit. Proin ac lectus arcu.",
  },
  {
    id: 4,
    question: "Aenean quis quam nec lacus semper dignissim.",
    answer:
      "Morbi porttitor ligula in nunc varius sagittis. Proin dui nisi, laoreet ut tempor ac, cursus vitae eros. Cras quis ultricies elit.",
  },
  {
    id: 5,
    question: "Nulla tincidunt eros id tempus accumsan.",
    answer:
      "Morbi porttitor ligula in nunc varius sagittis. Proin dui nisi, laoreet ut tempor ac, cursus vitae eros. Cras quis ultricies elit. Proin ac lectus arcu. Maecenas aliquet vel tellus at accumsan.",
  },
];

const FAQ = () => {
  const [openId, setOpenId] = useState(1);

  const toggleFaq = (id) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <div>
      <div className="max-w-7xl mx-auto px-4 pt-16">
        <div className="flex flex-col lg:flex-row items-start gap-8">
          {/* Left Side - FAQ Content */}
          <div className="w-full lg:w-[55%]">
            <h1 className="text-[32px] md:text-[40px] font-semibold text-gray-900 leading-tight mb-8">
              Welcome, Let's Talk
              <br />
              About Our Ecobazar
            </h1>

            <div className="space-y-0">
              {faqData.map((faq) => (
                <div key={faq.id} className="border-b border-gray-200">
                  <button
                    onClick={() => toggleFaq(faq.id)}
                    className="w-full flex items-center justify-between py-4 text-left"
                  >
                    <span
                      className={`text-[15px] font-medium ${
                        openId === faq.id ? "text-[#00B207]" : "text-gray-800"
                      }`}
                    >
                      {faq.question}
                    </span>
                    <span className="ml-4 shrink-0">
                      {openId === faq.id ? (
                        <Minus className="w-4 h-4 text-[#00B207]" />
                      ) : (
                        <Plus className="w-4 h-4 text-[#00B207]" />
                      )}
                    </span>
                  </button>

                  {openId === faq.id && (
                    <div className="pb-4">
                      <p className="text-[14px] text-gray-500 leading-relaxed">
                        {faq.answer}
                      </p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Right Side - Image */}
          <div className="w-full lg:w-[45%] flex justify-center lg:justify-end">
            <img
              src="/faqFarmer.png"
              alt="Farmer holding fresh vegetables"
              className="max-w-full h-auto object-contain"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default FAQ;
