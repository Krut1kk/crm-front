import styles from "./Navbar.module.scss";
import Logo from "../../assets/icons/navbar/logo.svg?react";
import { NavLink } from "../../shared/ui/NavLink/NavLink";
import DashboardIcon from "@/assets/icons/navbar/dashboard.svg?react";
import { useNavigate } from "react-router-dom";
import { routes } from "@/routes/routes";
import { authStorage } from "../../shared/api/auth/authStorage";
import { useTranslation } from "react-i18next";
import secureLocalStorage from "react-secure-storage";
import { languages } from "@/shared/constants/languages.constants";

export const Navbar = () => {
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();

  const onLogout = () => {
    authStorage.clear();
    navigate(routes.login, { replace: true });
  };

  const toggleLang = async () => {
    const newLang = i18n.language === languages.en ? languages.uk : languages.en;
    await i18n.changeLanguage(newLang);
    secureLocalStorage.setItem("lang", newLang);
  };

  return (
    <div className={styles.Navbar}>
      <div className={styles.logo}>
        <Logo className={styles.logoIcon} />
      </div>

      <div className={styles.links}>
        <NavLink to={routes.dashboard} icon={DashboardIcon} label={t("dashboard")} />
        <NavLink to={routes.clients} icon={DashboardIcon} label={t("clients")} />
      </div>

      <div className={styles.bottom}>
        <button type="button" className={styles.lang} onClick={toggleLang}>
          {i18n.language.toUpperCase()}
        </button>
        <button type="button" className={styles.logout} onClick={onLogout}>
          {t("logout")}
        </button>
      </div>
    </div>
  );
};
