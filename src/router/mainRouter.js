import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Dashboard from "../pages/dashboard";
import Users from "../pages/users";
import Login from "../pages/login";
import Signup from "../pages/signup";
import Forgotpassword from "../pages/forgotpassword";
import HistoryPDF from "../pages/history";
import Editprofile from "../pages/editprofile";

const MainRouter = () => {
  return (
    <div>
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={Login} />
          <Route exact path="/signup" component={Signup} />
          <Route exact path="/dashboard" component={Dashboard} />
          <Route exact path="/edit-profile" component={Editprofile} />
          <Route exact path="/pdf" component={Users} />
          <Route exact path="/history" component={HistoryPDF} />
          <Route exact path="/forgotpassword" component={Forgotpassword} />
        </Switch>
      </BrowserRouter>
    </div>
  );
};

export default MainRouter;
