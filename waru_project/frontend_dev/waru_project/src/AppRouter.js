import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import App from "./App";
import ASignin from "./pages/ASignin";
import ALogin from "./pages/ALogin";
import AOlvContraseña from "./pages/AOlvContraseña";
import BMenu from "./pages/BMenu";

const AppRouter = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/ASignin" element={<ASignin />} />
        <Route path="/ALogin" element={<ALogin />} />
        <Route path="/AOlvContraseña" element={<AOlvContraseña />} />
        <Route path="/BMenu" element={<BMenu />} />
      </Routes>
    </Router>
  );
};

export default AppRouter;
