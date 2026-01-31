import { createBrowserRouter } from "react-router";
import Main from "../layout/Main";
import Home from "../pages/Home";
import ProductDetails from "../pages/ProductDetails";
import ShoppingCart from "../pages/ShopingCart/ShoppingCart";
import Shops from "../pages/Shops";
import Blog_List from "../pages/Blog/Blog_List";
import Wishlist from "../pages/WishListSctions/Wishlist";
import Checkout from "../pages/Checkout/Checkout";
import Single_Blog from "../pages/Blog/SinglePage/Single_Blog";

import SignIn from "../pages/Authentication/SignIn";
import Register from "../pages/Authentication/Register";
import DashboardLayout from "../layout/DashboardLayout";
import Dashboard from "../pages/Dashboard/Dashboard";
import OrderHistory from "../pages/Dashboard/OrderHistoy";
import OrderDetails from "../pages/Dashboard/OrderDetails";
import DashboardWishlist from "../pages/Dashboard/DashboardWishlist";
import DashboardCart from "../pages/Dashboard/DashboardCart";
import DashboardSettings from "../pages/Dashboard/DashboardSettings";
import About from "../pages/About/About";

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
        path: "/singleblog/:id",
        element: <Single_Blog />,
      },
      {
        path: "/checkout",
        element: <Checkout />,
      },
      {
        path: "/signIn",
        element: <SignIn />,
      },
      {
        path: "/signIn",
        element: <SignIn />,
      },
      {
        path: "/register",
        element: <Register />,
      },
      {
        path: "/about",
        element:<About/>
      },
    ],
  },
  {
    path: "/dashboard",
    element: <DashboardLayout />,
    children: [
      {
        path: "/dashboard",
        element: <Dashboard />,
      },
      {
        path: "/dashboard/order-history",
        element: <OrderHistory />,
      },
      {
        path: "/dashboard/order/:id",
        element: <OrderDetails />,
      },
      {
        path: "/dashboard/wishlist",
        element: <DashboardWishlist />,
      },
      {
        path: "/dashboard/shopping-cart",
        element: <DashboardCart />,
      },
      {
        path: "/dashboard/settings",
        element: <DashboardSettings />,
      },
    ],
  },
]);
