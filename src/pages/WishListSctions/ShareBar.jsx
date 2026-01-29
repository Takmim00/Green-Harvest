import { BsInstagram, BsTwitterX } from "react-icons/bs";
import { FaFacebook, FaFacebookF, FaPinterest } from "react-icons/fa";
import { FaPinterestP } from "react-icons/fa6";
import { ImInstagram } from "react-icons/im";

const ShareBar = () => {
  return (
    <div className="flex items-center last:border-0 gap-3 mt-4 pt-4 border-t border-gray-100 px-6 pb-6">
      <span className="text-gray-600 text-sm font-medium">Share:</span>

      <div className="flex items-center gap-2">
        <div className="w-8 h-8 hover:bg-[#00B207] text-gray-600 hover:text-white rounded-full flex items-center justify-center">
          <FaFacebookF size={20}/>
        </div>
        <div className="w-8 h-8 text-gray-500 hover:bg-green-500 hover:text-white rounded-full flex items-center justify-center">
          <BsTwitterX  size={20}/>
        </div>
        <div className="w-8 h-8 text-gray-500 hover:bg-green-500 hover:text-white rounded-full flex items-center justify-center">
          <FaPinterestP size={20}/>
        </div>
        <div className="w-8 h-8 text-gray-500 hover:bg-green-500 hover:text-white rounded-full flex items-center justify-center">
          <BsInstagram size={20}/>
        </div>
      </div>
    </div>
  );
};

export default ShareBar;
