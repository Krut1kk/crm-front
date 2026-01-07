import { useState } from "react";
import styles from "./Login.module.scss";
import { AuthModal } from "../../components/AuthModal/AuthModal";
import { authApi } from "../../shared/api/auth/authApi";
import { authStorage } from "../../shared/api/auth/authStorage";
import { useNavigate } from "react-router-dom";
import { routes } from "@/routes/routes";

export const Login = () => {
  const [mode, setMode] = useState("login");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (payload) => {
    setError("");

    try {
      const data =
        mode === "login"
          ? await authApi.login(payload)
          : await authApi.register(payload);

      authStorage.setToken(data.accessToken);
      navigate(routes.dashboard, { replace: true });
    } catch (err) {
      setError(err?.response?.data?.message || "Auth error");
    }
  };

  const switchMode = () => {
    setMode((prev) => (prev === "login" ? "register" : "login"));
    setError("");
  };

  return (
    <div className={styles.page}>
      <AuthModal mode={mode} onSubmit={handleSubmit} onSwitch={switchMode} />

      {error && <p className={styles.error}>{error}</p>}
    </div>
  );
};
