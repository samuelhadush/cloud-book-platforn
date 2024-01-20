import * as React from 'react'
import {
    createBrowserRouter,
  } from "react-router-dom";
import Home from "./Dashboard";
export const router = createBrowserRouter([
    {
      path: "/",
      element: <Home />,
    },
    {
        path: "/login",
        element: <Home />,
      },
      {
        path: "/signup",
        element: <Home />,
      },
  ]);