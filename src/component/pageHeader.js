import React from "react";
// import { Link } from "react-router-dom";

const PageHeader = (props) => {
  return (
    <div className="page-header">
      <h4 className="page-title">{props.pagetitle}</h4>
      {/* <ol className="breadcrumb">
        <li className="breadcrumb-item">
          <Link to="#" className="text-light-color">
            Home
          </Link>
        </li>
        <li className="breadcrumb-item active" aria-current="page">
          Dashboard
        </li>
      </ol> */}
    </div>
  );
};

export default PageHeader;
