import { TestBed } from '@angular/core/testing';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';
import { ApiClient } from './api-client.service';
import { ApiSuccessResponse } from '../http/models/api.model';

describe('ApiClient', () => {
  let service: ApiClient;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        ApiClient,
        provideHttpClient(),
        provideHttpClientTesting()
      ]
    });
    service = TestBed.inject(ApiClient);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should extract data on GET request', () => {
    const mockData = { id: 1, name: 'Test' };
    const mockResponse: ApiSuccessResponse<typeof mockData> = { success: true, data: mockData };

    service.get<typeof mockData>('/test').subscribe(data => {
      expect(data).toEqual(mockData);
    });

    const req = httpMock.expectOne('/test');
    expect(req.request.method).toBe('GET');
    req.flush(mockResponse);
  });

  it('should extract data on POST request', () => {
    const mockData = { id: 1, name: 'Test' };
    const mockResponse: ApiSuccessResponse<typeof mockData> = { success: true, data: mockData };

    service.post<typeof mockData>('/test', { name: 'Test' }).subscribe(data => {
      expect(data).toEqual(mockData);
    });

    const req = httpMock.expectOne('/test');
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual({ name: 'Test' });
    req.flush(mockResponse);
  });
});
