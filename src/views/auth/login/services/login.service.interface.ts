import { IServerOTP } from '../../../../core/models/data/server-otp.model';
import { ITokenData } from '../../../../core/models/data/token-data.model';
import { ILoginResponse } from '../model/login-response.model';
import { IRegisterByPhoneResponse } from '../model/register-by-phone-response.model';

export interface ILoginService {
  submitPhone(phoneNo: string): Promise<IServerOTP>;
  login(phoneNo: string, otp: string): Promise<ITokenData>;
}