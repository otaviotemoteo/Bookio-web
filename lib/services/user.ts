import { api } from "./api";
import { DeleteUserResponse } from "../../types/index";

class UserService {
  // Deletar usuário (biblioteca ou leitor)
  async deleteUser(id: string): Promise<DeleteUserResponse> {
    return api.delete(`/user/${id}`);
  }
}

export const userService = new UserService();
