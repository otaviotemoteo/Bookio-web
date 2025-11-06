import { Address } from "./library";

export interface CreateReaderRequest {
  name: string;
  email: string;
  cpf: string;
  libraryId: string;
  address: Address;
}

export interface UpdateReaderRequest {
  name?: string;
  email?: string;
  cpf?: string;
  address?: Partial<Address>;
}

export interface Reader {
  id: string;
  name: string;
  email: string;
  cpf: string;
  pictureUrl?: string;
  active: boolean;
  suspense: number;
  libraryId: string;
  address: Address;
  role: "READER";
  createdAt: string;
}

export interface ReaderResponse {
  reader: Reader;
}

export interface ReadersListResponse {
  readers: Reader[];
}
