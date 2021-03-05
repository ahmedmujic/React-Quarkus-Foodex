import { BehaviorSubject } from "rxjs";

class UserService {
  user = new BehaviorSubject(JSON.parse(localStorage.getItem("user")));

  setUser(user) {
    localStorage.setItem("user", JSON.stringify(user));
  }

  getUser() {
    return JSON.parse(localStorage.getItem("user"));
  }
}

export const usersService = new UserService();
