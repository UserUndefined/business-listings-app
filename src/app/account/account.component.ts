import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService, LoggedInCallback } from '../services/user.service';
import { UserParametersService } from '../services/user.parameters.service';

@Component({
  selector: 'account',
  styleUrls: ['./account.component.css'],
  templateUrl: './account.component.html'
})
export class AccountComponent implements OnInit, LoggedInCallback {

  public errorMessage: string;
  public user = { attributes: '', newPassword: '', oldPassword: '' };

  constructor(private router: Router, public userService: UserService, public userParametersService: UserParametersService) {
  }

  public ngOnInit() {
    this.errorMessage = null;
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

  public getAttributes() {
    this.userParametersService.getParameters().then((result) => {
      console.log('success called');
      this.user.attributes = result;
    }).catch((err) => {
      console.log('error called');
      console.log(JSON.stringify(err));
    });
  }

  public changePassword() {
    this.userService.changePassword(this.user.oldPassword, this.user.newPassword).then((result) => {
      console.log('success updating password. ' + JSON.stringify(result));
      this.errorMessage = 'Password changed';
    }).catch((err) => {
      console.log('error called, ' + JSON.stringify(err.message));
      this.errorMessage = JSON.stringify(err.message);
    });
  }
}
