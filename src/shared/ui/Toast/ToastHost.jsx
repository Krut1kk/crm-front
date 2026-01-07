import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import clsx from "clsx";

import { hideToast } from "@/store/slices/toastSlice";
import styles from "./ToastHost.module.scss";

export const ToastHost = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const toast = useSelector((s) => s.toast.current);

  useEffect(() => {
    if (!toast) return;

    const id = setTimeout(() => {
      dispatch(hideToast());
    }, 2500);

    return () => clearTimeout(id);
  }, [toast, dispatch]);

  if (!toast) return null;

  const message = toast.messageKey ? t(toast.messageKey) : "";

  return (
    <div className={styles.root}>
      <div className={clsx(styles.toast, styles[toast.type])}>
        <span className={styles.text}>{message}</span>
        <button type="button" className={styles.close} onClick={() => dispatch(hideToast())}>
          ×
        </button>
      </div>
    </div>
  );
};
