import {HashRouter, Routes ,Route }from "react-router-dom";
import Home from "./home";
import Cart from "./cart";
import Login from "./login";

const PublicApp = () => {
  return (
    <>
      <HashRouter>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/cart" element={<Cart />} />
          <Route exact path="/login" element={<Login />} />
        </Routes>
      </HashRouter> 
    </>
  );
};

export default PublicApp;



