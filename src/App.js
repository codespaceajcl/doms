import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from './Container/Auth/Login';
import UserLayout from './Layout/UserLayout';
import Form from './Container/Pages/Form/Form';
import Table from './Container/Pages/Table/Table';
import Dashboard from './Container/Dashboard/Dashboard';
import { ToastContainer } from "react-toastify";
import NotFound from './Container/Pages/NotFound/NotFound';
import Register from './Container/Auth/Register';


const App = () => {
  return (
    <BrowserRouter basename="/doms">
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
        <Route path={"/dashboard"} element={<UserLayout />}>
          <Route path='/dashboard' element={<Dashboard />} />
          <Route path='/dashboard/registration' element={<Form />} />
          <Route path='/dashboard/application' element={<Table />} />
        </Route>

        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  )
}
export default App