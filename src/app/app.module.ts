import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {HttpClientModule} from '@angular/common/http';
import {MatListModule, MatIconModule} from '@angular/material';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {UserComponent} from './user/user.component';
import {UsersListComponent} from './users-list/users-list.component';

@NgModule({
  declarations: [
    AppComponent,
    UserComponent,
    UsersListComponent
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatListModule,
    MatIconModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
