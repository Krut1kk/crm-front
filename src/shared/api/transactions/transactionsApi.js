
import { api } from "@/shared/api/api";

export const transactionsApi = {
  async getList({ page = 1, limit = 20, type, status }) {
    const { data } = await api.get("/api/transactions", {
      params: { page, limit, type, status },
    });

    return data;
  },

  async create(payload) {
    const { data } = await api.post("/api/transactions", payload);
    return data;
  },

  async updateStatus(id, status) {
    const { data } = await api.patch(`/api/transactions/${id}/status`, { status });
    return data;
  },
};
