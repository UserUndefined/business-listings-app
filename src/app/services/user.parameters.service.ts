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

  public getParameters(): Promise<any> {
    console.log('getting user attributes');
    return new Promise((resolve, reject) => {
      let cognitoUser = this.cognitoUtil.getCurrentUser();
      if (cognitoUser != null) {
        cognitoUser.getSession((err, session) => {
          if (err) {
            console.log('UserParametersService: Couldn\'t retrieve the user');
            reject('UserParametersService: Couldn\'t retrieve the user');
          } else {
            console.log('getting user attributes from cognitoUser');
            cognitoUser.getUserAttributes((attErr, result) => {
              if (attErr) {
                console.log('UserParametersService: in getParameters: ' + attErr);
                reject('UserParametersService: in getParameters: ' + attErr);
              } else {
                console.log('got user attributes');
                resolve(JSON.stringify(result));
              }
            });
          }
        });
      } else {
        console.log('Could not get current user');
        reject('Could not get current user');
      }
    });
  }
}
