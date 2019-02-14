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
  getUsersFromJson(): Observable<User[]> {
    return this.httpClient.get<User[]>('assets/users.json');
  }
}
