import React, { useState, useEffect } from "react";
// import { Link } from "react-router-dom";
import Sidebar from "../component/sidebar";
import Footer from "../component/footer";
import PageHeader from "../component/pageHeader";
import * as API from "../helper/apiHelper";
import moment from "moment";
import { loaderGif } from "../comonStatickData";
const Dashboard = () => {
  const [loading, setloading] = useState(true);
  const [isOpen, setIsopen] = useState(false);
  const [subscribDetails, setSubscribDetails] = useState([]);
  const ToggleSidebar = () => {
    isOpen === true ? setIsopen(false) : setIsopen(true);
  };
  // const subscriptionDetails = async () => {
  //   try {
  //     const response = await API.dashBorad_Subscrib();
  //     console.log("response", response);
  //     setSubscribDetails(response.data.data);
  //     setloading(response.data.data);
  //   } catch (error) {
  //     console.log("Error", error);
  //   }
  // };
  // useEffect(() => {
  //   subscriptionDetails();
  // }, []);

  return (
    <div>
      <div className="wave -three"></div>
      <div id="app" className="page">
        <div className="main-wrapper">
          <Sidebar
            isOpen={isOpen}
            setIsopen={setIsopen}
            ToggleSidebar={ToggleSidebar}
          />
          <div
            className={
              isOpen === false ? "app-content" : "activSideBar app-content"
            }
          >
            <section className="section">
              <PageHeader pagetitle="Dashboard" />
              <div className="row">
                <div className="col-lg-6 col-xl-3 col-md-6 col-sm-6 col-12">
                  <div className="card shadow  bg-primary">
                    <div className="card-body">
                      <div className="card-order">
                        <h6 className="mb-2">Total User</h6>
                        <h2 className="text-right">
                          <i className="fa mt-2 float-left fa-cart-plus"></i>
                          <span>3,672</span>
                        </h2>
                        <p className="mb-0">
                          Monthly User
                          <span className="float-right">835</span>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-lg-6 col-xl-3 col-md-6 col-sm-6 col-12">
                  <div className="card shadow bg-success">
                    <div className="card-body">
                      <div className="card-order">
                        <h6 className="mb-2">Total Income</h6>
                        <h2 className="text-right">
                          <i className="fa mt-2 float-left fa-paper-plane"></i>
                          <span>$89,265</span>
                        </h2>
                        <p className="mb-0">
                          Monthly Income
                          <span className="float-right">3,756</span>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-lg-6 col-xl-3 col-md-6 col-sm-6 col-12">
                  <div className="card shadow  bg-info">
                    <div className="card-body">
                      <div className="card-order">
                        <h6 className="mb-2">Total Sales</h6>
                        <h2 className="text-right">
                          <i className="fa mt-2 float-left fa-cart-plus"></i>
                          <span>3,672</span>
                        </h2>
                        <p className="mb-0">
                          Monthly Sales
                          <span className="float-right">835</span>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-lg-6 col-xl-3 col-md-6 col-sm-6 col-12">
                  <div className="card shadow  bg-warning">
                    <div className="card-body">
                      <div className="card-order">
                        <h6 className="mb-2">Total Profit</h6>
                        <h2 className="text-right">
                          <i className="fa mt-2 float-left fa-line-chart"></i>
                          <span>3,672</span>
                        </h2>
                        <p className="mb-0">
                          Monthly Profit
                          <span className="float-right">835</span>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>

          <Footer />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
