import {Component, OnDestroy} from '@angular/core';
import {UserService} from '../user.service';
import {User} from '../shared/models/user.model';
import {Subscription} from 'rxjs';
import {MatDialog, MatDialogConfig, MatDialogRef} from '@angular/material';
import {AddUserModalComponent} from '../components/add-user-modal/add-user-modal.component';

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
  constructor(private userService: UserService,
              public dialog: MatDialog) {
    this.users = this.userService.getUserFromLocalStorage();
    if (!this.users) {
      this.usersFromJsonSubscription = this.userService.getUsersFromJson().subscribe((users: any[]) => {
        this.users = [];
        users.map(user => {
          this.users.push(new User(user.about, user.address, user.age, user.balance, user.company, user.email,
            user.eyeColor, user.gender, user.guid, user.isActive, user.latitude, user.longitude, user.name, user.phone,
            user.picture, user.registered, user.tags, user._id));
        });
        this.userService.saveUsers(this.users);
      });
    }
  }

  /**
   * Delete user from array
   * @param {number} userId
   */
  deleteUser(userId: string) {
    for (let i = 0; i < this.users.length; i++) {
      if (this.users[i]._id === userId) {
        this.users.splice(i, 1);
        this.userService.saveUsers(this.users);
        break;
      }
    }
  }

  /**
   * Track by fn for users ngFor
   * @param {number} index
   * @param {User} user
   */
  userTrackBy(index: number, user: User) {
    return user._id;
  }

  /**
   * Open custom dialog too add new user
   */
  openDialog(): void {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;

    const dialogRef = this.dialog.open(AddUserModalComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(
        data => {
          const tags = [];
          data.tags.map(tag => tags.push(tag.tag));
          this.users.push(new User(data.about, data.address, data.age, data.balance, data.company.toUpperCase(), data.email, data.eyeColor, data.gender,
              data.guid, data.isActive, null, null, data.name, data.phone, data.picture, (new Date()).toISOString(),
              tags, data.id));
          this.userService.saveUsers(this.users);
          dialogRef.close();
        }
    );
  }

  /**
   * Call on component destroy
   */
  ngOnDestroy(): void {
    if (this.usersFromJsonSubscription) this.usersFromJsonSubscription.unsubscribe();
  }

}
