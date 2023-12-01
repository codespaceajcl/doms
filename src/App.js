import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from './Container/Auth/Login';
import UserLayout from './Layout/UserLayout';
import Form from './Container/Pages/Form/Form';
import Table from './Container/Pages/Table/Table';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>

        <Route path={"/user"} element={<UserLayout />}>
          <Route path='/user/form' element={<Form />} />
          <Route path='/user/table' element={<Table />} />
        </Route>

        <Route path="/" element={<Login />} />
      </Routes>
    </BrowserRouter>
  )
}
export default App