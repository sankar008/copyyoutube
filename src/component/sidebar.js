import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { adminLogo, allLogo } from "../comonStatickData";
import * as c from "./../api";
import * as API from "./../helper/apiHelper";
import { useHistory } from "react-router-dom";

export default function Sidebar({ isOpen, ToggleSidebar, isRefresh }) {
  const [userData, setUserData] = useState([]);
  console.log("isRefresh", isRefresh);

  const history = useHistory();

  // ? user data geting
  const user_details_geting = async () => {
    try {
      const response = await API.user_geting(localStorage.getItem("userId"));
      console.log("response", response);
      setUserData(response.data.data);
    } catch (error) {}
  };

  useEffect(() => {
    user_details_geting();
  }, []);

  return (
    <>
      <nav className="navbar navbar-expand-lg main-navbar">
        <Link className="header-brand" to="/dashboard">
          Admin Dashboard
        </Link>
        <form className="form-inline mr-auto">
          <ul className="navbar-nav mr-2">
            <li>
              <Link
                href="#"
                onClick={ToggleSidebar}
                class="nav-link nav-link toggle"
              >
                <i class="fa fa-reorder"></i>
              </Link>
            </li>
            <li>
              <Link
                to="#"
                data-toggle="search"
                className="nav-link nav-link d-md-none navsearch"
              >
                <i className="fa fa-search"></i>
              </Link>
            </li>
          </ul>
        </form>
        <ul className="navbar-nav navbar-right">
          <li className="dropdown">
            <Link
              to="#"
              data-toggle="dropdown"
              className="nav-link dropdown-toggle nav-link-lg d-flex"
            >
              <span className="mr-3 mt-2 d-none d-lg-block ">
                <span className="text-white">
                  Hello,
                  <span className="ml-1">{userData.firstName}</span>
                  <span className="ml-1">{userData.lastName}</span>
                </span>
              </span>
              <span>
                <img
                  src={userData.image ? userData.image : adminLogo}
                  alt="profile-user"
                  className="rounded-circle w-32 mr-2"
                />
              </span>
            </Link>
            <div className="dropdown-menu dropdown-menu-right">
              <div className=" dropdown-header noti-title text-center border-bottom pb-3">
                <h5 className="text-capitalize text-dark mb-1">
                  {" "}
                  <span className="ml-1">{userData.firstName}</span>
                  <span className="ml-1">{userData.lastName}</span>
                </h5>
              </div>
              <Link className="dropdown-item" to="/edit-profile">
                <i class="fa fa-pencil-square-o mr-2"></i>
                <span>Edit Profile</span>
              </Link>
              <div className="dropdown-divider"></div>
              <Link className="dropdown-item" to="/">
                <i className="mdi  mdi-logout-variant mr-2"></i>{" "}
                <span>Logout</span>
              </Link>
            </div>
          </li>
        </ul>
      </nav>
      <aside
        className={`app-sidebar sidebar ${isOpen === true ? "active" : ""}`}
      >
        <div className="app-sidebar__user">
          <div className="dropdown user-pro-body text-center">
            <div className="nav-link pl-1 pr-1 leading-none ">
              <img
                src={userData.image ? userData.image : adminLogo}
                alt="user-img"
                className="avatar-xl rounded-circle mb-1"
              />
              <span className="pulse bg-success" aria-hidden="true"></span>
            </div>
            <div className="user-info">
              <span className="ml-1 text-dark">{userData.firstName}</span>
              <span className="ml-1 text-dark">{userData.lastName}</span>
              {/* <span className="text-muted app-sidebar__user-name text-sm">
                Web-Designer
              </span> */}
            </div>
          </div>
        </div>
        <ul className="side-menu">
          <li className="slide">
            <Link
              className="side-menu__item"
              data-toggle="slide"
              to="/dashboard"
            >
              <i className="side-menu__icon fa fa-dashboard"></i>
              <span className="side-menu__label">Dashboard</span>
            </Link>
          </li>
          <li>
            <Link className="side-menu__item" to="/pdf">
              <i className="side-menu__icon fa fa-users"></i>
              <span className="side-menu__label">Generate Pdf</span>
            </Link>
          </li>
          <li>
            <Link className="side-menu__item" to="/history">
              <i className="side-menu__icon fa fa-file-text"></i>
              <span className="side-menu__label">History</span>
            </Link>
          </li>
        </ul>
      </aside>
    </>
  );
}
