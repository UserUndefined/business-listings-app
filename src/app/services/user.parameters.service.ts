import { Injectable } from '@angular/core';
import { RegistrationUser } from '../public/auth/register/registration.component';
import { CognitoUtil } from './cognito.service';

declare var AWSCognito: any;
declare var AWS: any;

export interface Callback {
  callback(): void;
  callbackWithParam(result: any): void;
}

@Injectable()
export class UserParametersService {

  constructor(public cognitoUtil: CognitoUtil) {
  }

  public getParameters(callback: Callback) {
    let cognitoUser = this.cognitoUtil.getCurrentUser();

    if (cognitoUser != null) {
      cognitoUser.getSession((err, session) => {
        if (err) {
          console.log('UserParametersService: Couldn\'t retrieve the user');
        } else {
          cognitoUser.getUserAttributes((attErr, result) => {
            if (attErr) {
              console.log('UserParametersService: in getParameters: ' + attErr);
            } else {
              callback.callbackWithParam(result);
            }
          });
        }
      });
    } else {
      callback.callbackWithParam(null);
    }
  }
}
