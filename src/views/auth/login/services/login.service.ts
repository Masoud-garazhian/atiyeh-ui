import { ITokenData } from '../../../../core/model/auth/token-data.model';
import { UrlUtil } from '../../../../core/util/url-util';
import { BaseHttpService } from '../../../../core/model/base-http-service';
import { ILoginService } from './login.service.interface';
import { MockLoginService } from './login.service.mock';
import { KJUR } from 'jsrsasign';
import { LocalStorageService } from '../../../../core/service/local-storage.service';
import { Config } from '../../../../core/service/config.service';
import { ILoginResponse } from '../model/login-response.model';
import { IRegisterSecurityImage } from '../../register/model/register-security-image.model';
import { AppConstants } from '../../../../core/app/constants';
import { LoginType } from '../model/login-type.enum';
  import { Subject } from 'rxjs';

export class LoginService extends BaseHttpService implements ILoginService {
  private _isUserLoggedIn = new Subject<boolean | undefined>();
  public get IsUserLoggedIn(): Subject<boolean | undefined> {
    return this._isUserLoggedIn;
  }
  private static _instance: LoginService;
  public static get instance(): ILoginService {
    if (Config.instance.current().isMock) return MockLoginService.instance;
    this._instance = this._instance ?? new LoginService()
    return this._instance;
  }

  private constructor() {
    super()
  }

  public async biometricsLogin(username: string, identity: string): Promise<ITokenData> {
    const url = UrlUtil.join(Config.instance.current().login.biometricsLoginUrl);
    const formData = new FormData();
    // formData.append('username', username);
    // formData.append('identity', identity);
    // const response = await this.post<ILoginResponse>(url, formData,
    //   {
    //     headers: { 'Content-Type': 'multipart/form-data' }
    //   });
    const response = await this.post<{ token: string, refreshToken: string }>(url, { username, identity });
    const res = response.result;
    if (!res?.token)
      throw AppConstants.unexpectedError;
    const tokenData = await this.persistToken(res.token, res.refreshToken);
    tokenData.name = "";
    tokenData.loginType = LoginType.BioMetrics;
    tokenData.refreshToken = res.refreshToken;
    tokenData.requiresTAC = false;
    return tokenData;
  }

  public async getSecurityImage(username: string): Promise<IRegisterSecurityImage> {
    const url = UrlUtil.join(Config.instance.current().login.getSecurityImageUrl, username);
    const x = await this.get<{ imageBase64: string; }>(url);
    if (!x.result?.imageBase64)
      throw AppConstants.unexpectedError;
    const res: IRegisterSecurityImage = { base64: x.result?.imageBase64 };
    return res;
  }

  public login(username: string, password: string): Promise<ITokenData> {
    const url = UrlUtil.join(Config.instance.current().login.loginUrl);
    const formData = new FormData();
    formData.append('username', username);
    formData.append('password', password);
    return this.post<ILoginResponse>(url, formData,
      {
        headers: { 'Content-Type': 'multipart/form-data' }
      }).then(x => {
        const d = x.result;
        if (!d?.access_token)
          throw AppConstants.unexpectedError;      

        return this.persistToken(d.access_token, d.refresh_token).then(x => {          
          
          x.name = d.name;
          x.refreshToken = d.refresh_token;
          x.loginType = LoginType.Password;
          x.requiresTAC = d.requiresTAC;
          return x;
        });       
      });
  }

  public logout(): Promise<void> {
    this._isUserLoggedIn.next(false);
    BaseHttpService.bearerToken = undefined;
    return LocalStorageService.instance.removeItem('loginToken');
  }

  public restoreToken(): Promise<ITokenData> {
    return LocalStorageService.instance.getItem('loginToken')
      .then(token => {
        if (!token)
          return Promise.reject('no token found');
        else {
          BaseHttpService.bearerToken = `bearer ${token}`;
          return this.getTokenData(token)
        }
      });
  }

  public async persistToken(token: string, refresh: string): Promise<ITokenData> {
    const _ = await LocalStorageService.instance.setItem('loginToken', token);
    const __1 = await LocalStorageService.instance.setItem('refreshToken', refresh);
    //_isUserLoggedIn needs to next here to work  for both biometric and username&password login
    this._isUserLoggedIn.next(true);
    BaseHttpService.bearerToken = `bearer ${token}`;
    return this.getTokenData(token);
  }

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