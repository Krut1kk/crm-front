import clsx from "clsx";
import styles from "./Badge.module.scss";

export const Badge = ({ variant, children, className }) => {
  return (
    <span className={clsx(styles.badge, styles[variant], className)}>
      {children}
    </span>
  );
};
