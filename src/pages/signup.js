import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom";
import * as C from "../api";
import axios from "axios";
import * as API from "../helper/apiHelper";
import * as appUtils from "../helper/appUtils";
const initialvalue = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  confirmPassword: "",
};
const initialOtpData = {
  firstV: "",
  secndV: "",
  thardV: "",
  fourthV: "",
  fivetV: "",
  sixThV: "",
};

const Signup = () => {
  const [loading, setLoading] = useState(false);
  const [regopt, setRegopt] = useState(initialOtpData);
  const [formData, setFormData] = useState(initialvalue);
  const [isEmailSec, setIsEmailSec] = useState(0);
  const [OTP, setOTP] = useState("");
  //? Error Message
  const [errorMsg, setErrorMsg] = useState("");
  const [errorEmail, setErrorEmail] = useState("");
  const [errorName, setErrorName] = useState("");
  const [errorLastName, setErrorLastName] = useState("");
  const [errorPassword, setErrorPassword] = useState("");
  const [confirmErrorPasword, setConfirmErrorPasword] = useState("");

  const history = useHistory();

  // ?login handaler
  const loginHandelar = (e) => {
    const { name, value } = e.target;
    switch (name) {
      case "email":
        setErrorEmail("");
        setErrorMsg(false);
        break;
      case "firstName":
        setErrorName("");
        break;
      case "lastName":
        setErrorLastName("");
        break;
      case "password":
        setErrorPassword("");
        break;
      case "confirmPassword":
        setConfirmErrorPasword("");
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
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        password: formData.password,
      };
      console.log("reqObj", reqObj);
      const response = await API.user_registration(reqObj);
      console.log("response", response);
      if (response.status === 200) {
        setIsEmailSec(1);
        localStorage.setItem("userId", response.data.data._id);
      }
    } catch (error) {
      console.log("Error", error);
    }
  };

  // ? otp hendel foucs
  const handleKeyUp = (event) => {
    const form = event.target.form;
    const index = Array.prototype.indexOf.call(form, event.target);
    if (index < 5) {
      form.elements[index + 1].focus();
      event.preventDefault();
    }
  };

  // ? otp Configeretion
  const otpHandaler = (e) => {
    const { name, value } = e.target;
    setRegopt({ ...regopt, [name]: value });
  };

  // ? OTP SUBMITED
  const otpSubmited = async () => {
    try {
      const reqObj = {
        email: formData.email,
        otp:
          regopt.firstV +
          regopt.secndV +
          regopt.thardV +
          regopt.fourthV +
          regopt.fivetV +
          regopt.sixThV,
      };
      console.log("reqObj", reqObj);
      const response = await API.user_emailVerified(reqObj);
      console.log("response", response);
      if (response.data.success === 1) {
        history.push({
          pathname: "/dashboard",
        });
        setIsEmailSec(0);
      }else{
        console.log("OTP not verified");
      }
    } catch (e) {
      console.log("error", e);
    }
  };

  const buttonDisabl =
    !regopt.firstV ||
    !regopt.secndV ||
    !regopt.thardV ||
    !regopt.fourthV ||
    !regopt.fivetV ||
    !regopt.sixThV;
  //VALIDATE-INPUT
  const validate = () => {
    const { email, password, firstName, lastName, confirmPassword } = formData;
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
        msg = "Please enter your email address.";
      } else {
        msg = "That doesn't look like an email address.";
      }
      setErrorEmail({
        field: "email",
        message: msg,
      });
      flag = false;
    }

    //   Firt name
    let validateName = appUtils.validateName(firstName);
    if (validateName === 1) {
      setErrorName({
        field: "firstName",
        message: "",
      });
    }
    if (!(validateName === 1)) {
      let msg = "";
      if (validateName === 0) {
        msg = "Please enter your first name";
      } else {
        msg = "That doesn't look like a name.";
      }
      setErrorName({
        field: "firstName",
        message: msg,
      });
      flag = false;
    }

    //   Last name
    let validateLastName = appUtils.validateLastName(lastName);
    if (validateLastName === 1) {
      setErrorLastName({
        field: "lastName",
        message: "",
      });
    }
    if (!(validateLastName === 1)) {
      let msg = "";
      if (validateLastName === 0) {
        msg = "Please enter your last name.";
      } else {
        msg = "That doesn't look like a last name.";
      }
      setErrorLastName({
        field: "lastName",
        message: msg,
      });
      flag = false;
    }

    // ? password
    if (password) {
      if (password.length < 8) {
        setErrorPassword({
          field: "password",
          message: "Your password is too short. It needs to be 8+ characters",
        });
        flag = false;
      }
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

    // ? confirmPassword

    if (password === "" || password !== confirmPassword) {
      setConfirmErrorPasword({
        field: "confirmPassword",
        message: "Please confirm your password",
      });
      flag = false;
    } else {
      setConfirmErrorPasword({
        field: "confirmPassword",
        message: "",
      });
      flag = true;
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
                    {isEmailSec === 0 ? (
                      <div id="login" className="card-body bg-primary">
                        <h3 className="text-white">Sign Up</h3>
                        <div className="mail mb-3">
                          <input
                            onChange={loginHandelar}
                            type="text"
                            name="firstName"
                            className="form-control"
                            placeholder="Enter your first name"
                            value={formData.firstName}
                          />
                          {errorName.field === "firstName" && (
                            <p className="formErrorAlrt">{errorName.message}</p>
                          )}
                        </div>
                        <div className="mail mb-3">
                          <input
                            onChange={loginHandelar}
                            type="text"
                            name="lastName"
                            className="form-control"
                            placeholder="Enter your last name"
                            value={formData.lastName}
                          />
                          {errorLastName.field === "lastName" && (
                            <p className="formErrorAlrt">
                              {errorLastName.message}
                            </p>
                          )}
                        </div>

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
                            <p className="formErrorAlrt">
                              {errorEmail.message}
                            </p>
                          )}
                        </div>
                        <div className="passwd mb-3">
                          <input
                            type="password"
                            onChange={loginHandelar}
                            name="password"
                            className="form-control"
                            placeholder="Enter your password"
                            value={formData.password}
                          />
                          {errorPassword.field === "password" && (
                            <p className="formErrorAlrt">
                              {errorPassword.message}
                            </p>
                          )}
                        </div>
                        <div className="passwd mb-3">
                          <input
                            type="password"
                            onChange={loginHandelar}
                            name="confirmPassword"
                            className="form-control"
                            placeholder="confirm your password"
                            value={formData.confirmPassword}
                          />
                          {confirmErrorPasword.field === "confirmPassword" && (
                            <p className="formErrorAlrt">
                              {confirmErrorPasword.message}
                            </p>
                          )}
                        </div>
                        <div className="submit mb-3">
                          <button
                            className="btn btn-default btn-block"
                            onClick={adminLoginSubmit}
                          >
                            Registration Now
                          </button>
                        </div>
                        <div className="signup mb-0">
                          <p className="text-white mb-0">
                            Already you have a account?
                            <Link to="/" className="text-body ml-1">
                              login now
                            </Link>
                          </p>
                        </div>
                      </div>
                    ) : (
                      <div id="login" className="card-body bg-primary">
                        <h3 className="text-white">Otp Verification</h3>
                        <div className="mail mb-3">
                          <form>
                            <div className="row">
                              <div className="col-md-2 px-2">
                                <input
                                  type="text"
                                  className="form-control"
                                  maxLength={1}
                                  name="firstV"
                                  value={regopt.firstV}
                                  onChange={otpHandaler}
                                  onKeyUp={handleKeyUp}
                                />
                              </div>
                              <div className="col-md-2 px-2">
                                <input
                                  type="text"
                                  className="form-control"
                                  maxLength={1}
                                  name="secndV"
                                  value={regopt.secndV}
                                  onChange={otpHandaler}
                                  onKeyUp={handleKeyUp}
                                />
                              </div>
                              <div className="col-md-2 px-2">
                                <input
                                  type="text"
                                  className="form-control"
                                  maxLength={1}
                                  name="thardV"
                                  value={regopt.thardV}
                                  onChange={otpHandaler}
                                  onKeyUp={handleKeyUp}
                                />
                              </div>
                              <div className="col-md-2 px-2">
                                <input
                                  type="text"
                                  className="form-control"
                                  maxLength={1}
                                  name="fourthV"
                                  value={regopt.fourthV}
                                  onChange={otpHandaler}
                                  onKeyUp={handleKeyUp}
                                />
                              </div>
                              <div className="col-md-2 px-2">
                                <input
                                  type="text"
                                  className="form-control"
                                  maxLength={1}
                                  name="fivetV"
                                  value={regopt.fivetV}
                                  onChange={otpHandaler}
                                  onKeyUp={handleKeyUp}
                                />
                              </div>
                              <div className="col-md-2 px-2">
                                <input
                                  type="text"
                                  className="form-control"
                                  maxLength={1}
                                  name="sixThV"
                                  value={regopt.sixThV}
                                  onChange={otpHandaler}
                                  onKeyUp={handleKeyUp}
                                />
                              </div>
                            </div>
                          </form>
                        </div>
                        <div className="submit mb-3">
                          <button
                            className="btn btn-default btn-block"
                            disabled={buttonDisabl}
                            onClick={otpSubmited}
                          >
                            Login
                          </button>
                        </div>
                      </div>
                    )}
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

export default Signup;
