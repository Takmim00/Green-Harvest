import { createBrowserRouter } from "react-router";
import Main from "../layout/Main";
import Home from "../pages/Home";
import SingleProduct from "../pages/SingleProduct";
import Shops from "../pages/Shops";
import Wishlist from "../pages/PaymentSctions/Wishlist";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/shop",
        element: <Shops />,
      },
      {
        path: "/product/:id",
        element: <SingleProduct />,
      },
      {
        path: "/wishlist",
        element: <Wishlist />,
      },
    ],
  },
]);
