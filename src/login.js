import React, { useState } from "react";
import PublicHeader from "./publicheader";

const Login = () => {
    const [userName, setUserName] = useState("");
    const [userPassword, setUserPassword] = useState("");


    const adminlogin = () => {
        if (userName == "" || userPassword == "") {
            alert("Please Enter Details")
        } else {
            fetch("http://localhost:1234/account")
                .then(res => res.json())
                .then(serverRes => {
                    if (serverRes[0].username == userName && serverRes[0].password == userPassword) {
                        localStorage.setItem("adminid", serverRes[0].id);
                        window.location.href="http://localhost:3000/#/";
                        // window.location.href = "http://localhost:5500/#/";
                        window.location.reload(); // to reload the current page
                    } else {
                        alert("Login Failed")
                    }
                })

        }

    }


    return (
        <>
            <PublicHeader />
            <section id="height">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-4"></div>
                        <div className="col-lg-4 m-5">
                            <div className="text-center m-2">
                            <i className="fa fa-user-circle fa-3x text-secondary"></i>
                            </div>
                            <h4 className="text-primary text-center">Admin Login</h4>
                            <form className="form-control p-3">
                                <label className="mb-2">Enter your Username</label>
                                <input type="text" className="form-control" onChange={obj => setUserName(obj.target.value)} />
                                <label className="my-2">Enter your Password</label>
                                <input type="password" className="form-control" onChange={obj => setUserPassword(obj.target.value)} />
                            </form>
                            <div className="text-center">
                                <button onClick={adminlogin} className="btn btn-primary m-2">Login</button>
                            </div>
                        </div>
                        <div className="col-lg-4"></div>

                    </div>
                </div>
            </section>
        </>
    );
};

export default Login;
