import {
  Facebook,
  Instagram,
  Paintbrush as Pinterest,
  Twitter,
} from "lucide-react";

export default function Footer() {
  const instagramImages = [
    "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=150&h=150&fit=crop",
    "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=150&h=150&fit=crop",
    "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=150&h=150&fit=crop",
    "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=150&h=150&fit=crop",
    "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=150&h=150&fit=crop",
    "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=150&h=150&fit=crop",
    "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=150&h=150&fit=crop",
    "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=150&h=150&fit=crop",
  ];

  

  return (
    <footer className="bg-[#002603] text-gray-700 relative overflow-hidden">
      {/* Left Side Image */}
      <img
        src="/footer-left.png"
        alt=""
        className="absolute -left-15 -bottom-8  h-105  hidden lg:block pointer-events-none"
      />

      {/* Right Side Image */}
      <img
        src="/footer-right.png"
        alt=""
        className="absolute -right-25 -bottom-12 h-105  hidden lg:block pointer-events-none"
      />

      <div className="max-w-11/12 mx-auto px-4 py-12 relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-6 gap-2 mb-12">
          {/* About */}
          
          <div className="col-span-2">
            <h4 className="text-white font-semibold mb-5">About Shopery</h4>
            <p className="text-sm leading-relaxed mb-6 text-[#7A997C] w-[80%]">
              Morbi cursus porttitor enim lobortis molestie. Duis gravida turpis dui, eget bibendum magna congue nec.
            </p>

            <div className="flex  gap-2 mb-6 items-center">
              <span className="border-b-2 border-green-500  text-white px-4 py-2 rounded text-sm">
                (219) 555-0114
              </span>
              <p className="text-white" >or</p>
              <span className="border-b-2 border-green-500  text-white px-4 py-2 rounded text-sm">
                proxy@gmail.com
              </span>
            </div>

           
          </div>

          {/* Links */}
          <div className="col-span-1">
            <h4 className="text-white font-semibold mb-5">My Account</h4>
            <ul className="space-y-3 text-sm ">
              <li className="text-[#7A997C] hover:text-white">My Account</li>
              <li className="text-[#7A997C] hover:text-white">Order History</li>
              <li className="text-[#7A997C] hover:text-white">Shopping Cart</li>
              <li className="text-[#7A997C] hover:text-white">Wishlist</li>
            </ul>
          </div>
           {/* Helps */}
          <div  className="col-span-1">
            <h4 className="text-white font-semibold mb-5">Helps</h4>
            <ul className="space-y-3 text-sm ">
              <li className="text-[#7A997C] hover:text-white">Contact</li>
              <li className="text-[#7A997C] hover:text-white">Faqs</li>
              <li className="text-[#7A997C] hover:text-white">Terms & Condition</li>
              <li className="text-[#7A997C] hover:text-white">Privacy Policy</li>
            </ul>
          </div>

          {/* Proxy */}
          <div className="col-span-1">
            <h4 className="text-white font-semibold mb-5">Proxy</h4>
            <ul className="space-y-3 text-sm ">
              <li className="text-[#7A997C] hover:text-white">About</li>
              <li className="text-[#7A997C] hover:text-white">Shop</li>
              <li className="text-[#7A997C] hover:text-white">Product</li>
              <li className="text-[#7A997C] hover:text-white">Track Order</li>
            </ul>
          </div>

          {/* Instagram */}
          <div className="col-span-1">
            <h4 className="text-white font-semibold mb-5">
              Instagram
            </h4>
            <div className="grid grid-cols-4 gap-2">
              {instagramImages.map((img, i) => (
                <img
                  key={i}
                  src={img}
                  alt=""
                  className="rounded object-cover"
                />
              ))}
            </div>
          </div>
        </div>

        <div className="border-t border-green-900 mt-12 pt-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex gap-3">
            {[Facebook, Twitter, Pinterest, Instagram].map((Icon, i) => (
              <a
                key={i}
                href="#"
                className="w-9 h-9 bg-green-500 rounded-full flex items-center justify-center text-white"
              >
                <Icon size={16} />
              </a>
            ))}
          </div>
          <p className="text-sm text-[#7A997C]">
            Shopery © 2026. All Rights Reserved
          </p>

          <div className="flex gap-3">
            <img src="/Visa.png" className="h-6" />
            <img src="/Mastercard.png" className="h-6" />
            <img src="/Discover.png" className="h-6" />
            <img src="/ApplePay.png" className="h-6" />
          </div>
        </div>
      </div>
    </footer>
  );
}
