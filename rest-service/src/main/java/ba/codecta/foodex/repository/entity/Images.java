package ba.codecta.foodex.repository.entity;

import io.quarkus.hibernate.orm.panache.PanacheEntity;

import javax.persistence.Entity;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;
import java.util.ArrayList;
import java.util.List;

@Entity
public class Images extends PanacheEntity {

    public String imageUrl;


    @ManyToOne()
    private Food foodImage;

    public Food getFoodImage() {
        return foodImage;
    }

    public void setFoodImage(Food foodImage) {
        this.foodImage = foodImage;
    }

    public Food getFood() {
        return foodImage;
    }


    public String getImageUrl() {
        return imageUrl;
    }

    public void setImageUrl(String imageUrl) {
        this.imageUrl = imageUrl;
    }
}
