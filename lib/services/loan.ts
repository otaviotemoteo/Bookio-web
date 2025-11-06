import { api } from "./api";
import {
  CreateLoanRequest,
  LoanResponse,
  LoansListResponse,
  LoanStatusResponse,
} from "../../types/index";

class LoanService {
  // Criar empréstimo
  async createLoan(data: CreateLoanRequest): Promise<LoanResponse> {
    return api.post("/loans", data);
  }

  // Listar todos os empréstimos
  async getAllLoans(): Promise<LoansListResponse> {
    return api.get("/loans");
  }

  // Buscar empréstimo por ID
  async getLoan(id: string): Promise<LoanResponse> {
    return api.get(`/loans/${id}`);
  }

  // Deletar empréstimo
  async deleteLoan(id: string): Promise<void> {
    return api.delete(`/loans/${id}`);
  }

  // Verificar status do empréstimo
  async getLoanStatus(id: string): Promise<LoanStatusResponse> {
    return api.get(`/loans/${id}/status`);
  }
}

export const loanService = new LoanService();
