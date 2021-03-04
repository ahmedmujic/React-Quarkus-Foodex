import { BehaviorSubject, Subject } from "rxjs";

export class Emitter {
  static user = new BehaviorSubject();
  static categories = new Subject();
  static usersCompanies = new Subject();
  static companies = new Subject();
}
