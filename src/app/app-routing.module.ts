import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {UsersListComponent} from './users-list/users-list.component';
import {UserComponent} from './user/user.component';

const routes: Routes = [
  {path: 'user', component: UsersListComponent},
  {path: 'user-details/:id', component: UserComponent},
  {path: '', redirectTo: '/user', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
