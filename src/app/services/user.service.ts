import { Injectable } from '@angular/core';

export interface LoginCallback {
  loginCallback(message: string, result: any): void;
}

@Injectable()
export class UserService {

    public login(username: string, password: string, callback: LoginCallback) {
      console.log('UserLoginService: stgarting the authentication');
      console.log('username: ' + username + '. password: ' + password);
      callback.loginCallback('logged in', true);
    }

    public logout() {
        console.log('UserLoginService: Logging out');
    }

    public isAuthenticated(callback: LoginCallback) {
      if (callback == null) {
        throw('UserLoginService: Callback in isAuthenticated() cannot be null');
      }
      callback.loginCallback('authenticated', true);
    }
}
