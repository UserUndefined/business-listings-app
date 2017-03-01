import { Injectable, Inject } from '@angular/core';
import { RegistrationUser } from '../public/auth/register/registration.component';
// import {environment} from "../../environments/environment";

declare var AWSCognito: any;
declare var AWS: any;

export interface CognitoCallback {
  cognitoCallback(message: string, result: any): void;
}

export interface LoggedInCallback {
  isLoggedIn(message: string, loggedIn: boolean): void;
}

export interface Callback {
  callback(): void;
  callbackWithParam(result: any): void;
}

@Injectable()
export class CognitoUtil {

// public static _REGION = environment.region;
// public static _IDENTITY_POOL_ID = environment.identityPoolId;
// public static _USER_POOL_ID = environment.userPoolId;
// public static _CLIENT_ID = environment.clientId;

  public static _REGION = 'eu-west-1';
  public static _IDENTITY_POOL_ID = '2d9fbafa-4753-41d8-8353-8b2f44675cf4';
  public static _USER_POOL_ID = 'eu-west-1_5MHtkIKtT';
  public static _CLIENT_ID = '2mg368usdh6ql5463cqtoratfp';

  public static _POOL_DATA = {
    UserPoolId: CognitoUtil._USER_POOL_ID,
    ClientId: CognitoUtil._CLIENT_ID
  };

  public static getAwsCognito(): any {
    return AWSCognito;
  }

  public getUserPool() {
    return new AWSCognito.CognitoIdentityServiceProvider.CognitoUserPool(CognitoUtil._POOL_DATA);
  }

  public getCurrentUser() {
    return this.getUserPool().getCurrentUser();
  }

  public getCognitoIdentity(): string {
    return AWS.config.credentials.identityId;
  }

  public getAccessToken(callback: Callback): void {
    if (callback == null) {
      throw('CognitoUtil: callback in getAccessToken is null...returning');
    }
    if (this.getCurrentUser() != null) {
      this.getCurrentUser().getSession((err, session) => {
        if (err) {
          console.log('CognitoUtil: Cant set the credentials:' + err);
          callback.callbackWithParam(null);
        } else {
          if (session.isValid()) {
            callback.callbackWithParam(session.getAccessToken().getJwtToken());
          }
        }
      });
    } else {
      callback.callbackWithParam(null);
    }
  }

  public getIdToken(callback: Callback): void {
    if (callback == null) {
      throw('CognitoUtil: callback in getIdToken is null...returning');
    }
    if (this.getCurrentUser() != null) {
      this.getCurrentUser().getSession((err, session) => {
        if (err) {
          console.log('CognitoUtil: Cant set the credentials:' + err);
          callback.callbackWithParam(null);
        } else {
          if (session.isValid()) {
            callback.callbackWithParam(session.getIdToken().getJwtToken());
          } else {
            console.log('CognitoUtil: Got the id token, but the session isn\'t valid');
          }
        }
      });
    } else {
      callback.callbackWithParam(null);
    }
  }

  public getRefreshToken(callback: Callback): void {
    if (callback == null) {
      throw('CognitoUtil: callback in getRefreshToken is null...returning');
    }
    if (this.getCurrentUser() != null) {
      this.getCurrentUser().getSession((err, session) => {
        if (err) {
          console.log('CognitoUtil: Can\'t set the credentials:' + err);
          callback.callbackWithParam(null);
        } else {
          if (session.isValid()) {
            callback.callbackWithParam(session.getRefreshToken());
          }
        }
      });
    } else {
      callback.callbackWithParam(null);
    }
  }

  public refresh(): void {
    this.getCurrentUser().getSession((err, session) => {
      if (err) {
        console.log('CognitoUtil: Can\'t set the credentials:' + err);
      } else {
        if (session.isValid()) {
          console.log('CognitoUtil: refreshed successfully');
        } else {
          console.log('CognitoUtil: refreshed but session is still not valid');
        }
      }
    });
  }
}
