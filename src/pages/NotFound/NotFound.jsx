import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-white px-4">
      <div className="text-center max-w-xl w-full">
        
        {/* Image */}
        <div className="flex justify-center mb-6">
          <img
            src="/404.png" // 🔥 replace with your 404 image path
            alt="404 Not Found"
            className="w-64 sm:w-80 md:w-96"
          />
        </div>

        {/* 404 Text */}
        <h1 className="text-7xl sm:text-8xl font-extrabold text-green-500 mb-4">
          404
        </h1>

        {/* Title */}
        <h2 className="text-2xl sm:text-3xl font-semibold text-gray-900 mb-2">
          Oops! page not found
        </h2>

        {/* Description */}
        <p className="text-gray-500 text-sm sm:text-base mb-6">
          Ut consequat ac tortor eu vehicula. Aenean accumsan purus eros.
          Maecenas sagittis tortor at metus mollis.
        </p>

        {/* Button */}
        <Link
          to="/"
          className="inline-block bg-green-500 hover:bg-green-600 text-white font-medium px-6 py-3 rounded-full transition duration-300"
        >
          Back to Home
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
