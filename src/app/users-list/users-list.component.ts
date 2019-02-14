import {Component, OnDestroy} from '@angular/core';
import {UserService} from '../user.service';
import {User} from '../shared/models/user.model';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss']
})
export class UsersListComponent implements OnDestroy {

  /**
   * User data
   * @type {User[]}
   */
  users: User[];

  /**
   * Contains subscription which react on users data change
   * @type {Subscription}
   */
  usersFromJsonSubscription: Subscription;

  /**
   * @ignore
   */
  constructor(private userService: UserService) {
    this.usersFromJsonSubscription = this.userService.getUsersFromJson().subscribe((users: User[]) => {
      this.users = [];
      users.map(user => {
        this.users.push(new User(user.about, user.address, user.age, user.balance, user.company, user.email,
          user.eyeColor, user.gender, user.guid, user.isActive, user.latitude, user.longitude, user.name, user.phone,
          user.picture, user.registered, user.tags, user._id));
      });
    });
  }

  /**
   * Call on component destroy
   */
  ngOnDestroy(): void {
    this.usersFromJsonSubscription.unsubscribe();
  }

}
