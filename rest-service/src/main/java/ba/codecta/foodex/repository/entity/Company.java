package ba.codecta.foodex.repository.entity;

import io.quarkus.hibernate.orm.panache.PanacheEntity;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
public class Company extends PanacheEntity {



    private String companyName;
    private Integer score;
    private String location;

    private String companyLogo;

    private String companyImage;

    @ManyToOne()
    CompanyCategory category;

    @ManyToOne()
    UserEntity user;

    @OneToMany(mappedBy = "company",  fetch = FetchType.EAGER, cascade = CascadeType.ALL)
    List<Food> foods = new ArrayList<>();

    public Integer getScore() {
        return score;
    }

    public String getLocation() {
        return location;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public void setLocation(String location) {
        this.location = location;
    }

    public String getCompanyLogo() {
        return companyLogo;
    }

    public void setCompanyLogo(String companyLogo) {
        this.companyLogo = companyLogo;
    }

    public String getCompanyImage() {
        return companyImage;
    }

    public void setCompanyImage(String companyImage) {
        this.companyImage = companyImage;
    }

    public void setScore(Integer score) {
        this.score = score;
    }

    public List<Food> getFoods() {
        return foods;
    }

    public void setFoods(List<Food> foods) {
        this.foods = foods;
    }

    public CompanyCategory getCategory() {
        return category;
    }

    public void setCategory(CompanyCategory category) {
        this.category = category;
    }



    public String getCompanyName() {
        return companyName;
    }

    public void setCompanyName(String companyName) {
        this.companyName = companyName;
    }

    public UserEntity getUser() {
        return user;
    }

    public void setUser(UserEntity user) {
        this.user = user;
    }
}