import React from 'react';
import { Routes, Route, BrowserRouter } from "react-router-dom";
import Login from './Container/Auth/Login';
import UserLayout from './Layout/UserLayout';
import Form from './Container/Pages/Form/Form';
import Table from './Container/Pages/Table/Table';
import Dashboard from './Container/Dashboard/Dashboard';
import { ToastContainer } from "react-toastify";
import NotFound from './Container/Pages/NotFound/NotFound';
import Register from './Container/Auth/Register';
import TrackPlot from './Container/Pages/TrackPlots/TrackPlot';
import AdminLayout from './Layout/AdminLayout';
import MasterAdminLayout from './Layout/MasterAdminLayout';
import { useSelector } from 'react-redux';

const App = () => {
  const { getLoginData } = useSelector((state) => state.loginData)
  const userFound = JSON.parse(localStorage.getItem("user"));

  return (
    <BrowserRouter basename="/doms/system">
      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light" />
      <Routes>
        {(userFound || getLoginData) && (
          <Route
            path="/dashboard"
            element={
              userFound.access === "user" || getLoginData?.access === "user" ? (
                <UserLayout />
              ) : userFound.access === "admin" || getLoginData?.access === "admin" ? (
                <AdminLayout />
              ) : userFound.access === "masterAdmin" || getLoginData?.access === "masterAdmin" ? (
                <MasterAdminLayout />
              ) : (
                <NotFound />
              )
            }>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/dashboard/registration" element={<Form />} />
            <Route path="/dashboard/application" element={<Table />} />
            <Route path="/dashboard/track-plots" element={<TrackPlot />} />
          </Route>
        )}
        <Route path="/" element={<Login />} />
        <Route path="/admin/register" element={<Register />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  )
}
export default App;