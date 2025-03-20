import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { UserService, User, UpdateProfileRequest } from './user.service';
import { HttpHeaders } from '@angular/common/http';

describe('UserService', () => {
  let service: UserService;
  let httpMock: HttpTestingController;
  const baseUrl = 'http://localhost:8080/api';

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [UserService]
    });

    service = TestBed.inject(UserService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should retrieve all users', () => {
    const mockUsers: User[] = [
      { id: 1, name: 'John Doe', email: 'john@example.com', password: '', birthday: '2000-01-01', role: 'USER' },
      { id: 2, name: 'Jane Doe', email: 'jane@example.com', password: '', birthday: '1999-05-05', role: 'ADMIN' }
    ];

    service.getUsers().subscribe(users => {
      expect(users.length).toBe(2);
      expect(users).toEqual(mockUsers);
    });

    const req = httpMock.expectOne(`${baseUrl}/users`);
    expect(req.request.method).toBe('GET');
    req.flush(mockUsers);
  });

  it('should retrieve user by ID', () => {
    const mockUser: User = { id: 1, name: 'John Doe', email: 'john@example.com', password: '', birthday: '2000-01-01', role: 'USER' };

    service.getUserById(1).subscribe(user => {
      expect(user).toEqual(mockUser);
    });

    const req = httpMock.expectOne(`${baseUrl}/users/1`);
    expect(req.request.method).toBe('GET');
    req.flush(mockUser);
  });

  it('should create a new user', () => {
    const newUser: User = { name: 'Alice', email: 'alice@example.com', password: '1234', birthday: '1995-07-07', role: 'USER' };

    service.createUser(newUser).subscribe(user => {
      expect(user).toEqual(newUser);
    });

    const req = httpMock.expectOne(`${baseUrl}/users`);
    expect(req.request.method).toBe('POST');
    req.flush(newUser);
  });

  it('should update user details', () => {
    const updatedUser: User = { id: 1, name: 'John Updated', email: 'john@example.com', password: '', birthday: '2000-01-01', role: 'USER' };

    service.updateUser(1, updatedUser).subscribe(user => {
      expect(user).toEqual(updatedUser);
    });

    const req = httpMock.expectOne(`${baseUrl}/users/1`);
    expect(req.request.method).toBe('PUT');
    req.flush(updatedUser);
  });

 
  it('should get user profile', () => {
    const mockProfile: User = { id: 1, name: 'John Doe', email: 'john@example.com', password: '', birthday: '2000-01-01', role: 'USER' };

    service.getUserProfile().subscribe(profile => {
      expect(profile).toEqual(mockProfile);
    });

    const req = httpMock.expectOne(`${baseUrl}/users/profile`);
    expect(req.request.method).toBe('GET');
    req.flush(mockProfile);
  });

  it('should update user profile', () => {
    const profileUpdate: UpdateProfileRequest = { name: 'John Updated', email: 'john@example.com' };

    service.updateProfile(profileUpdate).subscribe(user => {
      expect(user.name).toBe('John Updated');
    });

    const req = httpMock.expectOne(`${baseUrl}/users/profile`);
    expect(req.request.method).toBe('PUT');
    req.flush({ ...profileUpdate, id: 1 });
  });
});