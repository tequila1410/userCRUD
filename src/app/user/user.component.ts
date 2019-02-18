import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Subscription} from 'rxjs';

import {User} from '../shared/models/user.model';
import {UserService} from '../user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit, OnDestroy {

  /**
   * Selected user
   * @type {User}
   */
  public currentUser: User;

  /**
   * Contains subscription which react on router params change
   * @type {Subscription}
   */
  private sub: Subscription;

  /**
   * @ignore
   */
  constructor(private userService: UserService,
              private route: ActivatedRoute) { }

  /**
   * Call on component initialize
   */
  ngOnInit(): void {
    this.sub = this.route.params.subscribe(params => {
      const userId = params['id'];
      const users = this.userService.getUserFromLocalStorage();
      console.log(users);
      this.currentUser = users.find(user => {
        return user._id === userId;
      });

      const avatarEl = document.getElementById('user-header-image');
      avatarEl.style.backgroundImage = `url(${this.currentUser.picture})`;
    });
  }

  /**
   * Call on component destroy
   */
  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

}
