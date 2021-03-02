package ba.codecta.foodex.repository.entity;

import ba.codecta.foodex.helpers.UserCompanyType;
import io.quarkus.hibernate.orm.panache.PanacheEntity;
import io.quarkus.hibernate.orm.panache.PanacheEntityBase;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
public class CompanyCategory extends PanacheEntityBase {
    @SequenceGenerator(
            schema = "FoodEX",
            name = "catSeq",
            sequenceName = "CAT_SEQ",
            allocationSize = 1
    )
    @GeneratedValue(generator = "catSeq", strategy = GenerationType.SEQUENCE)
    @Id
    @Column(name = "id", nullable = false)
    private Integer id;
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

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
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
