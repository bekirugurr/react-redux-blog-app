import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "../components/Navbar";
import About from "../pages/About";
import Dashboard from "../pages/Dashboard";
import Details from "../pages/Details";
import Login from "../pages/Login";
import NewBlog from "../pages/NewBlog";
import Profile from "../pages/Profile";
import Register from "../pages/Register";
import UpdateBlog from "../pages/UpdateBlog";

const AppRouter = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path={"/"} element={<Dashboard />} />
        <Route path={"/login"} element={<Login />} />
        <Route path={"/register"} element={<Register />} />
        <Route path={"/about"} element={<About />} />
        <Route path={"/new-blog"} element={<NewBlog />} />
        <Route path={"/profile"} element={<Profile />} />
        <Route path={"/update-blog"} element={<UpdateBlog />} />
        <Route path={"/details/:id"} element={<Details />} />
      </Routes>
    </Router>
  );
};

export default AppRouter;
