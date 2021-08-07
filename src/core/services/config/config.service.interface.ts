import { IConfig } from '../../models/config.model';

export interface IConfigService {
  setMock(mock: boolean): void;
  load(): Promise<void>;
  readonly current: () => IConfig;
  getCurrent<T>(): T;
}