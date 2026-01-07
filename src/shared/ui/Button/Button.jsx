import clsx from "clsx";
import { ButtonVariant } from "@/shared/ui/enums/button";
import styles from "./Button.module.scss";

export const Button = ({
  children,
  variant = ButtonVariant.PRIMARY,
  className,
  ...props
}) => {
  return (
    <button
      type="button"
      className={clsx(styles.button, styles[variant], className)}
      {...props}
    >
      {children}
    </button>
  );
};
