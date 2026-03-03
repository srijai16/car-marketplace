import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";

import "./index.css";

import Home from "./home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import ProtectedRoute from "./ProtectedRoute";
import { AuthProvider } from "./context/AuthContext";
import Profile from "./profile";
import AddListing from "./add-listing";
import SearchByCategory from "./search/[category]";
import SearchByOptions from "./search";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <ProtectedRoute>
        <Home />
      </ProtectedRoute>
    ),
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/signup",
    element: <Signup />,
  },
  {
     path: "/profile",
     element: <Profile />,
  },
  {
     path: "/add-listing",
     element: <AddListing />,
  },
  {
     path: "/search/:category",
     element: <SearchByCategory />,
  },
  {
     path: "/search",
     element: <SearchByOptions />,
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </StrictMode>
);