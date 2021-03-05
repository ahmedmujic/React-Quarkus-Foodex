import { BehaviorSubject, Subject } from "rxjs";

export class Emitter {
  static user = new BehaviorSubject();
  static categories = new BehaviorSubject();
  static usersCompanies = new BehaviorSubject();
  static companies = new BehaviorSubject();
}
