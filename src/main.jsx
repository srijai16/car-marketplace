import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import {
  RouterProvider,
  createBrowserRouter,
} from "react-router-dom";

import "./index.css";

import Home from "./home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Profile from "./profile";
import AddListing from "./add-listing";
import SearchByCategory from "./search/[category]";
import SearchByOptions from "./search";
import ListingDetail from "./listing-details/[id]";

import ProtectedRoute from "./ProtectedRoute";
import PublicRoute from "./PublicRoute";
import { AuthProvider } from "./context/AuthContext";

const router = createBrowserRouter([
  // 🔐 Protected Routes
  {
    element: <ProtectedRoute />,
    children: [
      
      { path: "/profile", element: <Profile /> },
      { path: "/add-listing", element: <AddListing /> },
      { path: "/search/:category", element: <SearchByCategory /> },
      { path: "/search", element: <SearchByOptions /> },
      { path: "/listing-details/:id", element: <ListingDetail /> },
    ],
  },

  // 🌍 Public Routes
  {
    element: <PublicRoute />,
    children: [
      { path: "/login", element: <Login /> },
      { path: "/signup", element: <Signup /> },
    ],
  },
  { path: "/", element: <Home /> },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </StrictMode>
);