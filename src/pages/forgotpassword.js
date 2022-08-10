import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom";
import * as C from "../api";
import axios from "axios";
import * as API from "../helper/apiHelper";
import * as appUtils from "../helper/appUtils";
const initialData = {
  email: "",
};
const initialOtpData = {
  firstV: "",
  secndV: "",
  thardV: "",
  fourthV: "",
  fivetV: "",
  sixThV: "",
};

const initialvaluePass = {
  password: "",
  confirmPassword: "",
};
const Forgotpassword = () => {
  const [regopt, setRegopt] = useState(initialOtpData);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState(initialData);
  const [errorEmail, setErrorEmail] = useState("");
  const [isEmail, setIsEmail] = useState(0);
  const [errorMessage, setErrorMessage] = useState("");
  const [newPassword, setNewPassword] = useState(initialvaluePass);
  const [errorPassword, setErrorPassword] = useState("");
  const [confirmErrorPasword, setConfirmErrorPasword] = useState("");

  const history = useHistory();

  localStorage.removeItem("loginId");

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
      };
      console.log("reqObj", reqObj);
      const response = await API.user_email_forgot(reqObj);
      console.log("response", response);
      if (response.data.success === 1) {
        setIsEmail(1);
        setErrorMessage(response.data.message);
      } else {
        setErrorMessage(response.data.message);
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
    setErrorMessage("");
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
        setIsEmail(2);
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

  // ? New password Handelar
  const newPasshandalerChanges = (e) => {
    const { name, value } = e.target;
    switch (name) {
      case "password":
        setErrorPassword("");
        break;
      case "confirmPassword":
        setConfirmErrorPasword("");
        break;
      default:
    }
    setNewPassword({ ...newPassword, [name]: value });
  };

  // ? new password
  const newpasswordSet = async () => {
    setLoading(true);
    let flag = newPassvalidate();
    if (!flag) {
      setLoading(false);
      return;
    }
    try {
      const reqObj = {
        password: newPassword.password,
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
      const response = await API.user_newPassword(reqObj);
      console.log("response", response);
      if (response.status === 200) {
        history.push({
          pathname: "/",
        });
      }
    } catch (error) {}
  };

  //VALIDATE-INPUT
  const validate = () => {
    const { email } = formData;
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

    return flag;
  };

  const newPassvalidate = () => {
    const { password, confirmPassword } = newPassword;
    let flag = true;

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
                    {isEmail === 0 ? (
                      <div id="login" className="card-body bg-primary">
                        <h3 className="text-white">Forgot password</h3>
                        {errorMessage ? (
                          <p className="formErrorAlrt">{errorMessage}</p>
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
                            <p className="formErrorAlrt">
                              {errorEmail.message}
                            </p>
                          )}
                        </div>
                        <div className="submit mb-3">
                          <button
                            className="btn btn-default btn-block"
                            onClick={adminLoginSubmit}
                          >
                            Submit
                          </button>
                        </div>
                      </div>
                    ) : isEmail === 1 ? (
                      <div id="login" className="card-body bg-primary">
                        <h3 className="text-white">Otp Verification</h3>
                        {errorMessage ? (
                          <p className="text-success">{errorMessage}</p>
                        ) : (
                          ""
                        )}
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
                            Submit
                          </button>
                        </div>
                      </div>
                    ) : (
                      <div id="login" className="card-body bg-primary">
                        <h3 className="text-white">Reset your password</h3>
                        <div className="passwd mb-3">
                          <input
                            type="password"
                            onChange={newPasshandalerChanges}
                            name="password"
                            className="form-control"
                            placeholder="Enter your Password"
                            value={newPassword.password}
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
                            onChange={newPasshandalerChanges}
                            name="confirmPassword"
                            className="form-control"
                            placeholder="confirm your password"
                            value={newPassword.confirmPassword}
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
                            onClick={newpasswordSet}
                          >
                            Submit
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

export default Forgotpassword;
