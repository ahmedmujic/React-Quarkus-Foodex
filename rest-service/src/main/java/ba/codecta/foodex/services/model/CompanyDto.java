package ba.codecta.foodex.services.model;

import ba.codecta.foodex.helpers.UserCompanyType;
import ba.codecta.foodex.repository.entity.CompanyCategory;
import ba.codecta.foodex.repository.entity.Food;
import ba.codecta.foodex.repository.entity.Images;
import com.fasterxml.jackson.annotation.JsonInclude;

import javax.persistence.ManyToOne;
import java.util.ArrayList;
import java.util.List;

public class CompanyDto {
    private Long id;
    private String companyName;
    private Double score;
    private String location;
    private String companyLogo;
    private String companyImage;
    private CompanyCategory category;

    private  List<FoodsDto> foods = new ArrayList<>();

    public String getCompanyName() {
        return companyName;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public void setCompanyName(String companyName) {
        this.companyName = companyName;
    }

    public Double getScore() {
        return score;
    }

    public void setScore(Double score) {
        this.score = score;
    }

    public String getLocation() {
        return location;
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

    public CompanyCategory getCategory() {
        return category;
    }

    public void setCategory(CompanyCategory category) {
        this.category = category;
    }

    public List<FoodsDto> getFoods() {
        return foods;
    }

    public void setFoods(List<FoodsDto> foods) {
        this.foods = foods;
    }
}
