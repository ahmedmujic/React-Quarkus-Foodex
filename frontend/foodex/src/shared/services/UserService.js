import { BehaviorSubject } from "rxjs";

class UserService {
  user = new BehaviorSubject(JSON.parse(localStorage.getItem("user")));

  setUser(user) {
    localStorage.setItem("user", JSON.stringify(user));
  }

  getUser() {
    return JSON.parse(localStorage.getItem("user"));
  }

  login(email, password) {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    };
    return fetch("http://localhost:8080/api/auth/login", requestOptions);
  }
  register(email, password, name) {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: email,
        password: password,
        name: name,
      }),
    };
    return fetch("http://localhost:8080/api/auth/register", requestOptions);
  }
}

export const usersService = new UserService();
