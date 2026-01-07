// styles
import styles from "./Modal.module.scss";
import { useTranslation } from "react-i18next";

export const Modal = ({ open, title, children, onClose, onSubmit }) => {
  const {t} = useTranslation();
  if (!open) return null;

  return (
    <div className={styles.Modal}>
      <div className={styles.content}>
        <div className={styles.header}>
          <p className={styles.title}>{title}</p>

          <button
            type="button"
            className={styles.close}
            onClick={onClose}
            aria-label="Close"
          >
            ×
          </button>
        </div>

        <div className={styles.body}>{children}</div>

        <div className={styles.actions}>
          <button type="button" className={styles.cancel} onClick={onClose}>
           {t("Cancel")}
          </button>

          <button type="button" className={styles.save} onClick={onSubmit}>
            {t("Save")}
          </button>
        </div>
      </div>
    </div>
  );
};
