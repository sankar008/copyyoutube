import React, { useEffect, useState } from "react";
import Header from "../component/header";
import Sidebar from "../component/sidebar";
import Footer from "../component/footer";
import PageHeader from "../component/pageHeader";
import { Link } from "react-router-dom";
import * as API from "../helper/apiHelper";
import { useHistory } from "react-router-dom";
import { loaderGif } from "../comonStatickData";
import { Document, Page } from "react-pdf/dist/esm/entry.webpack";
import * as c from "../api";
import pdfFile from "../img/test.pdf";
import { PDFReader } from "reactjs-pdf-reader";
import { ProgressBar } from "react-bootstrap";

const Users = () => {
  const [formData, setFormData] = useState("");
  const [titleData, setTitleData] = useState("");
  const [loading, setLoading] = useState(false);
  const [pdfData, setPdfData] = useState("");
  const [isStatusClass, setIsStatusClass] = useState(0);
  const [progressBar, setProgressBar] = useState("");
  console.log("progressBar", localStorage.getItem("progressBar"));

  const history = useHistory();
  // ? API CALLING
  const delay = ms => new Promise(
    resolve => setTimeout(resolve, ms)
 );
  const youtubtopdf = async () => {
    setIsStatusClass(1)
    setLoading(true);
    try {
      const reqObj = {
        userId: localStorage.getItem("userId"),
        link: formData,
        title: titleData,
      };
      const OneResponse = await API.link_to_pdf(reqObj);
      if (OneResponse.data.success === 1) {
        setProgressBar(OneResponse.data.progress);
        const Secresponse = await API.Generate_PDF(OneResponse.data.data._id);
        if (Secresponse.data.success === 1) {
          setProgressBar(Secresponse.data.progress)
          const reqObj = {
            id: OneResponse.data.data._id,
            image: Secresponse.data.data,
          };

           await delay(5000);

            const Thrdresponse = await API.save_pdf(reqObj);
            if (Thrdresponse.data.success === 1) {
              setProgressBar(Thrdresponse.data.progress);
              setLoading(false);
              await delay(3000);
              history.push({
                pathname: "/history",
              });
            }

         
        }
      }
    } catch (error) {}
  };

  return (
    <div>
      <div className="wave -three"></div>
      <div id="app" className="page">
        <div className="main-wrapper">
          {/* <Header /> */}
          <Sidebar />
          <div className="app-content user">
            <section className="section">
              <PageHeader pagetitle="PDF" />
              <div className="row">
                <div className="col-12 col-sm-12">
                  <div className="card">
                    <div className="card-header">
                      <h4>PDF</h4>
                    </div>
                    <div className="card-body">
                      <div className="row mb-3 justify-content-center">
                        <div className="col-md-1">
                          <label>Title</label>
                        </div>
                        <div className="col-md-4 text-center">
                          <input
                            type="text"
                            className="form-control"
                            placeholder="Enter title here"
                            onChange={(event) =>
                              setTitleData(event.target.value)
                            }
                          />
                        </div>
                        <div className="col-md-1">
                          <label>Url</label>
                        </div>
                        <div className="col-md-4 text-center">
                          <input
                            type="text"
                            className="form-control"
                            placeholder="Enter url here"
                            onChange={(event) =>
                              setFormData(event.target.value)
                            }
                          />
                        </div>
                      </div>
                          
                      <div className="row mb-3 justify-content-center">
                        {isStatusClass === 1 ? (<>
                          <div className="col-md-6 text-center">
                              <ProgressBar animated now={progressBar}  />
                          </div>
                          <div className="col-md-2">
                            <span className="progressBarCount">
                              {progressBar} %
                            </span>
                          </div>
                        </>) : ("")}
                        

                        <div className="col-md-12 text-center">
                          {loading ? (
                            <button className="btn btn-primary mt-4">
                              Inprogress...
                            </button>
                          ) : (
                            <button
                              onClick={youtubtopdf}
                              disabled={!formData || !titleData}
                              className="btn btn-primary mt-4"
                            >
                              Submit
                            </button>
                          )}
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

export default Users;
