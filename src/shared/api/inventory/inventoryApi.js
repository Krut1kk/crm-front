import { api } from "@/shared/api/api";

export const inventoryApi = {
  async getList({ page = 1, limit = 20, q = "", sortBy = "createdAt", order = "desc" }) {
    const { data } = await api.get("/api/inventory", {
      params: { page, limit, q, sortBy, order },
    });

    return data; 
  },

  async create(payload) {
    const { data } = await api.post("/api/inventory", payload);
    return data; 
  },
};
