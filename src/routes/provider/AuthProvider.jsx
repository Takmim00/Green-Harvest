import axios from "axios";
import { createContext, useState } from "react";
import { toast } from "react-toastify";

export const AuthContext = createContext(null);

const API = "https://green-harvest-backend-seven.vercel.app/api/auth";

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const stored = localStorage.getItem("user");
    return stored ? JSON.parse(stored) : null;
  });

  const [loading, setLoading] = useState(false);

  // 🔐 REGISTER
  const registerUser = async ({ email, password }) => {
    try {
      setLoading(true);

      // 1. Register
      await axios.post(`${API}/users/`, { email, password });

      // 2. Auto login
      const res = await axios.post(`${API}/jwt/create/`, {
        email,
        password,
      });

      localStorage.setItem("access", res.data.access);
      localStorage.setItem("refresh", res.data.refresh);

      // 3. Fetch profile
      const userRes = await axios.get(`${API}/users/me/`, {
        headers: {
          Authorization: `Bearer ${res.data.access}`,
        },
      });

      setUser(userRes.data);
      localStorage.setItem("user", JSON.stringify(userRes.data));

      toast.success("Account created successfully!");
      return true;
    } catch (err) {
      toast.error(err.response?.data?.detail || "Registration failed");
      return false;
    } finally {
      setLoading(false);
    }
  };

  // 🔑 LOGIN
  const loginUser = async (email, password) => {
    try {
      setLoading(true);

      const res = await axios.post(`${API}/jwt/create/`, { email, password });

      localStorage.setItem("access", res.data.access);
      localStorage.setItem("refresh", res.data.refresh);

      const userRes = await axios.get(`${API}/users/me/`, {
        headers: {
          Authorization: `Bearer ${res.data.access}`,
        },
      });

      setUser(userRes.data);
      localStorage.setItem("user", JSON.stringify(userRes.data));

      toast.success("Login successful!");
      return true;
    } catch (err) {
      toast.error("Invalid email or password");
      return false;
    } finally {
      setLoading(false);
    }
  };

  // 🚪 LOGOUT
  const logout = () => {
    localStorage.removeItem("access");
    localStorage.removeItem("refresh");
    localStorage.removeItem("user");
    setUser(null);
    toast.info("Logged out");
    
  };
  const authInfo = {
    user,
    loading,
    registerUser,
    loginUser,
    logout,
    setUser,
  };

  return (
    <AuthContext.Provider
      value={authInfo}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
