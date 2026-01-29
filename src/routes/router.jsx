import { createBrowserRouter } from "react-router";
import Main from "../layout/Main";
import Home from "../pages/Home";
import ProductDetails from "../pages/ProductDetails";
import ShoppingCart from "../pages/ShopingCart/ShoppingCart";
import Shops from "../pages/Shops";
<<<<<<< HEAD
import Wishlist from "../pages/PaymentSctions/Wishlist";
import Blog_List from "../pages/Blog/Blog_List";
=======
import Wishlist from "../pages/WishListSctions/Wishlist";
import Checkout from "../pages/Checkout/Checkout";
>>>>>>> 4b2cb5a2b410e4b018d1a40cf263a8947db04c3b

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
<<<<<<< HEAD
        path:"/blog",
        element:<Blog_List/>
=======
        path: "/shoppingCart",
        element: <ShoppingCart />,
      },
      {
        path: "/checkout",
        element: <Checkout />,
>>>>>>> 4b2cb5a2b410e4b018d1a40cf263a8947db04c3b
      },
    ],
  },
]);
