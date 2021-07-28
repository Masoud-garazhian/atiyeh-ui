import { OtpKey } from '../data/enum/otp-key.enum';
import { IServerOTP } from '../models/data/server-otp.model';
import { DateUtil } from './date-utils';

export class RandomUtil {
  public static nStringRandom(length: number, justAZ: boolean = false): string {
    let result = '';
    const characters = `ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz${justAZ ? '' : '0123456789'}`;
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }

  public static rand(lessThan = Number.MAX_SAFE_INTEGER, min = 0) {
    return Math.floor(Math.random() * lessThan - min) + min
  }

  public static nDigiRandom(length: number): number {
    let result = '';
    const characters = '0123456789';
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return Number(result);
  }

  public static mockOtp(key: OtpKey): IServerOTP {
    return {
      expireDate: DateUtil.secsLater(65),
      issueDate: new Date(),
      resendDate: DateUtil.secsLater(10),
      otpPlatform: 'SMS',
      otpString: RandomUtil.nStringRandom(4).toUpperCase(),
      otpKey: key
    };
  }
}
