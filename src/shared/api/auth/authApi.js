import { api } from "@/shared/api/api";

export const authApi = {
  async register({ email, password }) {
    const { data } = await api.post("api/auth/register", { email, password });
    return data;
  },

  async login({ email, password }) {
    const { data } = await api.post("api/auth/login", { email, password });
    return data;
  },
};
