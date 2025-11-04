export interface IApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: {
    code: string;
    message: string;
    details?: any;
  };
}

export interface IApiSuccess<T> extends IApiResponse<T> {
  success: true;
  data: T;
}

export interface IApiError extends IApiResponse {
  success: false;
  error: {
    code: string;
    message: string;
    details?: any;
  };
}

