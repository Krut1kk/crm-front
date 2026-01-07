import styles from "./Select.module.scss";

export const Select = ({ value, onChange, options }) => {
  return (
    <select className={styles.Select} value={value} onChange={onChange}>
      {options.map((opt) => (
        <option key={opt.value} value={opt.value}>
          {opt.label}
        </option>
      ))}
    </select>
  );
};
