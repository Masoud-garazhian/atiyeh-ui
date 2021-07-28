import { IConfig } from '../../models/config.model';
import { LocalStorageService } from '../local-storage/local-storage.service';
import { appConfig } from './app-config';
import { IConfigService } from './config.service.interface';

export class Config implements IConfigService {
  private _currentConfig?: IConfig;

  //#region singleton
  private static _instance: IConfigService;
  public static get instance(): IConfigService {
    this._instance = this._instance ?? new Config();
    return this._instance;
  }

  private constructor() {
  }
  setMock(mock: boolean): void {
    this._currentConfig!.isMock = mock;
    // LocalStorageService.instance.removeItem('loginToken');
    // LocalStorageService.instance.setItem('isMock', mock.toString());
  }
  //#endregion

  public async load(): Promise<void> {
    this._currentConfig = appConfig;
    const x = await LocalStorageService.instance.getItem('isMock');
    this._currentConfig!.isMock = !!x ? x === 'true' : this._currentConfig!.isMock;
  }

  public get current(): () => IConfig {
    return () => this._currentConfig!;
  }
  getCurrent<T>(): T {
    return this._currentConfig! as any as T;
  }

}
