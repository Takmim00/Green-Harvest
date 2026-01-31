import { Mail, MapPin, Phone } from "lucide-react";
import { useState } from "react";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission
    console.log("Form submitted:", formData);
    alert("Message sent successfully!");
    setFormData({ name: "", email: "", subject: "", message: "" });
  };

  return (
    <div>
      {/* Contact Section */}
      <div className="lg:max-w-7xl max-w-11/12 mx-auto px-4 py-16">
        <div className="">
          <div className="grid md:grid-cols-3 gap-12">
            {/* Left Side - Contact Info */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-8 md:p-12 space-y-8 col-span-1">
              {/* Address */}
              <div className="flex flex-col items-center text-center">
                <div className="w-12 h-12 rounded-full bg-white border border-gray-200 flex items-center justify-center mb-4 shadow-sm">
                  <MapPin className="w-5 h-5 text-green-500" />
                </div>
                <p className="text-gray-700 font-medium">
                  2715 Ash Dr. San Jose, South
                </p>
                <p className="text-gray-700 font-medium">Dakota 83475</p>
              </div>

              {/* Email */}
              <div className="flex flex-col items-center text-center">
                <div className="w-12 h-12 rounded-full bg-white border border-gray-200 flex items-center justify-center mb-4 shadow-sm">
                  <Mail className="w-5 h-5 text-green-500" />
                </div>
                <p className="text-gray-700 font-medium">Proxy@gmail.com</p>
                <p className="text-gray-700 font-medium">
                  Help.proxy@gmail.com
                </p>
              </div>

              {/* Phone */}
              <div className="flex flex-col items-center text-center">
                <div className="w-12 h-12 rounded-full bg-white border border-gray-200 flex items-center justify-center mb-4 shadow-sm">
                  <Phone className="w-5 h-5 text-green-500" />
                </div>
                <p className="text-gray-700 font-medium">(219) 555-0114</p>
                <p className="text-gray-700 font-medium">(164) 333-0487</p>
              </div>
            </div>

            {/* Right Side - Contact Form */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-8 md:p-12 md:col-span-2">
              <h2 className="text-2xl font-semibold text-gray-900 mb-2">
                Just Say Hello!
              </h2>
              <p className="text-gray-500 text-sm mb-6">
                Do you fancy saying hi to me or you want to get started with
                your project and you need my help? Feel free to contact me.
              </p>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <input
                    type="text"
                    name="name"
                    placeholder="Template Cookie"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent text-sm"
                    required
                  />
                  <input
                    type="email"
                    name="email"
                    placeholder="zakirsoft@gmail.com"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent text-sm"
                    required
                  />
                </div>

                <input
                  type="text"
                  name="subject"
                  placeholder="Subjects"
                  value={formData.subject}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent text-sm"
                />

                <textarea
                  name="message"
                  placeholder="Hello!"
                  value={formData.message}
                  onChange={handleChange}
                  rows={4}
                  className="w-full px-4 py-3 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent text-sm resize-none"
                  required
                />

                <button
                  type="submit"
                  className="bg-green-500 hover:bg-green-600 text-white font-semibold py-3 px-8 rounded-full transition-colors duration-200"
                >
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* Google Map Section */}
      <div className="w-full h-100">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d126743.58582118916!2d79.7861655!3d6.9218374!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ae253d10f7a7003%3A0x320b2e4d32d3838d!2sColombo%2C%20Sri%20Lanka!5e0!3m2!1sen!2sus!4v1706000000000!5m2!1sen!2sus"
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="Google Maps Location"
        />
      </div>
    </div>
  );
}
