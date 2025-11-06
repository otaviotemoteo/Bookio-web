export interface DeleteUserResponse {
  message: string;
}

export interface ApiError {
  error: string;
  details?: any;
}

export interface ApiSuccess {
  success: boolean;
  message?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  pageSize: number;
}
