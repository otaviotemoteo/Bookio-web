export interface Address {
  cep: string;
  street: string;
  neighborhood: string;
  city: string;
  number: string;
}

export interface Reader {
  id: string;
  userId: string;
  name: string;
  email: string;
  cpf: string;
  libraryId: string;
  address: Address;
  picture?: string;
  createdAt: string;
  updatedAt: string;
  activeLoans?: number;
  totalLoans?: number;
  pendingFines?: number;
}

export interface CreateReaderData {
  name: string;
  email: string;
  cpf: string;
  libraryId: string;
  address: Address;
}

export interface UpdateReaderData {
  name?: string;
  email?: string;
  cpf?: string;
  address?: Address;
}

export interface ReaderFormData extends CreateReaderData {
  picture?: File;
}

export interface UpdateReaderFormData extends UpdateReaderData {
  picture?: File;
}
