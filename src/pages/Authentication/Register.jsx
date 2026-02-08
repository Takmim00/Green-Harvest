import { Eye, EyeOff } from "lucide-react";
import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router";
import { AuthContext } from "../../routes/provider/AuthProvider";
import { toast } from "react-toastify";

export default function Register() {
  const { registerUser, loading } = useContext(AuthContext);
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    terms: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    if (!formData.terms) {
      toast.error("Please accept Terms & Conditions");
      return;
    }

    const success = await registerUser({
      email: formData.email,
      password: formData.password,
    });
    console.log(success);

    if (success) {
      navigate("/");
    }
  };

  return (
    <div className=" md:min-h-screen flex items-center justify-center bg-gray-50 px-4 py-4 md:py-0">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-white rounded-xl shadow-lg p-8"
      >
        {/* Title */}
        <h2 className="text-2xl font-semibold text-center mb-6">
          Create Account
        </h2>

        {/* Email */}
        <div className="mb-4">
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email"
            required
            disabled={loading}
            className="w-full px-4 py-3 border border-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>

        {/* Password */}
        <div className="mb-4 relative">
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Password"
            required
            disabled={loading}
            className="w-full px-4 py-3 border border-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500"
          >
            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        </div>

        {/* Confirm Password */}
        <div className="mb-4 relative">
          <input
            type={showConfirm ? "text" : "password"}
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            placeholder="Confirm Password"
            required
            disabled={loading}
            className="w-full px-4 py-3 border border-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
          />
          <button
            type="button"
            onClick={() => setShowConfirm(!showConfirm)}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500"
          >
            {showConfirm ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        </div>

        {/* Terms */}
        <div className="flex items-center gap-2 text-sm text-gray-600 mb-6">
          <input
            type="checkbox"
            name="terms"
            checked={formData.terms}
            onChange={handleChange}
            className="accent-green-600"
          />
          <span>
            Accept all{" "}
            <span className="text-gray-900 font-medium cursor-pointer">
              Terms & Conditions
            </span>
          </span>
        </div>

        {/* Button */}
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-green-600 text-white py-3 rounded-full font-medium hover:bg-green-700 transition disabled:opacity-60"
        >
          {loading ? "Creating account..." : "Create Account"}
        </button>

        {/* Login */}
        <p className="text-center text-sm text-gray-500 mt-6">
          Already have account?{" "}
          <Link
            to="/signin"
            className="text-green-600 font-medium hover:underline"
          >
            Login
          </Link>
        </p>
      </form>
    </div>
  );
}
