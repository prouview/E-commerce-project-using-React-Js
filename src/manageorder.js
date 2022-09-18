import React, { useEffect, useState } from "react";
import AdminHeader from "./adminheader";

const ManageOrder = () => {
  const [orderItems, setOrderItems] = useState([]);
  const getOrder = () => {
    fetch("http://localhost:1234/orderlist/")
      .then((res) => res.json())
      .then((serverResponse) => {
        setOrderItems(serverResponse.reverse());
      });
  };

  useEffect(() => {
    getOrder();
  }, []);

  return (
    <>
      <AdminHeader />
      <section>
        <div className="container">
          <div className="row">
            <div className="text-center text-primary my-5">
              <h4><span className="me-3"><i className="fa fa-shopping-cart"></i></span>Total Orders : {orderItems.length}</h4>
            </div>
            <div className="col-lg-6 text-center text-primary">
              <h5>Customer Details</h5>
            </div>
            <div className="col-lg-6 text-center text-primary">
              <h5>Order Details</h5>
            </div>
            <div className="text-center mt-1 mb-5">
              {orderItems.map((items, index) => {
                return (
                  <div className="row">
                    <div className="col-lg-6">
                      <table className="table table-striped table-bordered table-hover rounded ">
                        <thead>
                          <tr>
                            <th>Name</th>
                            <th>Number</th>
                            <th>E-Mail</th>
                            <th>Address</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr key={index}>
                            <td>{items.customername}</td>
                            <td>{items.mobile}</td>
                            <td>{items.email}</td>
                            <td>{items.address}</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>

                    <div className="col-lg-6">
                      <table className="table table-bordered table-hover rounded ">
                        <thead>
                          <tr>
                            <th>Id</th>
                            <th>Name</th>
                            <th>Image</th>
                            <th>Price</th>
                            <th>Details</th>
                          </tr>
                        </thead>
                        <tbody>
                          {items.myorder.map((order, index2) => {
                            return (
                              <tr key={index2}>
                                <td>{order.id}</td>
                                <td width="justify">{order.name}</td>
                                <td>
                                  <img
                                    src={order.image}
                                    width="50%"
                                    height="50px"
                                  />
                                </td>
                                <td>{order.price}</td>
                                <td>{order.details}</td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ManageOrder;
