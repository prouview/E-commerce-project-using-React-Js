import React, { useState, useEffect } from "react";
import PublicHeader from "./publicheader";

const Cart = () => {
  const [items, setItems] = useState([]);
  const [name, setName] = useState('');
  const [mobile, setMobile] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [error, setError] = useState([]);
  const [message, setMessage] = useState("");
  let total = 0;

  const updateCart = () => {
    fetch("http://localhost:1234/cart")
      .then((res) => res.json())
      .then((serverRes) => {
        setItems(serverRes);
      });
  };

  useEffect(() => {
    updateCart();
  }, [true]);

  const deleteCart = (pid) => {
    const postData = {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ "id": pid })
    };
    var url = "http://localhost:1234/cart/" + pid;
    fetch(url, postData)
      .then(response => response.json())
      .then(serverResponse => {
        setMessage("Item Removed From Cart");
        setItems([]);
        updateCart();
      });

  };


  const placeOrder = () => {
    let errorMessage = {};
    let dataValidation = 'true';
    let epattern = /^([a-zA-z0-9_\.\-])+@(([a-zA-z0-9\-])+\.)+([a-zA-z0-9\-]{2,4})+$/;
    if (name == "") {
      dataValidation = 'false';
      errorMessage['nameError'] = 'Please Enter Name';
    } else if (mobile == "") {
      dataValidation = 'false';
      errorMessage['mobileError'] = 'Please Enter Mobile Number';
    } else if (!epattern.test(email) || email == "") {
      dataValidation = 'false';
      errorMessage['emailError'] = 'Please Enter E-mail';
    } else if (address == "") {
      dataValidation = 'false';
      errorMessage['addressError'] = 'Please Enter Address';
    };

    setError(errorMessage);

    if (dataValidation == 'true') {
      var orderData = {
        "customername": name,
        "mobile": mobile,
        "email": email,
        "address": address,
        "myorder": items
      };

      const postData = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(orderData)
      };
      var url = "http://localhost:1234/orderlist/";
      fetch(url, postData)
        .then(response => response.json())
        .then(serverResponse => {
          alert(' Your Order Placed Successfully !')
          setItems([])
          setName('');
          setMobile('');
          setEmail('');
          setAddress('');
        })
    } 
  }



  return (
    <>
      <PublicHeader />
      <section className="mt-5 mb-5">
        <div className="container">
          <div className="row">
            <p className="text-danger">{message}</p>
            <div className="col-lg-8">
              <table className="table table-bordered shadow text-center">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Image</th>
                    <th>Details</th>
                    <th>Price</th>
                    <th>Remove</th>
                  </tr>
                </thead>
                <tbody>
                  {items.map((item, index) => {
                    total = total + item.price;
                    return (
                      <tr key={index}>
                        <td>{item.id}</td>
                        <td> {item.name}</td>
                        <td>
                          <img src={item.image} width="50%" height="50px" />
                        </td>
                        <td>{item.details}</td>
                        <td> ₹ {item.price} /-</td>
                        <td>
                          <button
                            onClick={deleteCart.bind(this, item.id)}
                            className="btn btn-danger sm"
                          >
                            Remove
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                  <tr className="text-danger fs-5">
                    <td colSpan="4">Total</td>
                    <td colSpan="4" >₹ {total} /-</td>
                    
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="col-lg-4">
              <h6 className="text-primary">Enter Details</h6>
              <form className="form-control">
                <div className="mb-3">
                  <label>Name</label>
                  <input type="text" value={name} className="form-control" onChange={obj => setName(obj.target.value)} />
                  <p className="text-danger">{error.nameError}</p>
                </div>
                <div className="mb-3">
                  <label>Number</label>
                  <input type="number" value={mobile} className="form-control" onChange={obj => setMobile(obj.target.value)} />
                  <p className="text-danger">{error.mobileError}</p>
                </div>
                <div className="mb-3">
                  <label>Email</label>
                  <input type="email" value={email} className="form-control" onChange={obj => setEmail(obj.target.value)} />
                  <p className="text-danger">{error.emailError}</p>
                </div>
                <div className="mb-3">
                  <label>Address</label>
                  <input type="text" value={address} className="form-control" onChange={obj => setAddress(obj.target.value)} />
                  <p className="text-danger">{error.addressError}</p>
                </div>
              </form>
              <div className="text-center">
                <button className="btn btn-success center m-2 text-align-center" onClick={placeOrder}>Place Order</button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Cart;
