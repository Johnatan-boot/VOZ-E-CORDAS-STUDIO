import { TestBed } from '@angular/core/testing';
import { HttpClient, provideHttpClient, withInterceptors } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { apiErrorInterceptor } from './api-error.interceptor';
import { ApiError } from '../errors/api-error';

describe('apiErrorInterceptor', () => {
  let http: HttpClient;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(withInterceptors([apiErrorInterceptor])),
        provideHttpClientTesting()
      ]
    });
    http = TestBed.inject(HttpClient);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('deve normalizar um erro 404', () => {
    const mockError = {
      success: false,
      error: { code: 'NOT_FOUND', message: 'Recurso não encontrado' }
    };

    http.get('/test').subscribe({
      next: () => { throw new Error('Deveria falhar 404'); },
      error: (error: ApiError) => {
        expect(error).toBeInstanceOf(ApiError);
        expect(error.status).toBe(404);
        expect(error.details.code).toBe('NOT_FOUND');
        expect(error.details.message).toBe('Recurso não encontrado');
      }
    });

    const req = httpMock.expectOne('/test');
    req.flush(mockError, { status: 404, statusText: 'Not Found' });
  });

  it('deve lidar com falha de rede (status 0)', () => {
    http.get('/test').subscribe({
      next: () => { throw new Error('Deveria falhar rede'); },
      error: (error: ApiError) => {
        expect(error).toBeInstanceOf(ApiError);
        expect(error.status).toBe(0);
        expect(error.details.code).toBe('NETWORK_ERROR');
      }
    });

    const req = httpMock.expectOne('/test');
    req.error(new ProgressEvent('Network error'));
  });
});
