import { TestBed } from '@angular/core/testing';
import { of, Observable } from 'rxjs';
import { UserApiService } from './user-api.service';
import { ApiClient } from '../../../core/api/api-client.service';
import { CreateUserRequest, UserResponse } from '../models/user.model';

class MockApiClient {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  get = (..._args: unknown[]) => of() as unknown as Observable<void>;
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  post = (..._args: unknown[]) => of() as unknown as Observable<void>;
}

describe('UserApiService', () => {
  let service: UserApiService;
  let apiClientMock: MockApiClient;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        UserApiService,
        { provide: ApiClient, useClass: MockApiClient }
      ]
    });
    
    service = TestBed.inject(UserApiService);
    apiClientMock = TestBed.inject(ApiClient) as unknown as MockApiClient;
  });

  it('should call get on ApiClient when getUser is called', () => {
    const mockResponse: UserResponse = {
      user: { id: '1', name: 'Test', email: 'test@test.com', createdAt: '2023-01-01' }
    };
    let getCalledWith = '';
    apiClientMock.get = (_url: unknown) => {
      getCalledWith = _url as string;
      return of(mockResponse) as unknown as Observable<void>;
    };

    service.getUser('1').subscribe(response => {
      expect(response).toEqual(mockResponse);
    });

    expect(getCalledWith).toBe('/users/1');
  });

  it('should call post on ApiClient when createUser is called', () => {
    const mockRequest: CreateUserRequest = { name: 'Test', email: 'test@test.com' };
    const mockResponse: UserResponse = {
      user: { id: '1', name: 'Test', email: 'test@test.com', createdAt: '2023-01-01' }
    };
    let postCalledWithUrl = '';
    let postCalledWithBody: unknown = null;
    
    apiClientMock.post = (_url: unknown, _body: unknown) => {
      postCalledWithUrl = _url as string;
      postCalledWithBody = _body;
      return of(mockResponse) as unknown as Observable<void>;
    };

    service.createUser(mockRequest).subscribe(response => {
      expect(response).toEqual(mockResponse);
    });

    expect(postCalledWithUrl).toBe('/users');
    expect(postCalledWithBody).toEqual(mockRequest);
  });
});
