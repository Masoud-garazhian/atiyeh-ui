import { BaseHttpService } from '../../../../core/services/base-http-service';
import { Config } from '../../../../core/services/config/config.service';
import { ILoginResponse } from '../../login/model/login-response.model';
import { IRegisterByPhoneResponse } from '../../login/model/register-by-phone-response.model';
import { IRegisterDetailsRequest } from '../../login/model/submit-register-details-request.model';
import { IRegisterConfig } from './model/config.model';
import { IRegisterService } from './register.service.interface';
import { MockRegisterService } from './register.service.mock';

export class RegisterService extends BaseHttpService implements IRegisterService {
  latestOtp: any;

  private static _instance: RegisterService;
  public static get instance(): IRegisterService {
    if (Config.instance.current().isMock) return MockRegisterService.instance;
    this._instance = this._instance ?? new RegisterService()
    return this._instance;
  }

  public async registerByPhone(phoneNo: string, otp: string): Promise<IRegisterByPhoneResponse> {
    const url = Config.instance.getCurrent<IRegisterConfig>().register.registerByPhoneUrl;
    const x = await this.post<IRegisterByPhoneResponse>(url, { phoneNo, otp });
    return x.result!;
  }

  public submitDetails(model: IRegisterDetailsRequest): Promise<ILoginResponse> {
    throw new Error('Method not implemented.');
  }
}