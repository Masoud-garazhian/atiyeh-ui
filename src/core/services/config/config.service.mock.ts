import { IConfig } from '../../models/config.model';
import { BaseHttpService } from '../base-http-service';
import { LocalStorageService } from '../local-storage/local-storage.service';
import { IConfigService } from './config.service.interface';

export class MockConfig extends BaseHttpService implements IConfigService {
  private _currentConfig?: IConfig;

  private static _instance: IConfigService;
  public static get instance(): IConfigService {
    this._instance = this._instance ?? new MockConfig();
    return this._instance;
  }

  private constructor() {
    super();
  }
  getCurrent<T>(): T {
    return this._currentConfig as unknown as T;
  }
  setMock(mock: boolean): void {
    this._currentConfig!.isMock = mock;
    LocalStorageService.instance.removeItem('loginToken');
    LocalStorageService.instance.setItem('isMock', mock.toString());
  }

  load(): Promise<void> {
    return Promise.resolve();
  }

  public get current() {
    return () => this._currentConfig!;
  }
}