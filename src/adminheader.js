import React from "react";
import { Link } from "react-router-dom";

const AdminHeader = () => {
  return (
    <nav className="navbar navbar-expand-sm navbar-dark bg-dark" id="navbar-custom">
      <div className="container-fluid">
        <div className="collapse navbar-collapse" id="mynavbar">
          <ul className="navbar-nav me-auto">
            <li className="nav-item">
              <Link to="/" className="nav-link text-white">
              <i className='fa fa-cart-arrow-down'></i> Manage Order
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/manageproduct" className="nav-link text-white">
              <i className='	fa fa-check-square-o'></i> Manage Product
          </Link>
            </li>
            <li classNameName="nav-item">
            <Link className="nav-link text-white" onClick={Logout}>
            <i className='fa fa-user-times'></i> Logout
          </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default AdminHeader;

const Logout = () => {
localStorage.clear()
window.location.href="http://localhost:3000/#/";
window.location.reload();
}
