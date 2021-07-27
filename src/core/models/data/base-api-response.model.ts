
export interface IApiResponse<T> {
  result: T | undefined;
  message: string;
  code?: number;
  status: string;
  returnType: 'Ok' | 'BadRequest' | 'NotFound';
}