import { OtpKey } from '../../data/enum/otp-key.enum';

export interface IServerOTP {
  otpPlatform?: string,
  issueDate?: Date,
  expireDate?: Date,
  otpString?: string,
  resendDate?: Date,
  otpKey: OtpKey,
}