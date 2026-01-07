import clsx from "clsx";
import styles from "./Tabs.module.scss";

export const Tabs = ({ items, value, onChange, className }) => {
  return (
    <div className={clsx(styles.Tabs, className)}>
      {items.map((tab) => (
        <button
          key={tab.value}
          type="button"
          className={clsx(styles.tab, value === tab.value && styles.active)}
          onClick={() => onChange(tab.value)}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
};
