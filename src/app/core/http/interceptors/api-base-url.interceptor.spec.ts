import { TestBed } from '@angular/core/testing';
import { HttpClient, provideHttpClient, withInterceptors } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { apiBaseUrlInterceptor } from './api-base-url.interceptor';
import { API_URL } from '../api.token';

describe('apiBaseUrlInterceptor', () => {
  let http: HttpClient;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: API_URL, useValue: '/api/v1' },
        provideHttpClient(withInterceptors([apiBaseUrlInterceptor])),
        provideHttpClientTesting()
      ]
    });
    http = TestBed.inject(HttpClient);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('deve adicionar o baseUrl em chamadas relativas', () => {
    http.get('/users').subscribe();
    
    const req = httpMock.expectOne('/api/v1/users');
    expect(req.request.url).toBe('/api/v1/users');
    req.flush({});
  });

  it('nao deve adicionar o baseUrl se a chamada ja contem', () => {
    http.get('/api/v1/users').subscribe();
    
    const req = httpMock.expectOne('/api/v1/users');
    expect(req.request.url).toBe('/api/v1/users');
    req.flush({});
  });

  it('nao deve adicionar o baseUrl em chamadas absolutas (http...)', () => {
    http.get('https://example.com/users').subscribe();
    
    const req = httpMock.expectOne('https://example.com/users');
    expect(req.request.url).toBe('https://example.com/users');
    req.flush({});
  });
});
