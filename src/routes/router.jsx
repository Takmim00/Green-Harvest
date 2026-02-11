import { createBrowserRouter } from "react-router";
import Main from "../layout/Main";
import Blog_List from "../pages/Blog/Blog_List";
import Single_Blog from "../pages/Blog/SinglePage/Single_Blog";
import Checkout from "../pages/Checkout/Checkout";
import Home from "../pages/Home";
import ProductDetails from "../pages/ProductDetails";
import ShoppingCart from "../pages/ShopingCart/ShoppingCart";
import Shops from "../pages/Shops";
import Wishlist from "../pages/WishListSctions/Wishlist";

import DashboardLayout from "../layout/DashboardLayout";
import About from "../pages/About/About";
import Register from "../pages/Authentication/Register";
import SignIn from "../pages/Authentication/SignIn";
import Contact from "../pages/Contact/Contact";
import Dashboard from "../pages/Dashboard/Dashboard";
import DashboardCart from "../pages/Dashboard/DashboardCart";
import DashboardSettings from "../pages/Dashboard/DashboardSettings";
import DashboardWishlist from "../pages/Dashboard/DashboardWishlist";
import OrderDetails from "../pages/Dashboard/OrderDetails";
import OrderHistory from "../pages/Dashboard/OrderHistoy";
import NotFound from "../pages/NotFound/NotFound";
import FAQ from "../pages/faq/FAQ";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    errorElement: <NotFound />,
    children: [
      {
        path: "/",
        element: <Home />,
      },

      // {
      //   path: "/shop",
      //   element: <Shops />,
      // },
      // {
      //   path: "/product/:slug",
      //   element: <ProductDetails />,
      // },
      {
        path: "shop",
        children: [
          { index: true, element: <Shops /> },
          { path: ":slug", element: <ProductDetails /> },
        ],
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
        path: "/register",
        element: <Register />,
      },
      {
        path: "/about",
        element: <About />,
      },
      {
        path: "/contact",
        element: <Contact />,
      },
      {
        path: "/faq",
        element: <FAQ />,
      },
    ],
  },
  {
    path: "/dashboard",
    element: <DashboardLayout />,
    errorElement: <NotFound />,
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
