import React, { useEffect, useState } from "react";
import Header from "../component/header";
import Sidebar from "../component/sidebar";
import Footer from "../component/footer";
import PageHeader from "../component/pageHeader";
import { Link } from "react-router-dom";
import * as API from "../helper/apiHelper";
import * as c from "../api";
import { useHistory } from "react-router-dom";
import { loaderGif } from "../comonStatickData";

const HistoryPDF = () => {
  const history = useHistory();
  const [userTable, setUserTable] = useState([]);
  const [successmsg, setSuccessmessage] = useState("");
  const [errormessage, setErrormessage] = useState([]);
  const [loading, setloading] = useState(true);

  const userYoutubPdfData = async () => {
    try {
      const response = await API.user_pdf_dataget(
        localStorage.getItem("userId")
      );
      console.log("response", response);
      if (response.status === 200) {
        setloading(response.data.data);
        setUserTable(response.data.data);
      }
    } catch (error) {}
  };

  useEffect(() => {
    setSuccessmessage(history.location.message);
    userYoutubPdfData();
  }, []);

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
                      <h4>PDF List</h4>
                    </div>
                    <div className="card-body">
                      <div className="row mb-3">
                        <div className="col-md-9">
                          <span className="delete">{successmsg}</span>
                        </div>
                        <div className="col-md-3"></div>
                      </div>
                      {loading === true ? (
                        <>
                          <div className="loadingPart">
                            <img className="loaderImg" src={loaderGif} alt="" />
                            {/* <h4>Loading ...</h4> */}
                          </div>
                        </>
                      ) : (
                        <>
                          <div className="table-responsive text-center">
                            <table className="table table-bordered text-nowrap mb-0">
                              <thead>
                                <tr>
                                  <th>#No</th>
                                  <th>Title</th>
                                  <th>Link</th>
                                  <th>document</th>
                                </tr>
                              </thead>
                              <tbody>
                                {userTable.map((item, index) => {
                                  return (
                                    <tr key={item.id}>
                                      <td>{index + 1}</td>
                                      <td>{item.title}</td>
                                      <td>{item.link}</td>
                                      <td className="text-capitalize">
                                        <div className="toolTipc">
                                          <Link
                                            to={{
                                              pathname:
                                                c.IMG_URL + "/" + item.image,
                                            }}
                                            target="_blank"
                                          >
                                            <i class="fa fa-file fileDownload"></i>
                                          </Link>
                                          <span>This is Pdf</span>
                                        </div>
                                        <div className="toolTipc">
                                          <Link
                                            to={{
                                              pathname:
                                                "https://youtube.apibag.in?url=" +
                                                c.IMG_URL +
                                                item.image,
                                            }}
                                            target="_blank"
                                          >
                                            <i class="fa fa-book pdfBook"></i>
                                          </Link>
                                          <span>This is Pdf Flipbook.</span>
                                        </div>
                                      </td>
                                    </tr>
                                  );
                                })}
                              </tbody>
                            </table>
                          </div>
                        </>
                      )}
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

export default HistoryPDF;
