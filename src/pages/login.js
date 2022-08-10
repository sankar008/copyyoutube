import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom";
import * as C from "../api";
import axios from "axios";
import * as API from "../helper/apiHelper";
import * as appUtils from "../helper/appUtils";
const initialData = {
  email: "",
  password: "",
};

const Login = () => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState(initialData);
  const [errorEmail, setErrorEmail] = useState("");
  const [errorPassword, setErrorPassword] = useState("");
  const [emailId, setEmailId] = useState("");
  const [password, setPassword] = useState("");
  const history = useHistory();

  localStorage.removeItem("userId");

  // ?login handaler
  const loginHandelar = (e) => {
    const { name, value } = e.target;
    switch (name) {
      case "email":
        setErrorEmail("");
        //setErrorMsg(false);
        break;
      case "password":
        setErrorPassword("");
        break;
      default:
    }
    setFormData({ ...formData, [name]: value });
  };

  // ? ADMIN LOGIN BUTTON
  const adminLoginSubmit = async () => {
    setLoading(true);
    let flag = validate();
    if (!flag) {
      setLoading(false);
      return;
    }
    try {
      const reqObj = {
        email: formData.email,
        password: formData.password,
      };
      console.log("reqObj", reqObj);
      const response = await API.user_login(reqObj);
      console.log("response", response);
      if (response.data.success === 1) {
        localStorage.setItem("userId", response.data.data._id);
        history.push({
          pathname: "/dashboard",
        });
      } else {
        setEmailId(response.data.message);
      }
    } catch (error) {
      console.log("Error", error);
    }
  };

  //VALIDATE-INPUT
  const validate = () => {
    const { email, password } = formData;
    let flag = true;

    let validateEmail = appUtils.validateEmail(email);
    if (validateEmail === 1) {
      setErrorEmail({
        field: "email",
        message: "",
      });
    }
    if (!(validateEmail === 1)) {
      let msg = "";
      if (validateEmail === 0) {
        msg = "Please enter your email Id.";
      } else {
        msg = "That doesn't look like an email Id.";
      }
      setErrorEmail({
        field: "email",
        message: msg,
      });
      flag = false;
    }

    // ? password
    if (password) {
      // if (password.length < 8) {
      //   setErrorPassword({
      //     field: "password",
      //     message: "Your password is too short. It needs to be 8+ characters",
      //   });
      //   flag = false;
      // }
      if (password.length > 8) {
        setErrorPassword({
          field: "password",
          message: "",
        });
        flag = true;
      }
    } else {
      setErrorPassword({
        field: "password",
        message: "Please enter your password.",
      });
      flag = false;
    }

    return flag;
  };

  return (
    <div className="">
      <div id="app" className="page">
        <section className="section ">
          <div className="container">
            <div className="">
              <div className="single-page">
                <div className="">
                  <div className="wrapper wrapper2">
                    <div id="login" className="card-body bg-primary">
                      <h3 className="text-white">Login</h3>
                      {emailId ? (
                        <p className="formErrorAlrt">{emailId}</p>
                      ) : (
                        ""
                      )}
                      <div className="mail mb-3">
                        <input
                          onChange={loginHandelar}
                          type="email"
                          name="email"
                          className="form-control"
                          placeholder="Enter your email id"
                          value={formData.email}
                        />
                        {errorEmail.field === "email" && (
                          <p className="formErrorAlrt">{errorEmail.message}</p>
                        )}
                      </div>
                      <div className="passwd mb-3">
                        <input
                          type="password"
                          onChange={loginHandelar}
                          name="password"
                          className="form-control"
                          placeholder="Enter your Password"
                          value={formData.password}
                        />
                        {errorPassword.field === "password" && (
                          <p className="formErrorAlrt">
                            {errorPassword.message}
                          </p>
                        )}
                      </div>
                      <p className="mb-3 text-right text-white">
                        <Link to="/forgotpassword" className="text-body">
                          Forgot Password ?
                        </Link>
                      </p>
                      <div className="submit mb-3">
                        <button
                          className="btn btn-default btn-block"
                          onClick={adminLoginSubmit}
                        >
                          Login
                        </button>
                      </div>
                      <div className="signup mb-0">
                        <p className="text-white mb-0">
                          Don't have account?
                          <Link to="/signup" className="text-body ml-1">
                            Sign UP
                          </Link>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Login;
