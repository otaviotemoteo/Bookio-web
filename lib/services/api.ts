const API_BASE_URL = "/api";

interface RequestOptions extends RequestInit {
  token?: string;
}

class ApiService {
  private baseUrl: string;

  constructor(baseUrl: string = API_BASE_URL) {
    this.baseUrl = baseUrl;
  }

  private getHeaders(options?: RequestOptions): HeadersInit {
    const headers: HeadersInit = {
      "Content-Type": "application/json",
    };
    return headers;
  }

  private async handleResponse<T>(response: Response): Promise<T> {
    if (!response.ok) {
      const error = await response.json().catch(() => ({
        message: "Erro ao processar requisição",
      }));

      throw {
        status: response.status,
        message: error.message || `Erro ${response.status}`,
        ...error,
      };
    }

    // Se for 204 (No Content), retorna null
    if (response.status === 204) {
      return null as T;
    }

    return response.json();
  }

  async get<T>(endpoint: string, options?: RequestOptions): Promise<T> {
    console.log(`📤 GET ${this.baseUrl}${endpoint}`);

    const response = await fetch(`${this.baseUrl}${endpoint}`, {
      method: "GET",
      headers: this.getHeaders(options),
      credentials: "include",
      ...options,
    });

    return this.handleResponse<T>(response);
  }

  async post<T>(
    endpoint: string,
    data?: any,
    options?: RequestOptions
  ): Promise<T> {
    console.log(`📤 POST ${this.baseUrl}${endpoint}`);

    const response = await fetch(`${this.baseUrl}${endpoint}`, {
      method: "POST",
      headers: this.getHeaders(options),
      body: JSON.stringify(data),
      credentials: "include",
      ...options,
    });

    return this.handleResponse<T>(response);
  }

  async put<T>(
    endpoint: string,
    data?: any,
    options?: RequestOptions
  ): Promise<T> {
    console.log(`📤 PUT ${this.baseUrl}${endpoint}`);

    const response = await fetch(`${this.baseUrl}${endpoint}`, {
      method: "PUT",
      headers: this.getHeaders(options),
      body: JSON.stringify(data),
      credentials: "include",
      ...options,
    });

    return this.handleResponse<T>(response);
  }

  async patch<T>(
    endpoint: string,
    data?: any,
    options?: RequestOptions
  ): Promise<T> {
    console.log(`📤 PATCH ${this.baseUrl}${endpoint}`);

    const response = await fetch(`${this.baseUrl}${endpoint}`, {
      method: "PATCH",
      headers: this.getHeaders(options),
      body: JSON.stringify(data),
      credentials: "include",
      ...options,
    });

    return this.handleResponse<T>(response);
  }

  async delete<T>(endpoint: string, options?: RequestOptions): Promise<T> {
    console.log(`📤 DELETE ${this.baseUrl}${endpoint}`);

    const response = await fetch(`${this.baseUrl}${endpoint}`, {
      method: "DELETE",
      headers: this.getHeaders(options),
      credentials: "include",
      ...options,
    });

    return this.handleResponse<T>(response);
  }

  // Para upload de arquivos (multipart/form-data)
  async uploadFile<T>(
    endpoint: string,
    formData: FormData,
    options?: RequestOptions
  ): Promise<T> {
    console.log(`📤 UPLOAD ${this.baseUrl}${endpoint}`);

    const response = await fetch(`${this.baseUrl}${endpoint}`, {
      method: "POST",
      body: formData,
      credentials: "include",
      ...options,
    });

    return this.handleResponse<T>(response);
  }

  // Para atualização com arquivo (multipart/form-data)
  async updateWithFile<T>(
    endpoint: string,
    formData: FormData,
    options?: RequestOptions
  ): Promise<T> {
    console.log(`📤 UPDATE FILE ${this.baseUrl}${endpoint}`);

    const response = await fetch(`${this.baseUrl}${endpoint}`, {
      method: "PUT",
      body: formData,
      credentials: "include",
      ...options,
    });

    return this.handleResponse<T>(response);
  }
}

// Exporta instância singleton
export const api = new ApiService();
