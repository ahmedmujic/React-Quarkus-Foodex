import { Home } from "./content/home";
import { Register } from "./content/auth/register/register";
import { Route, Switch, useHistory } from "react-router-dom";
import { Login } from "./content/auth/login/login";
import { CompanyManagement } from "./content/dashboard/companyManagment/companyManagement";
import { CompaniesList } from "./content/companiesList";
import { useEffect } from "react";
import { Emitter } from "../shared/Emitter";
import { CompanyInfo } from "./companyInfo";

export function Content() {
  let history = useHistory();

  function getAllCompanies() {
    /*.then((data) => {
        console.log(data);
        Emitter.companies.next(data);
      });*/
  }

  useEffect(() => {}, []);
  return (
    <div>
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route exact path="/auth/register">
          <Register />
        </Route>
        <Route exact path="/auth/login">
          <Login />
        </Route>
        <Route exact path="/dashboard">
          <CompanyManagement />
        </Route>
        <Route exact path="/company/:id">
          <CompanyInfo />
        </Route>
        <Route exact path="/companies">
          <CompaniesList />
        </Route>
      </Switch>
    </div>
  );
}
