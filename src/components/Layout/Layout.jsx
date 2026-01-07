import { Outlet } from "react-router-dom";
import { Navbar } from "@/components/Navbar/Navbar";
import styles from "./Layout.module.scss";

export const Layout = () => {
  return (
    <div className={styles.layout}>
      <Navbar />
      <main className={styles.content}>
        <Outlet />
      </main>
    </div>
  );
};
