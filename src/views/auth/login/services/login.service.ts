import { ITokenData } from '../../../../core/models/data/token-data.model';
import { BaseHttpService } from '../../../../core/services/base-http-service';
import { ILoginService } from './login.service.interface';
import { MockLoginService } from './login.service.mock';
import { KJUR } from 'jsrsasign';
import { IServerOTP } from '../../../../core/models/data/server-otp.model';
import { Config } from '../../../../core/services/config/config.service';
import { ILoginConfig } from '../model/config.model';
import { ILoginResponse } from '../model/login-response.model';
import { AppConstants } from '../../../../core/data/app-constants';
import { LocalStorageService } from '../../../../core/services/local-storage/local-storage.service';

export class LoginService extends BaseHttpService implements ILoginService {
  private static _instance: LoginService;
  public static get instance(): ILoginService {
    if (Config.instance.current().isMock) return MockLoginService.instance;
    this._instance = this._instance ?? new LoginService()
    return this._instance;
  }

  private constructor() {
    super()
  }

  public async submitPhone(phoneNo: string): Promise<IServerOTP> {
    const url = Config.instance.getCurrent<ILoginConfig>().login.phoneNoUrl;
    const x = await this.post<IServerOTP>(url, { phoneNo });
    return x.result!;
  }


  public async login(username: string, password: string): Promise<ITokenData> {
    const url = Config.instance.current().login.loginUrl;
    const formData = new FormData();
    formData.append('username', username);
    formData.append('password', password);
    const response = await this.post<ILoginResponse>(url, formData,
      {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
    const d = response.result;
    if (!d?.access_token)
      throw AppConstants.unexpectedError;
    const token = await this.persistToken(d.access_token, d.refresh_token);
    token.name = d.name;
    token.refreshToken = d.refresh_token;
    return token;
  }

  public async persistToken(token: string, refresh: string): Promise<ITokenData> {
    const _ = await LocalStorageService.instance.setItem('loginToken', token);
    const __1 = await LocalStorageService.instance.setItem('refreshToken', refresh);
    BaseHttpService.bearerToken = `bearer ${token}`;
    return this.getTokenData(token);
  }



  // public restoreToken(): Promise<ITokenData> {
  //   return LocalStorageService.instance.getItem('loginToken')
  //     .then(token => {
  //       if (!token)
  //         return Promise.reject('no token found');
  //       else {
  //         BaseHttpService.bearerToken = `bearer ${token}`;
  //         return this.getTokenData(token)
  //       }
  //     });
  // }

  // public async persistToken(token: string, refresh: string): Promise<ITokenData> {
  //   const _ = await LocalStorageService.instance.setItem('loginToken', token);
  //   const __1 = await LocalStorageService.instance.setItem('refreshToken', refresh);
  //   //_isUserLoggedIn needs to next here to work  for both biometric and username&password login
  //   this._isUserLoggedIn.next(true);
  //   BaseHttpService.bearerToken = `bearer ${token}`;
  //   return this.getTokenData(token);
  // }

  public getTokenData = (token: string): ITokenData => {
    if (!token)
      throw 'token is empty';
    const parseToken = (x: any | null): ITokenData => {
      return {
        username: x['sub'],
        email: x['email'],
        expireDate: x['exp'],
        notBefore: x['nbf'],
        name: x['name'],
        requiresTAC: x['requiresTAC'],
        token,
      }
    }
    let tokenData = {};
    try {
      tokenData = parseToken(KJUR.jws.JWS.parse(token)['payloadObj']);
    } catch (e) {
      console.error('can not parse jwt');


    }
    return tokenData;
  }
}