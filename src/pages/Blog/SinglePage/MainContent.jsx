import { ArrowRight, MessageCircle, Tag, User } from "lucide-react";
import React, { useState } from "react";
import { BsTwitterX } from "react-icons/bs";
import { FaFacebookF, FaPinterestP } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa6";
import { ImInstagram } from "react-icons/im";
import { IoMdLink } from "react-icons/io";

const comments = [
  {
    id: 1,
    avatar: "https://picsum.photos/seed/devon/40/40",
    author: "Annette Black",
    date: "26 Apr, 2021",
    text: "In a nisi commodo, porttitor ligula consequat, tincidunt dui. Nulla volutpat, metus eu aliquam malesuada, elit libero venenatis urna, consequat maximus arcu diam non diam.",
  },
];

const MainContent = ({ post }) => {
  const [formData, setFormData] = useState({
    fullName: "Zakir Hossen",
    email: "zakirsoft.20@gmail.com",
    message: "",
    saveInfo: false,
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.fullName || !formData.message) return;

    onsubmit({
      fullName: formData.fullName,
      message: formData.message,
    });
    setFormData((prev) => ({ ...prev, message: "" }));
  };
  return (
    <div className="flex-1 space-y-10">
      {/* Main Article Card */}
      <article className=" overflow-hidden transition-all duration-500">
        <div className="relative group overflow-hidden h-112.5 rounded">
          <img
            src={post.image}
            alt={post.title}
            className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-[1.5s]"
          />
        </div>

        <div className="p-5">
          <div className="flex flex-wrap items-center gap-6 text-sm text-gray-400 mb-6">
            <div className="flex items-center gap-2 group cursor-pointer">
              <Tag size={16} className="text-green-500" />
              <span className="group-hover:text-green-600 transition-colors">
                By {post.author}
              </span>
            </div>
            <div className="flex items-center gap-2 group cursor-pointer">
              <User size={16} className="text-green-500" />
              <span className="group-hover:text-green-600 transition-colors">
                By {post.author}
              </span>
            </div>
            <div className="flex items-center gap-2 group cursor-pointer">
              <MessageCircle size={16} className="text-green-500" />
              <span className="group-hover:text-green-600 transition-colors">
                {post.comments} Comments
              </span>
            </div>
          </div>
        </div>
        <div className="mb-10">
          <h1 className="text-3xl md:text-4xl font-semibold leading-tight mb-8 text-gray-900">
            Maecenas tempor urna sed quam mollis, a placerat dui fringill
            Suspendisse.
          </h1>
          <div className="flex flex-wrap items-center justify-between border-b border-gray-100 pb-6 gap-4">
            {/* Author Info */}
            <div className="flex items-center space-x-4">
              <img
                src={post.author}
                alt={post.name}
                className="w-12 h-12 rounded-full object-cover grayscale"
              />
              <div>
                <p className="font-semibold text-gray-900">{post.name}</p>
                <p className="text-sm text-gray-400 font-medium">
                  {post.date} <span className="mx-1">•</span> {post.readTime}
                </p>
              </div>
            </div>
            {/* Social Icons */}
            <div className="flex items-center space-x-4 text-gray-400">
              <a href="#" className="hover:text-blue-600 transition">
                <FaFacebookF size={20} />
              </a>
              <a href="#" className="hover:text-green-500 transition">
                <BsTwitterX size={20} />
              </a>
              <a href="#" className="hover:text-red-600 transition">
                <FaPinterestP size={20} />
              </a>
              <a href="#" className="hover:text-blue-400 transition">
                <FaInstagram size={20} />
              </a>
              <a href="#" className="hover:text-black transition">
                <IoMdLink size={20} />
              </a>
            </div>
          </div>
        </div>

        <div className="space-y-8 text-gray-700 leading-relaxed">
          <p className="font-bold text-gray-900">
            Maecenas lacinia felis nec placerat sollicitudin. Quisque placerat
            dolor at scelerisque imperdiet. Phasellus tristique felis dolor.
          </p>

          <p>
            Maecenas elementum in risus sed condimentum. Duis convallis ante ac
            tempus maximus. Fusce malesuada sed velit ut dictum. Morbi faucibus
            vitae orci at euismod. Integer auctor augue in erat vehicula, quis
            fermentum ex finibus.
          </p>

          <p>
            Mauris pretium elit a dui pulvinar, in ornare sapien euismod. Nullam
            interdum nisl ante, id feugiat quam euismod commodo. Sed ultrices
            lectus id iaculis rhoncus. Aenean non dignissim justo, at fermentum
            turpis. Sed molestie, ligula ut molestie ultrices, tellus ligula
            viverra neque, malesuada consectetur diam sapien volutpat risus.
            Quisque eget tortor lobortis, facilisis metus eu, elementum est.
            Nunc sit amet erat quis ex convallis suscipit. Ut ridiculus mus.
          </p>

          {/* Featured Images Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-10">
            <div className="overflow-hidden rounded-xl h-80">
              <img
                src="https://picsum.photos/id/1080/800/600"
                alt="Fresh Oranges"
                className="w-full h-full object-cover hover:scale-105 transition duration-500"
              />
            </div>
            <div className="overflow-hidden rounded-xl h-80">
              <img
                src="https://picsum.photos/id/102/800/600"
                alt="Cut Mangoes"
                className="w-full h-full object-cover hover:scale-105 transition duration-500"
              />
            </div>
          </div>

          <p>
            Sed dictum non nulla eu imperdiet. Duis elit libero, vulputate quis
            vehicula ut, vestibulum ut mauris. Nullam non felis varius dui
            rutrum rutrum in a nisi. Suspendisse elementum rutrum lorem sed
            luctus. Proin iaculis euismod metus non sollicitudin. Duis vel
            luctus lacus. Nullam faucibus iaculis convallis. In ullamcorper nibh
            ipsum, eget lacinia eros pulvinar a. Integer accumsan arcu nec
            faucibus ultricies.
          </p>
        </div>

        {/* Promotional Banner */}
        <section className="mb-12">
          <div className="relative w-full h-64 md:h-80 rounded-xl overflow-hidden shadow-lg bg-black">
            {/* Background Image/Gradient */}
            <div
              className="absolute inset-0 bg-cover bg-center opacity-80"
              style={{
                backgroundImage: `url('https://images.unsplash.com/photo-1610832958506-aa56368176cf?q=80&w=1200&auto=format&fit=crop')`,
                backgroundPosition: "right",
              }}
            />
            <div className="absolute inset-0 bg-linear-to-r from-black via-black/70 to-transparent" />

            {/* Content */}
            <div className="relative h-full flex items-center px-8 md:px-16">
              <div className="max-w-xs space-y-4">
                <div>
                  <span className="text-gray-400 text-xs font-semibold tracking-widest uppercase">
                    SUMMER SALES
                  </span>
                  <h1 className="text-4xl md:text-5xl font-bold text-white mt-1">
                    Fresh Fruit
                  </h1>
                </div>

                <button className="flex items-center gap-2 bg-[#00B207] hover:bg-[#009406] text-white px-6 py-3 rounded-full font-semibold transition-colors">
                  Shop Now
                  <ArrowRight size={18} />
                </button>
              </div>

              {/* Discount Circle */}
              <div className="hidden sm:flex absolute right-16 top-1/2 -translate-y-1/2 flex-col items-center justify-center w-28 h-28 rounded-full bg-black/50 backdrop-blur-sm text-white">
                <span className="text-xs text-gray-400 uppercase tracking-tighter">
                  UP TO
                </span>
                <span className="text-3xl font-bold text-[#FF8A00]">56%</span>
                <span className="text-sm font-medium">Off</span>
              </div>
            </div>
          </div>
        </section>

        {/* Leave a Comment Form */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-6">Leave a Comment</h2>
          <form onSubmit={handleSubmit} className="space-y-4 p-1">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-sm font-medium text-gray-700">
                  Full Name
                </label>
                <input
                  type="text"
                  value={formData.fullName}
                  onChange={(e) =>
                    setFormData({ ...formData, fullName: e.target.value })
                  }
                  placeholder="Your name"
                  className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#00B207] transition-all"
                />
              </div>
              <div className="space-y-1">
                <label className="text-sm font-medium text-gray-700">
                  Email
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  placeholder="Your email"
                  className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#00B207] transition-all"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-sm font-medium text-gray-700">
                Message
              </label>
              <textarea
                rows={5}
                value={formData.message}
                onChange={(e) =>
                  setFormData({ ...formData, message: e.target.value })
                }
                placeholder="Write your comment here..."
                className="w-full px-4 py-4 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#00B207] transition-all resize-none"
              />
            </div>

            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="save-info"
                checked={formData.saveInfo}
                onChange={(e) =>
                  setFormData({ ...formData, saveInfo: e.target.checked })
                }
                className="w-4 h-4 rounded border-gray-300 text-[#00B207] focus:ring-[#00B207]"
              />
              <label htmlFor="save-info" className="text-sm text-gray-500">
                Save my name and email in this browser for the next time I
                comment.
              </label>
            </div>

            <button
              type="submit"
              className="bg-[#00B207] hover:bg-[#009406] text-white px-8 py-3 rounded-full font-bold transition-all shadow-md active:scale-95"
            >
              Post Comments
            </button>
          </form>
        </section>

        {/* Comments List */}
        <section>
          <h2 className="text-2xl font-semibold mb-6">Comments</h2>
          <div className="space-y-6">
            <div className="space-y-6">
              {comments.map((comment) => (
                <div
                  key={comment.id}
                  className="border-b border-gray-100 pb-6 last:border-0"
                >
                  <div className="flex gap-4">
                    <img
                      src={comment.avatar}
                      alt={comment.author}
                      className="w-10 h-10 rounded-full object-cover shrink-0"
                    />
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="font-bold text-gray-900">
                          {comment.author}
                        </h4>
                        <span className="text-gray-400 text-sm">•</span>
                        <span className="text-gray-400 text-sm">
                          {comment.date}
                        </span>
                      </div>
                      <p className="text-gray-600 leading-relaxed text-sm">
                        {comment.text}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex justify-start pt-4">
              <button className="px-8 py-2 border-2 border-[#00B207] text-[#00B207] rounded-full font-bold hover:bg-[#00B207] hover:text-white transition-all active:scale-95">
                Load More
              </button>
            </div>
          </div>
        </section>
      </article>
    </div>
  );
};

export default MainContent;
