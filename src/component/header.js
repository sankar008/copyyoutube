import React from "react";
import { Link } from "react-router-dom";
// import MainLogo from "../";
// import MainLogo from "../../public/assets/img/brand/logo-white.png";

export default function header() {
  return (
    <>
      <nav className="navbar navbar-expand-lg main-navbar">
        <Link className="header-brand" to="/">
          {/* <img
            src="assets/img/brand/logo.png"
            className="header-brand-img"
            alt="Admin logo"
          /> */}
        </Link>
        <form className="form-inline mr-auto">
          <ul className="navbar-nav mr-2">
            <li>
              <a
                href="#"
                data-toggle="sidebar"
                class="nav-link nav-link toggle"
              >
                <i class="fa fa-reorder"></i>
              </a>
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
          {/* <div className="search-element mr-3">
          <input
            className="form-control"
            type="search"
            placeholder="Search"
            aria-label="Search"
          />
          <span className="Search-icon">
            <i className="fa fa-search"></i>
          </span>
        </div> */}
        </form>
        <ul className="navbar-nav navbar-right">
          {/* <li className="dropdown dropdown-list-toggle d-none d-lg-block ">
          <Link
            to="#"
            data-toggle="dropdown"
            className="nav-link  nav-link-lg "
          >
            <i className=" fa fa-flag-o "></i>
          </Link>
          <div className="dropdown-menu dropdown-menu-lg  dropdown-menu-right">
            <Link to="#" className="dropdown-item d-flex align-items-center">
              <img
                src="assets/img/flags/french_flag.jpg"
                alt="flag-img"
                className=" flag-sm mr-3 align-self-center"
              />
              <div>
                <strong>French</strong>
              </div>
            </Link>
            <Link to="#" className="dropdown-item d-flex align-items-center">
              <img
                src="assets/img/flags/germany_flag.jpg"
                alt="flag-img"
                className=" flag-sm mr-3 align-self-center"
              />
              <div>
                <strong>Germany</strong>
              </div>
            </Link>
            <Link to="#" className="dropdown-item d-flex align-items-center">
              <img
                src="assets/img/flags/italy_flag.jpg"
                alt="flag-img"
                className=" flag-sm  mr-3 align-self-center"
              />
              <div>
                <strong>Italy</strong>
              </div>
            </Link>
            <Link to="#" className="dropdown-item d-flex align-items-center">
              <img
                src="assets/img/flags/russia_flag.jpg"
                alt="flag-img"
                className=" flag-sm mr-3 align-self-center"
              />
              <div>
                <strong>Russia</strong>
              </div>
            </Link>
            <Link to="#" className="dropdown-item d-flex align-items-center">
              <img
                src="assets/img/flags/spain_flag.jpg"
                alt="flag-img"
                className=" flag-sm mr-3 align-self-center"
              />
              <div>
                <strong>Spain</strong>
              </div>
            </Link>
          </div>
        </li> */}
          <li className="dropdown dropdown-list-toggle ">
            <Link
              to="#"
              data-toggle="dropdown"
              className="nav-link  nav-link-lg "
            >
              <span className="badge badge-danger nav-link-badge">5</span>
              <i className="hvr-buzz fa fa-envelope-o"></i>
            </Link>
            <div className="dropdown-menu dropdown-list dropdown-menu-right">
              <div className="dropdown-header">
                Messages
                {/* <div className="float-right">
                  <Link to="#" className="text-white">
                    View All
                  </Link>
                </div> */}
              </div>
              <div className="dropdown-list-content">
                <Link to="#" className="dropdown-item dropdown-item-unread">
                  <img
                    alt="image1"
                    src="assets/img/avatar/avatar-3.jpeg"
                    className="rounded-circle dropdown-item-img"
                  />
                  <div className="dropdown-item-desc">
                    <div className="dropdownmsg d-flex">
                      <div className="">
                        <b>Stewart Ball</b>
                        <p>Your template awesome</p>
                      </div>
                      <div className="time">6 hours ago</div>
                    </div>
                  </div>
                </Link>
                <Link to="#" className="dropdown-item dropdown-item-unread">
                  <img
                    alt="image2"
                    src="assets/img/avatar/avatar-2.jpeg"
                    className="rounded-circle dropdown-item-img"
                  />
                  <div className="dropdown-item-desc">
                    <div className="dropdownmsg d-flex">
                      <div className="">
                        <b>Jonathan North</b>
                        <p>Your Order Shipped.....</p>
                      </div>
                      <div className="time">45 mins ago</div>
                    </div>
                  </div>
                </Link>
                <Link to="#" className="dropdown-item">
                  <img
                    alt="image3"
                    src="assets/img/avatar/avatar-4.jpeg"
                    className="rounded-circle dropdown-item-img"
                  />
                  <div className="dropdown-item-desc">
                    <div className="dropdownmsg d-flex">
                      <div className="">
                        <b>Victor Taylor</b>
                        <p>Hi!, I' am web developer</p>
                      </div>
                      <div className="time"> 8 hours ago</div>
                    </div>
                  </div>
                </Link>
                <Link to="#" className="dropdown-item">
                  <img
                    alt="image4"
                    src="assets/img/avatar/avatar-3.jpeg"
                    className="rounded-circle dropdown-item-img"
                  />
                  <div className="dropdown-item-desc">
                    <div className="dropdownmsg d-flex">
                      <div className="">
                        <b>Ruth Arnold</b>
                        <p>Hi!, I' am web designer</p>
                      </div>
                      <div className="time"> 3 hours ago</div>
                    </div>
                  </div>
                </Link>
                <Link to="#" className="dropdown-item">
                  <img
                    alt="image5"
                    src="assets/img/avatar/avatar-5.jpeg"
                    className="rounded-circle dropdown-item-img"
                  />
                  <div className="dropdown-item-desc">
                    <div className="dropdownmsg d-flex">
                      <div className="">
                        <b>Sam Lyman</b>
                        <p>Hi!, I' am java developer</p>
                      </div>
                      <div className="time"> 15 mintues ago</div>
                    </div>
                  </div>
                </Link>
              </div>
            </div>
          </li>
          <li className="dropdown dropdown-list-toggle">
            <Link
              to="#"
              data-toggle="dropdown"
              className="nav-link  nav-link-lg "
            >
              <span className="badge badge-secondary nav-link-badge">6</span>
              <i className="fa fa-bell-o"></i>
            </Link>
            <div className="dropdown-menu dropdown-list dropdown-menu-right">
              <div className="dropdown-header">
                Notifications
                {/* <div className="float-right">
                  <Link to="#" className="text-white">
                    View All
                  </Link>
                </div> */}
              </div>
              <div className="dropdown-list-content">
                <Link to="#" className="dropdown-item">
                  <i className="fa fa-users text-primary"></i>
                  <div className="dropdown-item-desc">
                    <b>So many Users Visit your template</b>
                  </div>
                </Link>
                <Link to="#" className="dropdown-item">
                  <i className="fa fa-exclamation-triangle text-danger"></i>
                  <div className="dropdown-item-desc">
                    <b>Error message occurred....</b>
                  </div>
                </Link>
                <Link to="#" className="dropdown-item">
                  <i className="fa fa-users text-warning"></i>
                  <div className="dropdown-item-desc">
                    <b> Adding new people</b>
                  </div>
                </Link>
                <Link to="#" className="dropdown-item">
                  <i className="fa fa-shopping-cart text-success"></i>
                  <div className="dropdown-item-desc">
                    <b>Your items Arrived</b>
                  </div>
                </Link>
                <Link to="#" className="dropdown-item">
                  <i className="fa fa-comment text-primary"></i>
                  <div className="dropdown-item-desc">
                    <b>New Message received</b>{" "}
                    <div className="float-right">
                      <span className="badge badge-pill badge-danger badge-sm">
                        67
                      </span>
                    </div>
                  </div>
                </Link>
                <Link to="#" className="dropdown-item">
                  <i className="fa fa-users text-primary"></i>
                  <div className="dropdown-item-desc">
                    <b>So many Users Visit your template</b>
                  </div>
                </Link>
              </div>
            </div>
          </li>

          <li className="dropdown">
            <Link
              to="#"
              data-toggle="dropdown"
              className="nav-link dropdown-toggle nav-link-lg d-flex"
            >
              <span className="mr-3 mt-2 d-none d-lg-block ">
                <span className="text-white">
                  Hello,<span className="ml-1"> Alica Nestle</span>
                </span>
              </span>
              <span>
                <img
                  src="assets/img/avatar/avatar-3.jpeg"
                  alt="profile-user"
                  className="rounded-circle w-32 mr-2"
                />
              </span>
            </Link>
            <div className="dropdown-menu dropdown-menu-right">
              <div className=" dropdown-header noti-title text-center border-bottom pb-3">
                <h5 className="text-capitalize text-dark mb-1">Alica Nestle</h5>
                <small className="text-overflow m-0"> Web-Designer</small>
              </div>
              <Link className="dropdown-item" to="/userdetails">
                <i className="mdi mdi-account-outline mr-2"></i>{" "}
                <span>My profile</span>
              </Link>
              <Link className="dropdown-item" to="#">
                <i className="mdi mdi-settings mr-2"></i> <span>Settings</span>
              </Link>
              <Link className="dropdown-item" to="#">
                <i className=" mdi mdi-message-outline mr-2"></i>{" "}
                <span>Mails</span>
              </Link>
              <Link className="dropdown-item" to="#">
                <i className=" mdi mdi-account-multiple-outline mr-2"></i>{" "}
                <span>Friends</span>
              </Link>
              <Link className="dropdown-item" to="#">
                <i className="fe fe-calendar mr-2"></i> <span>Activity</span>
              </Link>
              <Link className="dropdown-item" to="#">
                <i className="mdi mdi-compass-outline mr-2"></i>{" "}
                <span>Support</span>
              </Link>
              <div className="dropdown-divider"></div>
              <Link className="dropdown-item">
                <i className="mdi  mdi-logout-variant mr-2"></i>{" "}
                <span>Logout</span>
              </Link>
            </div>
          </li>
        </ul>
      </nav>
    </>
  );
}
