export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  token: string;
}

export interface AuthUser {
  id: string;
  email: string;
  role: "LIBRARY" | "READER";
  name?: string;
}

export interface DecodedToken {
  role: string;
  id: string;
  email?: string;
  exp?: number;
}
