import axios, { AxiosError, AxiosInstance } from 'axios';
import { IApiResponse } from '../models/data/base-api-response.model';
import { IRequestConfig } from '../models/data/request-config.model';

export abstract class BaseHttpService {
  static bearerToken?: string = undefined;
  public static axios: AxiosInstance = (() => {
    const instance = axios.create();
    instance.interceptors.request.use(config => {
      if (BaseHttpService.bearerToken) {
        if (config.method !== 'OPTIONS' && !!BaseHttpService.bearerToken) {
          config.headers.authorization = BaseHttpService.bearerToken;
        }
      }
      // let di = DeviceInfoService.getDeviceInfo() as any;

      // di = JSON.stringify(di);
      // config.headers['device-info'] = di;
      config.headers['Content-type'] = 'application/json';
      return config;
    }, function (error) {
      return Promise.reject(error);
    });
    return instance;
  })();

  public request = <R>(config: IRequestConfig): Promise<IApiResponse<R>> => {
    return BaseHttpService.axios.request(config).then(r => r.data, e => {
      this.logError('request', null, config, null, e);
    })
  }
  public get = <R extends any>(url: string, config?: IRequestConfig): Promise<IApiResponse<R>> => {
    return BaseHttpService.axios.get<IApiResponse<R>>(url, config).then(r => r.data, e => {
      this.logError('get', url, config, null, e);
      return this.wrapApiError<R>(e);
    }).then(r => catchCoded<IApiResponse<R>>(r, config))
  }
  public delete = <R extends any>(url: string, config?: IRequestConfig): Promise<IApiResponse<R>> => {
    return BaseHttpService.axios.delete<IApiResponse<R>>(url, config).then(r => r.data, e => {
      this.logError('delete', url, config, null, e);
      return this.wrapApiError<R>(e);
    }).then(r => catchCoded<IApiResponse<R>>(r, config))
  }
  public head = <R extends any>(url: string, config?: IRequestConfig): Promise<IApiResponse<R>> => {
    return BaseHttpService.axios.head<IApiResponse<R>>(url, config).then(r => r.data, e => {
      this.logError('head', url, config, null, e);
      return this.wrapApiError<R>(e);
    }).then(r => catchCoded<IApiResponse<R>>(r, config))
  }
  public options = <R extends any>(url: string, config?: IRequestConfig): Promise<IApiResponse<R>> => {
    return BaseHttpService.axios.options<IApiResponse<R>>(url, config).then(r => r.data, e => {
      this.logError('option', url, config, null, e);
      return this.wrapApiError<R>(e);
    }).then(r => catchCoded<IApiResponse<R>>(r, config))
  }
  public post = <R extends any>(url: string, data?: any, config?: IRequestConfig): Promise<IApiResponse<R>> => {
    return BaseHttpService.axios.post<IApiResponse<R>>(url, data, config).then(r => r.data, e => {
      this.logError('post', url, config, data, e);
      return this.wrapApiError<R>(e);
    }).then(r => catchCoded<IApiResponse<R>>(r, config))
  }
  public put = <R extends any>(url: string, data?: any, config?: IRequestConfig): Promise<IApiResponse<R>> => {
    return BaseHttpService.axios.put<IApiResponse<R>>(url, data, config).then(r => r.data, e => {
      this.logError('put', url, config, data, e);
      return this.wrapApiError<R>(e);
    }).then(r => catchCoded<IApiResponse<R>>(r, config))
  }
  public patch = <R extends any>(url: string, data?: any, config?: IRequestConfig): Promise<IApiResponse<R>> => {
    return BaseHttpService.axios.patch<IApiResponse<R>>(url, data, config).then(r => r.data, e => {
      this.logError('patch', url, config, data, e);
      return this.wrapApiError<R>(e);
    }).then(r => catchCoded<IApiResponse<R>>(r, config))
  }
  private wrapApiError = <R extends any>(e: AxiosError) => {
    console.error('web api error ', JSON.stringify(e));
    const data: IApiResponse<R> | undefined = e.response?.data;
    const message = data?.message ?? (e.message === 'Network Error' ? e.message : 'Server Error');
    const code = Number(data?.code) || 999;
    const returnType = data?.returnType ?? 'BadRequest';
    const status = data?.status ?? 'Failed';
    const res: IApiResponse<R> = { message, code, returnType, status, result: data?.result };
    return res;
    // return { result: undefined, message, code: 999 } as IApiResponse<R>;

    // const res: IApiResponse<R> = {
    //   result: r?.data?.result,
    //   message,
    //   code: r?.data?.code ?? 999,
    //   status: r?.data?.status ?? 'Failed',
    //   returnType: r?.data?.returnType ?? 'BadRequest'
    // };
    // return res
  }
  private logError = (method: string, url: any, config: any, data: any, e: any) => {
    // console. log(`http ${method} error : url `, url, 'config:', config, 'data:', data, 'error:', JSON.stringify(e.response, null, 2));
  }
}

function catchCoded<T extends IApiResponse<R>, R = any>(res: T, config?: IRequestConfig): Promise<IApiResponse<R>> {
  if (res.code && res.returnType !== 'Ok') {
    console.warn('catch coded ', res);
    // todo : 
    // LayoutService.instance.getMessage$(res.code).next(new Message(res.code, res.message,
    //     {
    //         code: res.code,
    //         message: res.message,
    //         result: res.result,
    //     }));
    return Promise.reject(config?.skipCatchCoded ? res : res.message)
  }
  else if (res.returnType === 'BadRequest' || res.returnType === 'NotFound')
    return Promise.reject(res);
  return Promise.resolve(res);

}