import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService, LoginCallback } from '../services/user.service';

@Component({
  selector: 'login',
  styleUrls: ['./login.component.css'],
  templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit, LoginCallback {

  public user = {username: '', password: ''};
  public errorMessage: string;

  constructor(private router: Router, public userService: UserService) {
  }

  public ngOnInit() {
    console.log('LoginComponent ngOnInit called');
    this.errorMessage = null;
    console.log('Checking if the user is already authenticated.');
    this.userService.isAuthenticated(this);
  }

  public redirect(pagename: string) {
    this.router.navigate(['/' + pagename]);
  }

  public loginCallback(message: string, result: any) {
    if (message != null) {
      this.errorMessage = message;
      console.log('result: ' + message);
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
    this.userService.login(this.user.username, this.user.password, this);
    this.redirect('home');
  }
}
