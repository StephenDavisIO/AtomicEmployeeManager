// Stephen Davis
// stephendavis.io

import React from "react";
import ReactDOM from "react-dom";
import "./Styles.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import {
  Navigation,
  Home,
  Employees,
  Create,
  Details,
  NotFound,
} from "./pages/routes";

ReactDOM.render(
  <Router>
    <Navigation />
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/employees" element={<Employees />} />
      <Route path="/employee/:id" element={<Details />} />
      <Route path="/employee/create" element={<Create />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  </Router>,
  document.getElementById("root")
);
