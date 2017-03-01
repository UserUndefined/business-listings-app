import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService, LoggedInCallback } from '../services/user.service';

@Component({
  selector: 'customer',
  styles: [``],
  templateUrl: './customer.component.html'
})
export class CustomerComponent implements OnInit, LoggedInCallback {

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
