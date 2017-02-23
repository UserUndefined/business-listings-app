import {
  Component,
  OnInit
} from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'login',
  styleUrls: ['./login.component.css'],
  templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {

  public user = {userName: '', password: ''};

  constructor(private router: Router) { }

  public redirect(pagename: string) {
    this.router.navigate(['/' + pagename]);
  }

  public login(user) {
    this.redirect('home');
  }

  public ngOnInit() {
    console.log('LoginComponent ngOnInit called');
  }
}
