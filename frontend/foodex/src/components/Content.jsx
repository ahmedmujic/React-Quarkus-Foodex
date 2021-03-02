import { Home } from "./content/home";
import { Register } from "./content/auth/register/register";
import { Route, Switch, useHistory } from "react-router-dom";
import { Login } from "./content/auth/login/login";
import { CompanyManagement } from "./content/dashboard/companyManagment/companyManagement";
export function Content() {
  let history = useHistory();
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
      </Switch>
    </div>
  );
}
