// Better Auth User Type
export interface AuthUser {
  id: string;
  email: string;
  name: string;
  emailVerified: boolean;
  createdAt: Date;
  updatedAt: Date;
  role?: "student" | "library"; // Adicionar quando vier do backend
}

// Better Auth Account Type
export interface AuthAccount {
  id: string;
  userId: string;
  accountId: string;
  providerId: string;
  accessToken?: string;
  refreshToken?: string;
  expiresAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

// Better Auth Profile Type
export interface AuthProfile {
  id?: string;
  email?: string;
  name?: string;
  image?: string;
  [key: string]: any; // Para campos extras do provider
}

// Callback Parameters
export interface SignUpCallbackParams {
  user: AuthUser;
  account: AuthAccount;
  profile?: AuthProfile;
}

export interface SignInCallbackParams {
  user: AuthUser;
  account: AuthAccount;
  profile?: AuthProfile;
}

// Session Type
export interface AuthSession {
  user: AuthUser;
  expires: string;
  sessionToken: string;
}

// Auth Client Response
export interface AuthResponse<T = any> {
  data?: T;
  error?: {
    message: string;
    code?: string;
  };
}
