import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

import {User} from './shared/models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  /**
   * @ignore
   */
  constructor(private httpClient: HttpClient) {}

  /**
   * To get users from json file
   */
  getUsersFromJson(): Observable<any[]> {
    return this.httpClient.get<any[]>('assets/users.json');
  }

  /**
   * Get users data from localStorage
   * @return {User[]}
   */
  getUserFromLocalStorage(): User[] {
    return JSON.parse(localStorage.getItem('users')) || null;
  }

  /**
   * Save users to local storage
   * @param {Users[]} users
   */
  saveUsers(users: User[]) {
    localStorage.setItem('users', JSON.stringify(users));
  }
}
