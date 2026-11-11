import { ApiErrorDetails } from '../models/api.model';

export class ApiError extends Error {
  constructor(
    public readonly status: number,
    public readonly details: ApiErrorDetails
  ) {
    super(details.message);
    this.name = 'ApiError';
  }
}
