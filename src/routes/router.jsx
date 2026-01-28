import { createBrowserRouter } from "react-router";
import Main from "../layout/Main";
import Home from "../pages/Home";
import ProductDetails from "../pages/ProductDetails";
import Shops from "../pages/Shops";
import Wishlist from "../pages/WishListSctions/Wishlist";
import ShoppingCart from "../pages/ShopingCart/ShoppingCart";

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
        element: <ProductDetails />,
      },
      {
        path: "/wishlist",
        element: <Wishlist />,
      },
      {
        path: "/shoppingCart",
        element: <ShoppingCart/>,
      },
    ],
  },
]);
