
export interface ITokenData {
  refreshToken?: string;
  token?: string;
  notBefore?: Date,
  expireDate?: Date,
  username?: string,
  email?: string,
  requiresTAC?: boolean,
  name?: string,
}