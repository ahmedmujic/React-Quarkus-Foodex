package ba.codecta.foodex.repository.entity;

import ba.codecta.foodex.helpers.UserCompanyType;
import io.quarkus.hibernate.orm.panache.PanacheEntity;

import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.OneToMany;
import java.util.ArrayList;
import java.util.List;

@Entity
public class CompanyCategory extends PanacheEntity {
    private String category;
    private String categoryImageUrl;

    @OneToMany(mappedBy = "category", fetch = FetchType.LAZY)
    List<Company> companies = new ArrayList<>();

    public String getCategoryImageUrl() {
        return categoryImageUrl;
    }

    public void setCategoryImageUrl(String categoryImageUrl) {
        this.categoryImageUrl = categoryImageUrl;
    }

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    public List<Company> getCompanies() {
        return companies;
    }

    public void setCompanies(List<Company> companies) {
        this.companies = companies;
    }

    public void setCategory(UserCompanyType category) {
        switch (category){
            case CAFFE:
                this.category = "CAFFE";
                break;
            case BAKERY:
                this.category = "BAKERY";
                break;
            case RESTAURANT:
                this.category = "RESTAURANT";
                break;
            case PIZZERIA:
                this.category = "PIZZERIA";
                break;

        }

    }
}
