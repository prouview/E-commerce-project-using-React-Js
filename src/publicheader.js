import React from "react";
import { Link } from 'react-router-dom';

const PublicHeader = () => {
  return (
    <nav className="navbar navbar-expand-sm bg-dark sticky-top justify-content-between" id="navbar-custom" >
      <div className="container-fluid">
        <div className="collapse navbar-collapse" id="mynavbar">
          <ul className="navbar-nav me-auto">
            <li className="nav-item">
              <Link to="/" className="nav-link text-white">
              <i className="fa fa-home"></i> Home
              </Link>
            </li>
            <li class="nav-item">
              <Link to="/cart" className="nav-link text-white">
              <i className="fa fa-shopping-cart"></i> Cart
          </Link>
            </li>
            <li className="nav-item">
              <Link to="/login" className="nav-link text-white">
              <i className='fa fa-lock'></i> Login
          </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default PublicHeader;



