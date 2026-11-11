export interface ApiSuccessResponse<T> {
  readonly success: true;
  readonly data: T;
}

export interface ApiErrorDetails {
  readonly code?: string;
  readonly message: string;
  readonly details?: Record<string, string[]>;
}

export interface ApiErrorResponse {
  readonly success: false;
  readonly error: ApiErrorDetails;
}

export type ApiResponse<T> = ApiSuccessResponse<T> | ApiErrorResponse;
