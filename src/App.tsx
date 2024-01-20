import * as React from "react";
import ProtectedRoute from "./ProtectedRoute";
import SignUp from "./components/SignUp";
import SignIn from "./components/SignIn";
import Dashboard from "./Dashboard";
import UserProfile from "./components/UserProfile";

import {
  createBrowserRouter,
  Route,
  RouterProvider,
  Routes,
} from "react-router-dom";
import Books from "./components/Books";
import Section from "./components/Section";
import EditSection from "./components/EditSection";

// Router singleton created
const router = createBrowserRouter([{ path: "*", Component: Root }]);

// Router Provider added
export default function App() {
  return <RouterProvider router={router} />;
}
// Root Router
function Root() {
  return (
    <>
      <Routes>
        <Route path="/signup" element={<SignUp />} />
        <Route path="/signin" element={<SignIn />} />
        <Route element={<ProtectedRoute />}>
          <Route path="/" element={<Books />} />
          <Route path="/books" element={<Books />} />
          {/* <Route path="/sections" element={<Section />} /> */}
          <Route path="/sections/:sectionId" element={<EditSection />} />
          <Route path="/profile" element={<UserProfile />} />
        </Route>
      </Routes>
    </>
  );
}
