import React, { useState, useEffect } from "react";
import PublicHeader from "./publicheader";

const Home = () => {
  const [product, setProduct] = useState([]);
  const [msg, updateMessage] = useState("");

  const getProduct = () => {
    fetch("http://localhost:1234/productlist")
      .then((res) => res.json())
      .then((allprod) => {
        if (allprod.length > 0) {
          setProduct(allprod);
        }
      });
  };
  useEffect(() => {
    getProduct();
  }, [true]);

  const AddToCart = (productinfo) => {
    const postData = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(productinfo)
    };
    var url = "http://localhost:1234/cart";
    fetch(url, postData)
      .then(response => response.json())
      .then(serverResponse => {
        updateMessage(serverResponse.name + " Added In Cart");
      });
    }



  return (
    <>
      <PublicHeader />
      <section className="bg-light p-5">
        <div className="container">
          <div className="row">
          <p className="text-center text-danger">{msg}</p>
            {product.map((prod, index) => {
              return (
                <div className="col-lg-3 mb-5" key={index}>
                  <div className="bg-white rounded p-3 shadow text-center">
                    <h4>{prod.name}</h4>
                    <img src={prod.image} height="150px" width="70%" />
                    <p>Rs.{prod.price}/-</p>
                    <p>{prod.details}</p>
                    <div className="text-center">
                      <button className="btn btn-primary btn-sm" onClick={AddToCart.bind(this, prod)}>
                        <i className="fa fa-shopping-cart"></i> Add To Cart
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;

