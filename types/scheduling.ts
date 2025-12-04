export type SchedulingStatus =
  | "PENDING"
  | "COMPLETED"
  | "CANCELLED"
  | "EXPIRED";

export interface CreateSchedulingRequest {
  readerId: string;
  bookId: string;
}

export interface Scheduling {
  id: string;
  readerId: string;
  bookId: number;
  status: SchedulingStatus;
  createdAt: string;
  expiresAt: string;
  updatedAt?: string;
}
export interface SchedulingSimple {
  id: string;
  readerId: string
  bookId: number;
  status: SchedulingStatus;
  createdAt: string;
  expiresAt: string;
  updatedAt?: string;
}

export interface SchedulingResponse {
  scheduling: Scheduling;
}

export interface SchedulingsListResponse {
  schedulings: SchedulingSimple[];
}