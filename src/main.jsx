import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router/dom";
import "./index.css";
import { WishlistProvider } from "./routes/provider/WishlistProvider.jsx";
import { router } from "./routes/router.jsx";
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <WishlistProvider>
      <RouterProvider router={router} />
    </WishlistProvider>
  </StrictMode>,
);
