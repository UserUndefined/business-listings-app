import { Injectable } from '@angular/core';
import { CognitoUtil } from './cognito.service';

declare var AWSCognito: any;
declare var AWS: any;

export interface LoginCallback {
  loginCallback(message: string, result: any): void;
}

export interface LoggedInCallback {
  isLoggedIn(message: string, loggedIn: boolean): void;
}

@Injectable()
export class UserService {

  public constructor(public cognitoUtil: CognitoUtil) { }

    public login(username: string, password: string, changePassword: string, callback: LoginCallback) {
      console.log('UserLoginService: starting the authentication');
      // Need to provide placeholder keys unless unauthorised user access is enabled for user pool
      AWSCognito.config.update({accessKeyId: 'anything', secretAccessKey: 'anything'});

      let authenticationData = {
        Username: username,
        Password: password,
      };
      let authenticationDetails = new AWSCognito.CognitoIdentityServiceProvider
        .AuthenticationDetails(authenticationData);

      let userData = {
        Username: username,
        Pool: this.cognitoUtil.getUserPool()
      };

      console.log('UserLoginService: Params set...Authenticating the user');
      let cognitoUser = new AWSCognito.CognitoIdentityServiceProvider.CognitoUser(userData);
      console.log('UserLoginService: config is ' + AWS.config);
      cognitoUser.authenticateUser(authenticationDetails, {
        onSuccess (result) {

          let logins = {};
          logins['cognito-idp.' + CognitoUtil._REGION + '.amazonaws.com/'
            + CognitoUtil._USER_POOL_ID] = result.getIdToken().getJwtToken();

          // Add the User's Id Token to the Cognito credentials login map.
          AWS.config.credentials = new AWS.CognitoIdentityCredentials({
            IdentityPoolId: CognitoUtil._IDENTITY_POOL_ID,
            Logins: logins
          });

          console.log('UserLoginService: set the AWS credentials - '
            + JSON.stringify(AWS.config.credentials));
          console.log('UserLoginService: set the AWSCognito credentials - '
            + JSON.stringify(AWSCognito.config.credentials));
          callback.loginCallback(null, result);
        },
        onFailure (err) {
          callback.loginCallback(err.message, null);
        },
        mfaRequired (codeDeliveryDetails) {
          // MFA is required to complete user authentication.
          // Get the code from user and call
          // cognitoUser.sendMFACode(mfaCode, this)
          cognitoUser.sendMFACode('12345', this);
        },
        newPasswordRequired (userAttributes, requiredAttributes) {
          if (!changePassword) {
            return callback.loginCallback(null, 'New password required');
          }
          // User was signed up by an admin and must provide new
          // password and required attributes, if any, to complete
          // authentication.

          // userAttributes: object, which is the user's current profile. It
          // will list all attributes that are associated with the user.
          // Required attributes according to schema, which don’t have any values
          // yet, will have blank values.
          // requiredAttributes: list of attributes that must be set by the user
          // along with new password to complete the sign-in.

          // Get these details and call
          // newPassword: password that user has given
          // attributesData: object with key as attribute name and value that the user has given.
          // cognitoUser.completeNewPasswordChallenge(newPassword, attributesData, this)
          delete userAttributes.email_verified; // it's returned but not valid to submit
          userAttributes.name = username;
          userAttributes.family_name = username;
          cognitoUser.completeNewPasswordChallenge(changePassword, userAttributes, {
            onSuccess(result) {
              console.log('completeNewPasswordChallenge success');
              console.log(result ? result : '');
              callback.loginCallback(null, true);
            },
            onFailure(error) {
              console.log('completeNewPasswordChallenge error');
              console.log(JSON.stringify(error));
              callback.loginCallback(error.message, null);
            }
          });
        },
        inputVerificationCode (data) {
          // cognitoUser.confirmPassword(verificationCode, _newPassword, this);
          cognitoUser.confirmPassword('12345', 'newPassword', {
            onSuccess(result) {
              console.log('inputVerificationCode success');
              console.log(result ? result : '');
              callback.loginCallback(null, true);
            },
            onFailure(error) {
              console.log('inputVerificationCode error');
              console.log(JSON.stringify(error));
              callback.loginCallback(error.message, null);
            }
          });
        }
      });
    }

    public logout() {
      console.log('UserLoginService: Logging out');
      this.cognitoUtil.getCurrentUser().signOut();
    }

    public isAuthenticated(callback: LoggedInCallback) {
      console.log('checking authentication');
      if (callback == null) {
        throw('UserService: Callback in isAuthenticated() cannot be null');
      }

      let cognitoUser = this.cognitoUtil.getCurrentUser();

      if (cognitoUser != null) {
        cognitoUser.getSession((err, session) => {
          if (err) {
            console.log('UserService: Couldn\'t get the session: ' + err, err.stack);
            callback.isLoggedIn(err, false);
          } else {
            console.log('UserService: Session is ' + session.isValid());
            callback.isLoggedIn(err, session.isValid());
          }
        });
      } else {
        console.log('UserService: can\'t retrieve the current user');
        callback.isLoggedIn('Can\'t retrieve the CurrentUser', false);
      }
    }
}
