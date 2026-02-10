import { Eye, EyeOff, Upload } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
const API = "https://green-harvest-backend-seven.vercel.app/api/auth/users/me/";
export default function AccountSettings() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [savingBilling, setSavingBilling] = useState(false);
  const [changingPassword, setChangingPassword] = useState(false);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    street: "",
    city: "",
    zipCode: "",
    country: "",
    image: null,
  });

  const [profileImage, setProfileImage] = useState("");

  // 🔹 Load user
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem("access");

        const res = await fetch(API, {
          headers: { Authorization: `Bearer ${token}` },
        });

        const data = await res.json();

        setFormData({
          firstName: data.first_name || "",
          lastName: data.last_name || "",
          email: data.email || "",
          phone: data.phone || "",
          street: data.street_address || "",
          city: data.city || "",
          zipCode: data.postcode || "",
          country: data.country || "",
          image: null,
        });

        setProfileImage(data.image);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  // 🔹 common input change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // 🔹 image change
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setFormData({ ...formData, image: file });
    setProfileImage(URL.createObjectURL(file));
  };

  // 🔹 Account info save
  const handleSaveChanges = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      const token = localStorage.getItem("access");

      const body = new FormData();
      body.append("first_name", formData.firstName);
      body.append("last_name", formData.lastName);
      body.append("phone", formData.phone);
      if (formData.image) body.append("image", formData.image);

      const res = await fetch(API, {
        method: "PATCH",
        headers: { Authorization: `Bearer ${token}` },
        body,
      });

      if (!res.ok) throw new Error();

      toast.success("Account information updated ");
    } catch {
      toast.error("Account information Update failed ");
    } finally {
      setSaving(false);
    }
  };

  // 🔹 Billing save
  const handleBillingChange = async (e) => {
    e.preventDefault();
    setSavingBilling(true);
    try {
      const token = localStorage.getItem("access");

      const res = await fetch(API, {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          street_address: formData.street,
          city: formData.city,
          country: formData.country,
          postcode: formData.zipCode,
        }),
      });

      if (!res.ok) throw new Error();

      toast.success("Billing information updated");
    } catch {
      toast.error("Billing update failed ❌");
    } finally {
      setSavingBilling(false);
    }
  };

  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [showPasswords, setShowPasswords] = useState({
    current: false,
    new: false,
    confirm: false,
  });

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswordData({
      ...passwordData,
      [name]: value,
    });
  };

  const togglePasswordVisibility = (field) => {
    setShowPasswords({
      ...showPasswords,
      [field]: !showPasswords[field],
    });
  };

  const handleChangePassword = async (e) => {
    e.preventDefault();

    if (passwordData.newPassword !== passwordData.confirmPassword) {
      toast.error("New password and confirm password do not match!");
      return;
    }
    setChangingPassword(true);

    try {
      const token = localStorage.getItem("access");

      const res = await fetch(
        "https://green-harvest-backend-seven.vercel.app/api/auth/users/set_password/",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            current_password: passwordData.currentPassword,
            new_password: passwordData.newPassword,
          }),
        },
      );

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data?.detail || "Password change failed");
      }

      toast.success("Password changed successfully!");

      setPasswordData({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
    } catch (err) {
      toast.error(err.message || "Password change failed!");
    } finally {
      setChangingPassword(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center py-20 min-h-screen">
        <div className="w-10 h-10 border-4 border-t-green-600 border-gray-200 rounded-full animate-spin" />
      </div>
    );
  }
  return (
    <div className=" bg-gray-50 ">
      <div className="bg-white rounded-lg shadow-sm p-8">
        {/* Header */}
        <h1 className="text-3xl font-bold text-gray-900 mb-8">
          Account Settings
        </h1>

        {/* 2-Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Left Column - Form Fields */}
          <div className="order-2 lg:order-1">
            <form onSubmit={handleSaveChanges} className="space-y-4">
              {/* First Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  First name
                </label>
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition-all"
                  placeholder="Enter your first name"
                />
              </div>

              {/* Last Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Last Name
                </label>
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition-all"
                  placeholder="Enter your last name"
                />
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  readOnly
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition-all cursor-not-allowed"
                  placeholder="Enter your email"
                />
              </div>

              {/* Phone Number */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Phone Number
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition-all"
                  placeholder="Enter your phone number"
                />
              </div>

              {/* Save Changes Button */}
              <button
                type="submit"
                disabled={saving}
                className="w-full sm:w-auto px-6 py-3 bg-green-600 text-white font-semibold rounded-full hover:bg-green-700 transition-colors cursor-pointer"
              >
                {saving ? "Saving..." : "Save Changes"}
              </button>
            </form>
          </div>

          {/* Right Column - Profile Image */}
          <div className="flex flex-col items-center justify-start lg:justify-center order-1 lg:order-2">
            <div className="relative">
              {/* Profile Image */}
              <img
                src={profileImage || "/placeholder.svg"}
                alt="Profile"
                className="w-60 h-60 rounded-full object-cover border-4 border-gray-200"
              />
            </div>

            {/* Choose Image Button */}
            <label className="mt-6 px-6 py-3 border-2 border-green-600 text-green-600 font-semibold rounded-full hover:bg-green-50 transition-colors cursor-pointer flex items-center gap-2">
              <Upload size={20} />
              Choose Image
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
              />
            </label>
          </div>
        </div>
      </div>

      {/* Billing Address Section */}
      <div className="mt-8 pt-12 bg-white rounded-lg shadow-sm p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-8">
          Billing Address
        </h2>

        <form onSubmit={handleBillingChange} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Street Address
              </label>
              <input
                type="text"
                name="street"
                value={formData.street}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#00B250] focus:border-transparent outline-none transition-all"
                placeholder="4140 Parker Rd."
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                City / Town
              </label>
              <input
                type="text"
                name="city"
                value={formData.city}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#00B250] focus:border-transparent outline-none transition-all"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Country
              </label>
              <input
                type="text"
                name="country"
                value={formData.country}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#00B250] focus:border-transparent outline-none transition-all"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Zip Code
              </label>
              <input
                type="text"
                name="zipCode"
                value={formData.zipCode}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#00B250] focus:border-transparent outline-none transition-all"
              />
            </div>
          </div>

          <button
            disabled={savingBilling}
            className="px-6 py-3 bg-[#00B250] text-white font-semibold rounded-full hover:bg-[#009a42] transition-colors cursor-pointer"
          >
            {savingBilling ? "Saving..." : "Save Address"}
          </button>
        </form>
      </div>

      {/* Change Password Section */}
      <div className="mt-8 pt-12 bg-white rounded-lg shadow-sm p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-8">
          Change Password
        </h2>

        <form onSubmit={handleChangePassword} className="space-y-4 ">
          {/* Current Password */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Current Password
            </label>
            <div className="relative">
              <input
                type={showPasswords.current ? "text" : "password"}
                name="currentPassword"
                value={passwordData.currentPassword}
                onChange={handlePasswordChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition-all"
                placeholder="Enter current password"
              />
              <button
                type="button"
                onClick={() => togglePasswordVisibility("current")}
                className="absolute right-3 top-3 text-gray-500 hover:text-gray-700"
              >
                {showPasswords.current ? (
                  <EyeOff size={20} />
                ) : (
                  <Eye size={20} />
                )}
              </button>
            </div>
          </div>

          {/* New Password & Confirm Password */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                New Password
              </label>
              <div className="relative">
                <input
                  type={showPasswords.new ? "text" : "password"}
                  name="newPassword"
                  value={passwordData.newPassword}
                  onChange={handlePasswordChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition-all"
                  placeholder="Enter new password"
                />
                <button
                  type="button"
                  onClick={() => togglePasswordVisibility("new")}
                  className="absolute right-3 top-3 text-gray-500 hover:text-gray-700"
                >
                  {showPasswords.new ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Confirm Password
              </label>
              <div className="relative">
                <input
                  type={showPasswords.confirm ? "text" : "password"}
                  name="confirmPassword"
                  value={passwordData.confirmPassword}
                  onChange={handlePasswordChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition-all"
                  placeholder="Confirm new password"
                />
                <button
                  type="button"
                  onClick={() => togglePasswordVisibility("confirm")}
                  className="absolute right-3 top-3 text-gray-500 hover:text-gray-700"
                >
                  {showPasswords.confirm ? (
                    <EyeOff size={20} />
                  ) : (
                    <Eye size={20} />
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* Change Password Button */}
          <button
            type="submit"
            disabled={changingPassword}
            className="w-full sm:w-auto px-6 py-3 bg-green-600 text-white font-semibold rounded-full hover:bg-green-700 transition-colors cursor-pointer"
          >
            {changingPassword ? "Changing..." : "Change Password"}
          </button>
        </form>
      </div>
    </div>
  );
}
