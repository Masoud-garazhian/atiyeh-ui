import { IConfig } from '../../models/config.model';

const baseUrl = '';

export const appConfig: IConfig = {
  isMock: true,
  login: {
    phoneNoUrl: baseUrl + '/login/submitPhoneNo/',
    loginUrl: baseUrl + '/login/login',
  },
  register: {
    registerByPhoneUrl: baseUrl + '/register/registerByPhone'
  }
}