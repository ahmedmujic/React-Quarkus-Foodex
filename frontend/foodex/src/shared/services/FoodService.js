class FoodService {
  addFood(
    foodName,
    selectedCategory,
    foodImages,
    foodDescription,
    token,
    selectedCompany
  ) {
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        name: foodName,
        imagesList: foodImages,
        foodCategoryId: selectedCategory,
        description: foodDescription,
      }),
    };
    return fetch(
      `http://localhost:8080/api/food/add/${selectedCompany}/${selectedCategory}`,
      requestOptions
    ).then((response) => {
      if (response.status === 200) {
        return response.json();
      }
    });
  }
}
export const foodService = new FoodService();
