import { useState } from "react";
import { Input } from "@/shared/ui/Input/Input";
import { Button } from "@/shared/ui/Button/Button";
import { ButtonVariant } from "@/shared/ui/enums/button";
import styles from "./AuthModal.module.scss";

export const AuthModal = ({ mode = "login", onSubmit, onSwitch }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const isLogin = mode === "login";

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ email, password });
  };

  return (
    <form className={styles.card} onSubmit={handleSubmit}>
      <div className={styles.head}>
        <h1 className={styles.title}>
          {isLogin ? "Welcome back" : "Create account"}
        </h1>
        <p className={styles.subtitle}>
          {isLogin
            ? "Enter your email and password"
            : "Fill in the fields below"}
        </p>
      </div>

      <div className={styles.fields}>
        <Input
          label="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="name@example.com"
        />

        <Input
          label="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="••••••••"
        />
      </div>

      <Button
        variant={ButtonVariant.PRIMARY}
        type="submit"
        className={styles.submit}
      >
        {isLogin ? "Log in" : "Sign up"}
      </Button>

      <button
        type="button"
        className={styles.switch}
        onClick={onSwitch}
      >
        {isLogin
          ? "No account? Create one"
          : "Already have an account? Log in"}
      </button>
    </form>
  );
};
