import { Home } from "./content/home";
import { Register } from "./content/auth/register/register";
import { Route, Switch, useHistory } from "react-router-dom";
import { Login } from "./content/auth/login/login";
import { CompanyManagement } from "./content/dashboard/companyManagment/companyManagement";
import { useEffect } from "react";
import { Emitter } from "../shared/Emitter";
import { CompanyInfo } from "./companyInfo";

export function Content() {
  let history = useHistory();
  function getAllCategories() {
    const requestOptions = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    };
    fetch("http://127.0.0.1:8080/api/food-categories", requestOptions)
      .then((response) => {
        if (response.status === 200) {
          return response.json();
        }
      })
      .then((data) => {
        console.log(data);
        Emitter.categories.next(data);
      });
  }

  function getAllCompanies() {
    const requestOptions = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    };
    fetch("http://127.0.0.1:8080/api/companies-all", requestOptions)
      .then((response) => {
        if (response.status === 200) {
          return response.json();
        }
      })
      .then((data) => {
        console.log(data);
        Emitter.companies.next(data);
      });
  }

  useEffect(() => {
    getAllCategories();
    getAllCompanies();
  }, []);
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
        <Route exact path="/dashboard/company/:id">
          <CompanyInfo />
        </Route>
      </Switch>
    </div>
  );
}
