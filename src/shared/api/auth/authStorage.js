const TOKEN_KEY = "accessToken";

export const authStorage = {
  getToken() {
    return localStorage.getItem(TOKEN_KEY) || "";
  },
  setToken(token) {
    localStorage.setItem(TOKEN_KEY, token);
  },
  clear() {
    localStorage.removeItem(TOKEN_KEY);
  },
};
