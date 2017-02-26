import { Injectable } from '@angular/core';
import { CognitoUtil } from '../services/cognito.service';

declare var AWSCognito: any;
declare var AWS: any;

export interface LoginCallback {
  loginCallback(message: string, result: any): void;
}

@Injectable()
export class UserService {

  public constructor(public cognitoUtil: CognitoUtil){}

    public login(username: string, password: string, callback: LoginCallback) {
      console.log("UserLoginService: stgarting the authentication")
      // Need to provide placeholder keys unless unauthorised user access is enabled for user pool
      AWSCognito.config.update({accessKeyId: 'anything', secretAccessKey: 'anything'})

      let authenticationData = {
        Username: username,
        Password: password,
      };
      let authenticationDetails = new AWSCognito.CognitoIdentityServiceProvider.AuthenticationDetails(authenticationData);

      let userData = {
        Username: username,
        Pool: this.cognitoUtil.getUserPool()
      };

      console.log('UserLoginService: Params set...Authenticating the user');
      let cognitoUser = new AWSCognito.CognitoIdentityServiceProvider.CognitoUser(userData);
      console.log('UserLoginService: config is ' + AWS.config);
      cognitoUser.authenticateUser(authenticationDetails, {
        onSuccess: function (result) {

          var logins = {}
          logins['cognito-idp.' + CognitoUtil._REGION + '.amazonaws.com/' + CognitoUtil._USER_POOL_ID] = result.getIdToken().getJwtToken();

          // Add the User's Id Token to the Cognito credentials login map.
          AWS.config.credentials = new AWS.CognitoIdentityCredentials({
            IdentityPoolId: CognitoUtil._IDENTITY_POOL_ID,
            Logins: logins
          });

          console.log('UserLoginService: set the AWS credentials - ' + JSON.stringify(AWS.config.credentials));
          console.log('UserLoginService: set the AWSCognito credentials - ' + JSON.stringify(AWSCognito.config.credentials));
          callback.loginCallback(null, result);
        },
        onFailure: function (err) {
          callback.loginCallback(err.message, null);
        },
      });
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
