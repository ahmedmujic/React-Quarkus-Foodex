package ba.codecta.foodex.repository.entity;

import io.quarkus.hibernate.orm.panache.PanacheEntityBase;

import javax.persistence.*;
import java.util.List;

@Entity
public class FoodCategory extends PanacheEntityBase{

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

    @OneToMany(mappedBy = "foodCategory")
    List<Food> foodList;
    public Integer getId() {
        return id;
    }

    public List<Food> getFoodList() {
        return foodList;
    }

    public void setFoodList(List<Food> foodList) {
        this.foodList = foodList;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    public String getCategoryImageUrl() {
        return categoryImageUrl;
    }

    public void setCategoryImageUrl(String categoryImageUrl) {
        this.categoryImageUrl = categoryImageUrl;
    }
}
