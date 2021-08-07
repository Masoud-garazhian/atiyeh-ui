import { OtpKey } from '../../../../core/data/enum/otp-key.enum';
import { IServerOTP } from '../../../../core/models/data/server-otp.model';
import { ITokenData } from '../../../../core/models/data/token-data.model';
import { BaseHttpService } from '../../../../core/services/base-http-service';
import { LocalStorageService } from '../../../../core/services/local-storage/local-storage.service';
import { wait } from '../../../../core/utils/js-utils';
import { RandomUtil } from '../../../../core/utils/rand-utils';
import { ILoginService } from './login.service.interface';

export class MockLoginService extends BaseHttpService implements ILoginService {
  latestOtp: any;

  private static _instance: MockLoginService;
  public static get instance(): ILoginService {
    this._instance = this._instance ?? new MockLoginService()
    return this._instance;
  }
  private constructor() {
    super()
  }

  public async submitPhone(phoneNo: string): Promise<IServerOTP> {
    const x = await wait(400); // to feel more real 
    this.latestOtp = RandomUtil.mockOtp(phoneNo.startsWith('0912') ? OtpKey.login : OtpKey.register);
    return this.latestOtp;
  }

  public async login(phoneNumber: string, otp: string): Promise<ITokenData> {
    const _ = await wait(1000);
    return this.persistToken('mocktoken', 'refreshToken');
  }
  public async persistToken(token: string, refresh: string): Promise<ITokenData> {
    const _ = await LocalStorageService.instance.setItem('loginToken', token);
    const __1 = await LocalStorageService.instance.setItem('refreshToken', refresh);
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
        notBefore: x['iat'],
        name: 'Jason',
        requiresTAC: false,
        token,
        refreshToken: 'mockreftoken',
      }
    }
    const tokenData = parseToken({
      Username: 'hans', email: 'hans.brown@gmail.com', FullName: 'Hans Jr. Brown',
      exp: (() => { const d = new Date(); return new Date(d.getFullYear(), d.getMonth(), d.getDay() + 7) })(),
      iat: new Date(),
      Avatar: null,
      phoneNumber: +60128080808
    });
    return tokenData;
  }
}