export interface SignupRequestModel {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
}

export interface LoginRequestModel {
  email: string;
  password: string;
}

export interface LogoutRequestModel {
  token: string;
}

export interface AuthResponseModel {
  accessToken: string;
  tokenId: string;
}

export interface AuthApiResponse<T> {
  code: string;
  result?: T;
  message?: string;
}

