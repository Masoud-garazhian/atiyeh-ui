import { AppConstants } from '../../data/app-constants';
import { ILocalStorageService } from './local-storage.service.interface';

export class LocalStorageService implements ILocalStorageService {


  private static _instance: ILocalStorageService;
  public static get instance(): ILocalStorageService {
    // if (Config.instance.current().isMock) return MockLocalStorageService.instance;
    this._instance = this._instance ?? new LocalStorageService();
    return this._instance;
  }

  private constructor() {
  }
  public async removeItem(key: string, callback?: (error?: Error) => void): Promise<void> {
    await Promise.resolve();
    return localStorage.removeItem(AppConstants.app_key + key);
  }
  public async getItem(key: string, callback?: (error?: Error, result?: string) => void): Promise<string | null> {
    await Promise.resolve();
    return localStorage.getItem(AppConstants.app_key + key);
  }
  public async setItem(key: string, value: string, callback?: (error?: Error) => void): Promise<void> {
    await Promise.resolve();
    localStorage.setItem(AppConstants.app_key + key, value);
  }
}