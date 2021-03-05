import { companyService } from "../../shared/services/CompanyService";
import { useEffect, useState } from "react";
import Grid from "@material-ui/core/Grid";
import { CompanyComponent } from "../companyComponent";
import foodBanner from "../../assets/images/pizza.jpg";
import "../../assets/css/companiesList.css";
export function CompaniesList() {
  const [companies, setCompanies] = useState();

  useEffect(() => {
    companyService.getAllCompanies().then((data) => {
      console.log(data);

      setCompanies(data);
    });
  }, []);

  return (
    <div>
      <div
        style={{ backgroundImage: `url(${foodBanner})` }}
        className="foodBanner"
      ></div>
      <div className="company-container">
        <Grid container spacing={3} direction="row">
          {companies?.map((company) => {
            return (
              <Grid key={company.id} item>
                <CompanyComponent
                  description={company.description}
                  id={company.id}
                  logoUrl={company.companyLogo}
                  companyName={company.companyName}
                  companyImage={company.companyImage}
                  companyLocation={company.location}
                ></CompanyComponent>
              </Grid>
            );
          })}
        </Grid>
      </div>
    </div>
  );
}
