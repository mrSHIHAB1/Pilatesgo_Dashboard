import { createBrowserRouter, Navigate } from "react-router";
import AuthLayout from "../Layout/AuthLayout";
import DashboardLayout from "../Layout/DashboardLayout";
import Login from "../pages/Auth/Login";
import Dashboard from "../pages/Dashboard/Dashboard";
import Users from "../pages/Dashboard/Users";
import Videos from "../pages/Dashboard/Videos";
import Workouts from "../pages/Dashboard/Workouts";
import Exercises from "../pages/Dashboard/Exercises";
import Programs from "../pages/Dashboard/Programs";
import Subscriptions from "../pages/Dashboard/Subscriptions";
import Categories from "../pages/Dashboard/Categories";
import Analytics from "../pages/Dashboard/Analytics";
import Settings from "../pages/Dashboard/Settings";
import PrivateRoute from "./PrivateRoute";
import ForgotPassword from "../pages/Auth/ForgotPassword";
import SetPassword from "../pages/Auth/SetPassword";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <AuthLayout />,
    children: [
      {
        index: true,
        element: <Navigate to="/login" replace />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "forgot-password",
        element: <ForgotPassword />,
      },
      {
        path: "set-password",
        element: <SetPassword />,
      }

    ],
  },
  {
    path: "/dashboard",
    element: <PrivateRoute />,
    children: [
      {
        path: "",
        element: <DashboardLayout />,
        children: [
          {
            index: true,
            element: <Dashboard />,
          }
          ,
          { path: "users", element: <Users /> },
          { path: "videos", element: <Videos /> },
          { path: "workouts", element: <Workouts /> },
          { path: "exercises", element: <Exercises /> },
          { path: "programs", element: <Programs /> },
          { path: "subscriptions", element: <Subscriptions /> },
          { path: "categories", element: <Categories /> },
          { path: "analytics", element: <Analytics /> },
          { path: "settings", element: <Settings /> },
      
        ],
      },
    ],
  },

  {
    path: "*",
    element: <Navigate to="/login" replace />,
  }
]);


