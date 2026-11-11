export interface User {
  id: string;
  name: string;
  email: string;
  createdAt: string;
}

export interface CreateUserRequest {
  name: string;
  email: string;
  password?: string; // Optional if created differently, but typical for POST
}

export interface UserResponse {
  user: User;
}
