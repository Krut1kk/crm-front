import clsx from "clsx";
import styles from "./Input.module.scss";

export const Input = ({ label, error, className, ...props }) => {
  return (
    <label className={clsx(styles.input, className)} data-error={!!error}>
      {label && <span className={styles.label}>{label}</span>}

      <input className={styles.control} {...props} />

      {error && <span className={styles.error}>{error}</span>}
    </label>
  );
};
