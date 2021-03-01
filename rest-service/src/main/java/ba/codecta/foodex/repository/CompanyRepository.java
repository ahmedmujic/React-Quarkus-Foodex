package ba.codecta.foodex.repository;

import ba.codecta.foodex.repository.entity.Company;
import io.quarkus.hibernate.orm.panache.PanacheRepository;

import javax.enterprise.context.ApplicationScoped;
import javax.transaction.Transactional;

@ApplicationScoped
@Transactional(Transactional.TxType.MANDATORY)
public class CompanyRepository implements PanacheRepository<Company> {
}
