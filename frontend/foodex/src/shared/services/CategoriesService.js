class CategoriesService {
  getAllCategories() {
    const requestOptions = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    };
    return fetch(
      "http://127.0.0.1:8080/api/food-categories",
      requestOptions
    ).then((response) => {
      if (response.status === 200) {
        return response.json();
      }
    });
    /*.then((data) => {
            console.log(data);
            Emitter.categories.next(data);
          });*/
  }
}
export const categoriesService = new CategoriesService();
