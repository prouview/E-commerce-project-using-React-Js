import React, { useEffect, useState } from "react";
import AdminHeader from "./adminheader";

const ManageProduct = () => {
  const [products, setProducts] = useState([]);
  const [productName, setProductName] = useState("");
  const [productDetails, setProductDetails] = useState("");
  const [productImage, setProductImage] = useState("");
  const [productPrice, setProductPrice] = useState("");
  const [error, setError] = useState("");

  const getProduct = () => {
    fetch("http://localhost:1234/productlist")
      .then((res) => res.json())
      .then((serverRes) => {
        setProducts(serverRes);
      });
  };

  useEffect(() => {
    getProduct();
  }, []);

  const save = () => {
    let allError = {};
    let formStatus = true;
    if (productName === "") {
      formStatus = false;
      allError["nameError"] = "Invalid Name";
    }

    if (productImage === "") {
      formStatus = false;
      allError["imageError"] = "Invalid Image";
    }

    if (productDetails === "") {
      formStatus = false;
      allError["detailsError"] = "Invalid Details";
    }

    if (productPrice === "" || productPrice < 1) {
      formStatus = false;
      allError["priceError"] = "Invalid Price";
    }

    setError(allError);

    if (formStatus === true) {
      const newproductlist = {
        name: productName,
        details: productDetails,
        image: productImage,
        price: productPrice,
      };

      const postData = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newproductlist),
      };
      var url = "http://localhost:1234/productlist/";
      fetch(url, postData)
        .then((response) => response.json())
        .then((serverResponse) => {
          alert(serverResponse.name + " " + "Added Successfully");
          getProduct();
          setProductName("");
          setProductPrice("");
          setProductDetails("");
          setProductImage("");
        });
    } else {
      alert("Please Fill All The Details");
    }
  };

  const removeProd = (prod) => {
    const postData = {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: prod }),
    };

    var url = "http://localhost:1234/productlist/" + prod;
    fetch(url, postData)
      .then((res) => res.json())
      .then((serverRes) => {
        alert("Removed Successfully");
        getProduct();
      });
  };

  return (
    <>
      <AdminHeader />
      <section>
        <div className="container">
          <div className="row">
            <div className="text-center text-primary mt-5">
              <h4><span className="me-3"><i className="fa fa-arrows"></i></span>Total Products : {products.length}</h4>
            </div>
            <div className="col-lg-4 mt-3 mb-5">
              <h5 className="text-primary text-center">Add New Product</h5>
              <form className="form-control">
                <label>Name</label>
                <input
                  type="text"
                  className="form-control"
                  onChange={(obj) => setProductName(obj.target.value)}
                  value={productName}
                />
                <p className="text-danger">{error.nameError}</p>
                <label>Details</label>
                <input
                  type="text"
                  className="form-control"
                  onChange={(obj) => setProductDetails(obj.target.value)}
                  value={productDetails}
                />
                <p className="text-danger">{error.detailsError}</p>
                <label>Image</label>
                <input
                  type="text"
                  className="form-control"
                  onChange={(obj) => setProductImage(obj.target.value)}
                  value={productImage}
                />
                <p className="text-danger">{error.imageError}</p>
                <label>Price</label>
                <input
                  type="number"
                  className="form-control"
                  onChange={(obj) => setProductPrice(obj.target.value)}
                  value={productPrice}
                />
                <p className="text-danger">{error.priceError}</p>
              </form>
              <div className="text-center">
                <button className="btn btn-success m m-2" onClick={save}>
                  Save
                </button>
              </div>
            </div>
            <div className="col-lg-8 mt-5 mb-5 text-center">
              <table className="table  table-bordered table-hover rounded ">
                <thead>
                  <tr>
                    <th>Id</th>
                    <th>Name</th>
                    <th>Details</th>
                    <th>Image</th>
                    <th>Price</th>
                    <th>Remove</th>
                  </tr>
                </thead>
                <tbody>
                  {products.map((product, index) => {
                    return (
                      <tr key={index}>
                        <td>{product.id}</td>
                        <td>{product.name}</td>
                        <td>{product.details}</td>
                        <img
                          src={product.image}
                          alt="products"
                          width="70%"
                          height="75px"
                        />
                        <td>{product.price}</td>
                        <td>
                          <button
                            onClick={removeProd.bind(this, product.id)}
                            className="btn btn-danger sm"
                          >
                            Remove
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ManageProduct;
