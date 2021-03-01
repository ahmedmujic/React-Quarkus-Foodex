package ba.codecta.foodex.services;

import ba.codecta.foodex.services.model.CompanyDto;

import java.util.List;

public interface CompanyService {

    List<CompanyDto> getAllCompanies();
    CompanyDto addCompany(CompanyDto companyDto, String userEmail);
    boolean editCompany(CompanyDto companyDto);
}
