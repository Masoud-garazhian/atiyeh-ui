import { ILoginConfig } from '../../views/auth/login/model/config.model';
import { IRegisterConfig } from '../../views/auth/register/service/model/config.model';

export type IConfig =
  IRegisterConfig &
  ILoginConfig & {
    isMock: boolean;
  }
  ;

