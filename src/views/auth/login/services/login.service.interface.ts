import { ITokenData } from '../../../../core/model/auth/token-data.model';
import { IRegisterSecurityImage } from '../../register/model/register-security-image.model';
import { BehaviorSubject ,Subject } from 'rxjs';

export interface ILoginService {
  login(username: string, password: string): Promise<ITokenData>;
  biometricsLogin(username: string, identity: string): Promise<ITokenData>;
  getSecurityImage(username: string): Promise<IRegisterSecurityImage>;
  logout(): Promise<void>;
  restoreToken(): Promise<ITokenData>;
  persistToken(token: string, refresh: string): Promise<ITokenData>;
  getTokenData(token: string): ITokenData;  
  IsUserLoggedIn : Subject<boolean | undefined>;
}