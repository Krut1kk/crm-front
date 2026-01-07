import clsx from "clsx";
import { Link, useLocation } from "react-router-dom";

import styles from "./NavLink.module.scss";

export const NavLink = ({ to, icon: Icon, label }) => {
  const { pathname } = useLocation();
  const isActive = pathname === to;

  return (
    <Link to={to} className={clsx(styles.link, isActive && styles.active)}>
      {Icon && (
        <span className={styles.icon}>
          <Icon />
        </span>
      )}
      <span className={styles.label}>{label}</span>
    </Link>
  );
};
