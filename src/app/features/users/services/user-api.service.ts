import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiClient } from '../../../core/api/api-client.service';
import { CreateUserRequest, UserResponse } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserApiService {
  private readonly apiClient = inject(ApiClient);
  private readonly endpoint = '/users'; // Relative because apiBaseUrlInterceptor prepends /api/v1

  getUser(id: string): Observable<UserResponse> {
    return this.apiClient.get<UserResponse>(`${this.endpoint}/${id}`);
  }

  createUser(payload: CreateUserRequest): Observable<UserResponse> {
    return this.apiClient.post<UserResponse>(this.endpoint, payload);
  }
}
