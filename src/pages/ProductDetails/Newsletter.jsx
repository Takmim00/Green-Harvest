import React, { useState } from "react";
import { BsInstagram, BsTwitterX } from "react-icons/bs";
import { FaFacebook } from "react-icons/fa";
import { PiIntersect } from "react-icons/pi";

const Newsletter = () => {
  const [email, setEmail] = useState("");

  const handleSubscribe = (e) => {
    e.preventDefault();

    if (!email) return;

    alert(`Successfully subscribed: ${email}`);
    setEmail("");
  };

  return (
    <div className="bg-white border border-gray-100 rounded-xl">
      <div className="flex flex-col lg:flex-row items-center justify-between gap-8 px-8 py-10 bg-[#F9F9F9] rounded-xl overflow-hidden">
        
        {/* Left */}
        <div className="flex-1 max-w-md text-center lg:text-left">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Subscribe our Newsletter
          </h2>
          <p className="text-sm text-gray-500 leading-relaxed">
            Pellentesque eu nibh eget mauris congue mattis mattis nec tellus.
            Phasellus imperdiet elit eu magna.
          </p>
        </div>

        {/* Center */}
        <div className="flex-[1.5] w-full max-w-xl">
          <form
            onSubmit={handleSubscribe}
            className="relative flex items-center bg-white rounded-full border border-gray-200 shadow-sm p-1"
          >
            <input
              type="email"
              placeholder="Your email address"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-1 bg-transparent px-6 py-3 text-gray-700 outline-none placeholder:text-gray-400 text-sm"
            />
            <button
              type="submit"
              className="bg-[#00B207] hover:bg-[#009e06] text-white px-8 py-3 rounded-full font-semibold text-sm transition-all active:scale-95"
            >
              Subscribe
            </button>
          </form>
        </div>

        {/* Right */}
        <div className="flex items-center gap-4 lg:gap-6">
            
          <a className="w-10 h-10 flex items-center justify-center rounded-full bg-[#00B207] text-white hover:bg-white hover:text-[#00B207] border border-[#00B207] transition">
            <FaFacebook size={18} />
          </a>
          <a className="text-gray-600 hover:text-[#00B207] transition">
            <BsTwitterX size={18} />
          </a>
          <a className="text-gray-600 hover:text-[#00B207] transition">
            <PiIntersect size={18} />
          </a>
          <a className="text-gray-600 hover:text-[#00B207] transition">
            <BsInstagram size={18} />
          </a>
        </div>

      </div>
    </div>
  );
};

export default Newsletter;
