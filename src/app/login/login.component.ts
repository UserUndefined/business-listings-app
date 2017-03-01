import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService, LoginCallback, LoggedInCallback } from '../services/user.service';

@Component({
  selector: 'login',
  styleUrls: ['./login.component.css'],
  templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit, LoginCallback, LoggedInCallback {

  public user = {username: '', password: '', changePassword: ''};
  public errorMessage: string;
  public newPasswordRequired: boolean = false;

  constructor(private router: Router, public userService: UserService) {
  }

  public ngOnInit() {
    this.errorMessage = null;
    this.userService.isAuthenticated(this);
  }

  public redirect(pagename: string) {
    this.router.navigate(['/' + pagename]);
  }

  public isLoggedIn(message: string, isLoggedIn: boolean) {
    if (isLoggedIn) {
      this.logout();
      // console.log('user is already logged in. Off to the home page...');
      // this.redirect('home');
    }
    console.log('user is not already logged in');
  }

  public loginCallback(message: string, result: any) {
    console.log('loginCallback: message: ' + message + '. result: ' + result);
    this.newPasswordRequired = false;
    if (message != null) {
      this.errorMessage = message;
      console.log('result: ' + message);
    } else if (result && result === 'New password required') {
      this.errorMessage = 'AWS requires a new password';
      console.log('AWS requires a new password');
      this.newPasswordRequired = true;
    } else {
      console.log('result: ' + message);
      this.redirect('home');
    }
  }

  public login() {
    if (this.user.username == null || this.user.password == null) {
      this.errorMessage = 'All fields are required';
      return;
    }
    this.errorMessage = null;
    this.userService.login(this.user.username, this.user.password, this.user.changePassword, this);
  }

  public logout() {
    this.userService.logout();
  }
}
