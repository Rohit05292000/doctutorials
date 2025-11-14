import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";
import ProtectedRoute from "./components/ProtectedRoute";
import Body from "./components/Body";
import Body1 from "./components/Body1";
import AuthProvider from "./components/AuthProvider";

const App = () => {
  return (
    <BrowserRouter>
    <AuthProvider>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<ProtectedRoute> <Dashboard /> </ProtectedRoute> }/>
        <Route path="/Body" element={  <Body/> } />
        <Route path="/Body1" element={  <Body1/>}/> 
       </Routes>
       </AuthProvider>
    </BrowserRouter>
  );
};

export default App;
