package ba.codecta.foodex.repository.entity;

import io.quarkus.hibernate.orm.panache.PanacheEntity;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
public class Food extends PanacheEntity {

    public String name;

    @OneToMany(mappedBy = "foodImage", fetch = FetchType.LAZY)
    public List<Images> imagesList = new ArrayList<>();

    @ManyToOne()
    private Company company;

    @ManyToOne
    private FoodCategory foodCategory;

    public FoodCategory getFoodCategory() {
        return foodCategory;
    }

    public void setFoodCategory(FoodCategory foodCategory) {
        this.foodCategory = foodCategory;
    }

    public Company getCompany() {
        return company;
    }

    public void setCompany(Company company) {
        this.company = company;
    }

    public String getName() {
        return name;
    }


    public void setName(String name) {
        this.name = name;
    }

    public List<Images> getImagesList() {
        return imagesList;
    }

    public void setImagesList(List<Images> imagesList) {
        this.imagesList = imagesList;
    }
}
