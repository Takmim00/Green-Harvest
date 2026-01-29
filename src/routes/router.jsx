import { createBrowserRouter } from "react-router";
import Main from "../layout/Main";
import Home from "../pages/Home";
import ProductDetails from "../pages/ProductDetails";
import ShoppingCart from "../pages/ShopingCart/ShoppingCart";
import Shops from "../pages/Shops";
import Blog_List from "../pages/Blog/Blog_List";
import Wishlist from "../pages/WishListSctions/Wishlist";
import Checkout from "../pages/Checkout/Checkout";

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
        element: <ShoppingCart />,
      },
      {
        path: "/blog",
        element: <Blog_List />,
      },
      {
        path: "/checkout",
        element: <Checkout />,
      },
    ],
  },
]);
