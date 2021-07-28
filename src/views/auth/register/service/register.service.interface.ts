
import { ILoginResponse } from '../../login/model/login-response.model';
import { IRegisterByPhoneResponse } from '../../login/model/register-by-phone-response.model';
import { IRegisterDetailsRequest } from '../../login/model/submit-register-details-request.model';

export interface IRegisterService {
  registerByPhone(phoneNo: string, otp: string): Promise<IRegisterByPhoneResponse>;
  submitDetails(model: IRegisterDetailsRequest): Promise<ILoginResponse>;
}