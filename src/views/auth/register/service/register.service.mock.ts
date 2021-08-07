import { wait } from '../../../../core/utils/js-utils';
import { RandomUtil } from '../../../../core/utils/rand-utils';
import { ILoginResponse } from '../../login/model/login-response.model';
import { IRegisterByPhoneResponse } from '../../login/model/register-by-phone-response.model';
import { IRegisterDetailsRequest } from '../../login/model/submit-register-details-request.model';
import { IRegisterService } from './register.service.interface';

export class MockRegisterService implements IRegisterService {
  latestOtp: any;

  private static _instance: MockRegisterService;
  public static get instance(): IRegisterService {
    this._instance = this._instance ?? new MockRegisterService()
    return this._instance;
  }

  public registerByPhone(phoneNo: string, otp: string): Promise<IRegisterByPhoneResponse> {
    return wait(400).then(x => {
      const res: IRegisterByPhoneResponse = {
        id: RandomUtil.nStringRandom(10),
      }
      return res;
    })
  }
  public submitDetails(model: IRegisterDetailsRequest): Promise<ILoginResponse> {
    throw new Error('Method not implemented.');
  }
}