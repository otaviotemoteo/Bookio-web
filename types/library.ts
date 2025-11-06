export interface Address {
  cep: string;
  street: string;
  neighborhood: string;
  city: string;
  number: string;
}

export interface CreateLibraryRequest {
  name: string;
  email: string;
  password: string;
  cnpj: string;
  address: Address;
}

export interface UpdateLibraryRequest {
  name?: string;
  email?: string;
  cnpj?: string;
  address?: Partial<Address>;
}

export interface Library {
  id: string;
  name: string;
  email: string;
  cnpj: string;
  address: Address;
  role: "LIBRARY";
  createdAt: string;
}

export interface LibraryResponse {
  library: Library;
}
