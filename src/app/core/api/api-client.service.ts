import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ApiSuccessResponse } from '../http/models/api.model';

interface RequestOptions {
  params?: HttpParams | Record<string, string | number | boolean | readonly (string | number | boolean)[]>;
  headers?: Record<string, string | string[]>;
}

@Injectable({
  providedIn: 'root'
})
export class ApiClient {
  private readonly http = inject(HttpClient);

  get<T>(endpoint: string, options?: RequestOptions): Observable<T> {
    return this.http.get<ApiSuccessResponse<T>>(endpoint, options).pipe(
      map(response => response.data)
    );
  }

  post<T, D = unknown>(endpoint: string, data: D, options?: RequestOptions): Observable<T> {
    return this.http.post<ApiSuccessResponse<T>>(endpoint, data, options).pipe(
      map(response => response.data)
    );
  }

  put<T, D = unknown>(endpoint: string, data: D, options?: RequestOptions): Observable<T> {
    return this.http.put<ApiSuccessResponse<T>>(endpoint, data, options).pipe(
      map(response => response.data)
    );
  }

  patch<T, D = unknown>(endpoint: string, data: D, options?: RequestOptions): Observable<T> {
    return this.http.patch<ApiSuccessResponse<T>>(endpoint, data, options).pipe(
      map(response => response.data)
    );
  }

  delete<T>(endpoint: string, options?: RequestOptions): Observable<T> {
    return this.http.delete<ApiSuccessResponse<T>>(endpoint, options).pipe(
      map(response => response.data)
    );
  }
}
