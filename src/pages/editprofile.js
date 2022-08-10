import React, { useEffect, useState } from "react";
import Sidebar from "../component/sidebar";
import Footer from "../component/footer";
import PageHeader from "../component/pageHeader";
import { Link } from "react-router-dom";
import * as API from "../helper/apiHelper";
import { useHistory } from "react-router-dom";
import * as c from "../api";
const initialvalue = {
  firstName: "",
  lastName: "",
  email: "",
};
const Editprofile = () => {
  const [formData, setFormData] = useState(initialvalue);
  const [imageData, setImageData] = useState("");
  const [isRefresh, setIsRefresh] = useState(0);
  const [message, setMessage] = useState("");

  // ? input handaler

  const editHandalerImg = (e) => {
    let images = e.target.files[0];
    console.log(images);
    var reader = new FileReader();
    reader.onloadend = function () {
      setImageData(reader.result);
    };
    reader.readAsDataURL(images);
  };

  const editHandaler = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // ? user update
  const editProfile = async () => {
    try {
      const reQObj = {
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        image: imageData,
        id: localStorage.getItem("userId"),
      };
      console.log("reQObj", reQObj);
      const response = await API.user_update(reQObj);
      console.log("response", response);
      if (response.data.success === 1) {
        setIsRefresh(1);
        user_details_geting();
        setMessage(response.data.msg);
      }
    } catch (error) {}
  };

  const btnDisable =
    !formData.firstName || !formData.lastName || !formData.email || !imageData;

  // ? user data geting
  const user_details_geting = async () => {
    try {
      const response = await API.user_geting(localStorage.getItem("userId"));
      console.log("response", response);
      setFormData(response.data.data);
      setImageData(response.data.data.image);
    } catch (error) {}
  };

  useEffect(() => {
    user_details_geting();
  }, []);

  return (
    <div>
      <div className="wave -three"></div>
      <div id="app" className="page">
        <div className="main-wrapper">
          {/* <Header /> */}
          <Sidebar isRefresh={isRefresh} />
          <div className="app-content user">
            <section className="section">
              <PageHeader pagetitle="Edit Profile" />
              <div className="row">
                <div className="col-12 col-sm-12">
                  <div className="card">
                    <div className="card-header">
                      <h4>Edit Profile</h4>
                    </div>
                    <div className="card-body">
                      <p className="fs-15 text-success">{message}</p>
                      <div className="row mb-3 justify-content-center">
                        <div className="col-md-3">
                          <div class="profile-pic-wrapper">
                            <div class="pic-holder">
                              <img
                                id="profilePic"
                                class="pic"
                                src={
                                  imageData
                                    ? imageData
                                    : "https://source.unsplash.com/random/150x150?person"
                                }
                              />

                              <input
                                class="uploadProfileInput"
                                type="file"
                                name="image"
                                id="newProfilePhoto"
                                accept="image/*"
                                onChange={editHandalerImg}
                              />
                              <label
                                for="newProfilePhoto"
                                class="upload-file-block"
                              >
                                <div class="text-center">
                                  <div class="mb-2">
                                    <i class="fa fa-camera fa-2x"></i>
                                  </div>
                                  <div class="text-uppercase">
                                    Update <br /> Profile Photo
                                  </div>
                                </div>
                              </label>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="row mb-3 justify-content-center">
                        <div className="col-md-2">
                          <label>First Name</label>
                        </div>
                        <div className="col-md-5 text-center">
                          <input
                            type="text"
                            className="form-control mb-3"
                            onChange={editHandaler}
                            value={formData.firstName}
                            name="firstName"
                          />
                        </div>
                      </div>
                      <div className="row mb-3 justify-content-center">
                        <div className="col-md-2">
                          <label>Last Name</label>
                        </div>
                        <div className="col-md-5 text-center">
                          <input
                            type="text"
                            className="form-control mb-3"
                            onChange={editHandaler}
                            value={formData.lastName}
                            name="lastName"
                          />
                        </div>
                      </div>
                      <div className="row mb-3 justify-content-center">
                        <div className="col-md-2">
                          <label>Email Address</label>
                        </div>
                        <div className="col-md-5 text-center">
                          <input
                            type="text"
                            className="form-control mb-3"
                            onChange={editHandaler}
                            value={formData.email}
                            name="email"
                            readOnly
                          />
                        </div>
                      </div>
                      <div className="row mb-3 justify-content-center">
                        <div className="col-md-2">
                          <button
                            disabled={btnDisable}
                            onClick={editProfile}
                            className="btn btn-primary"
                          >
                            Submit
                          </button>
                        </div>
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

export default Editprofile;
