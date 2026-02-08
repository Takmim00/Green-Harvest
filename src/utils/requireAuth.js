import { toast } from "react-toastify";

export const requireAuth = (action) => {
  const token = localStorage.getItem("access");

  if (!token) {
    toast.error("Please create an account or login");
    return;
  }

  action();
};
