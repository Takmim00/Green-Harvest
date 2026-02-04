import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router/dom";
import "./index.css";
import AuthProvider from "./routes/provider/AuthProvider.jsx";
import { ShoppingProvider } from "./routes/provider/ShoppingProvider.jsx";
import { WishlistProvider } from "./routes/provider/WishlistProvider.jsx";
import { router } from "./routes/router.jsx";
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <ShoppingProvider>
        <WishlistProvider>
          <RouterProvider router={router} />
        </WishlistProvider>
      </ShoppingProvider>
    </AuthProvider>
  </StrictMode>,
);
