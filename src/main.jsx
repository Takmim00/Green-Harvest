import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router/dom";
import { ToastContainer } from "react-toastify";
import "./index.css";
import AuthProvider from "./routes/provider/AuthProvider.jsx";
import { ProductModalProvider } from "./routes/provider/ProductModalProvider.jsx";
import { ShoppingProvider } from "./routes/provider/ShoppingProvider.jsx";
import { WishlistProvider } from "./routes/provider/WishlistProvider.jsx";
import { router } from "./routes/router.jsx";
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      
        <ShoppingProvider>
          <WishlistProvider>
            <ToastContainer
              position="top-right"
              autoClose={2000}
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick
              pauseOnHover
              draggable
            />
            <ProductModalProvider>
            <RouterProvider router={router} />
            </ProductModalProvider>
          </WishlistProvider>
        </ShoppingProvider>
      
    </AuthProvider>
  </StrictMode>,
);
