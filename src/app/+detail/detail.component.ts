import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService, LoggedInCallback } from '../services/user.service';
/*
 * We're loading this component asynchronously
 * We are using some magic with es6-promise-loader that will wrap the module with a Promise
 * see https://github.com/gdi2290/es6-promise-loader for more info
 */

console.log('`Detail` component loaded asynchronously');

@Component({
  selector: 'detail',
  template: `
    <h1>Hello from Detail</h1>
    <span>
      <a [routerLink]=" ['./child-detail'] ">
        Child Detail
      </a>
    </span>
    <router-outlet></router-outlet>
  `,
})
export class DetailComponent implements OnInit, LoggedInCallback {

  constructor(private router: Router, public userService: UserService) {
  }

  public ngOnInit() {
    this.userService.isAuthenticated(this);
  }

  public redirect(pagename: string) {
    this.router.navigate(['/' + pagename]);
  }

  public isLoggedIn(message: string, isLoggedIn: boolean) {
    if (!isLoggedIn) {
      this.redirect('login');
    }
  }
}
