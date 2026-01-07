import { useTranslation } from "react-i18next";
import styles from "./Clients.module.scss";

export const Clients = () => {
  const { t } = useTranslation();
  return <div className={styles.page}>{t("clients")}</div>;
};
