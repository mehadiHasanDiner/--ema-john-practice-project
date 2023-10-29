import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./components/Layout/Home.jsx";
import Shop from "./components/Shop/Shop.jsx";
import Orders from "./components/Orders/Orders.jsx";
import Inventory from "./components/Inventory/Inventory.jsx";
import Login from "./components/Login/Login.jsx";
import cartProductsLoaders from "./loaders/cartProductsLoaders";
import Checkout from "./components/Checkout/Checkout";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    children: [
      {
        path: "/",
        element: <Shop />,
      },
      {
        path: "orders",
        element: <Orders />,
        loader: cartProductsLoaders,
      },
      {
        path: "/checkout",
        element: <Checkout />,
      },
      {
        path: "inventory",
        element: <Inventory />,
      },
      {
        path: "login",
        element: <Login />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
