import { ITokenData } from '../../../../core/model/auth/token-data.model';
import { wait } from '../../../../core/util/rn-util';
import { BaseHttpService } from '../../../../core/model/base-http-service';
import { LocalStorageService } from '../../../../core/service/local-storage.service';
import { ILoginService } from './login.service.interface';
import { MockRegisterService } from '../../register/service/register.service.mock';
import { IRegisterSecurityImage } from '../../register/model/register-security-image.model';

export class MockLoginService extends BaseHttpService implements ILoginService {
  latestOtp: any;

  private static _instance: MockLoginService;
  public static get instance(): ILoginService {
    this._instance = this._instance ?? new MockLoginService()
    return this._instance;
  }

  public getSecurityImage(username: string): Promise<IRegisterSecurityImage> {

    return wait(1000).then(_ => MockRegisterService.mockSecurityImages[0]);
  }
  private constructor() {
    super()
  }

  public async biometricsLogin(username: string, identity: string): Promise<ITokenData> {
    return wait(1000).then(_ => {
      return this.persistToken('mocktoken', 'refreshToken')
    });
  }

  public login(username: string, password: string): Promise<ITokenData> {
    return wait(1000).then(_ => {
      return this.persistToken('mocktoken', 'refreshToken')
    });
  }

  public logout(): Promise<void> {
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

  public persistToken(token: string, refresh: string): Promise<ITokenData> {
    return LocalStorageService.instance.setItem('loginToken', token).then(_ => {
      return LocalStorageService.instance.setItem('refreshToken', refresh).then(_ => {
        BaseHttpService.bearerToken = `bearer ${token}`;
        return this.getTokenData(token)
      })
    })
  }

  public getTokenData = (token: string): ITokenData => {
    if (!token)
      throw 'token is empty';
    const parseToken = (x: any | null): ITokenData => {
      return {
        username: x['sub'],
        email: x['email'],
        expireDate: x['exp'],
        notBefore: x['iat'],
        name: 'Jason',
        requiresTAC: false,
        token,
        refreshToken: 'mockreftoken',
      }
    }
    const tokenData = parseToken({
      Username: 'hans', email: 'hans.brown@consolsys.com', FullName: 'Hans Jr. Brown',
      exp: (() => { const d = new Date(); return new Date(d.getFullYear(), d.getMonth(), d.getDay() + 7) })(),
      iat: new Date(),
      Avatar: null,
      phoneNumber: +60128080808
    });
    return tokenData;
  }
}