import * as React from 'react'
import { Route, Routes } from 'react-router-dom'
import ProtectedRoute from './ProtectedRoute';
import SignUp from './components/SignUp';
import SignIn from './components/SignIn';
import Dashboard from './Dashboard';
import UserProfile from './components/UserProfile';
import SectionList from './components/Books';

export default function Layout() {
  return (
    <div>
      {/* <Outlet/> */}
      <Routes>
        <Route path="/signup" element={<SignUp />} />
        <Route path="/signin" element={<SignIn />} />
        <Route element={<ProtectedRoute />}>
          <Route path="/" element={<Dashboard />} />
          <Route path="/Bo" element={<Dashboard />} />
          <Route path="/sections" element={<SectionList />} />
          <Route path="/sections/:sectionId" element={<Dashboard />} />
          <Route path="/profile" element={<UserProfile />} />
        </Route>
      </Routes>
    </div>
  );
}