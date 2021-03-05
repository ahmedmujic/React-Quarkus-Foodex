class CompanyService {
  getUserCompanies(token) {
    const requestOptions = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    return fetch("http://127.0.0.1:8080/api/companies", requestOptions).then(
      (response) => {
        if (response.status === 200) {
          return response.json();
        }
      }
    );
  }

  getAllCompanies() {
    const requestOptions = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    };

    return fetch(
      "http://127.0.0.1:8080/api/companies-all",
      requestOptions
    ).then((response) => {
      if (response.status === 200) {
        return response.json();
      }
    });
  }

  addCompany(
    companyName,
    companyLatitudeLocation,
    companyLongitudeLocation,
    companyLogo,
    companyImage,
    companyDescription,
    token
  ) {
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        companyName: companyName,
        location: companyLatitudeLocation + "," + companyLongitudeLocation,
        companyLogo: companyLogo,
        companyImage: companyImage,
        description: companyDescription,
      }),
    };
    return fetch(
      "http://localhost:8080/api/companies/add",
      requestOptions
    ).then((response) => {
      if (response.status === 200) {
        return response.json();
      }
    });
  }

  getCompanyByCompanyId(id) {
    const requestOptions = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    };

    return fetch(
      `http://localhost:8080/api/company/${id}`,
      requestOptions
    ).then((response) => {
      if (response.status === 200) {
        return response.json();
      }
    });
  }
}
export const companyService = new CompanyService();
