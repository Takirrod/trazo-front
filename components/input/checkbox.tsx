import styles from "../../styles/components/input/Checkbox.module.css";

interface LayoutProps {
  children: React.ReactNode;
}

export default function CheckBox({ children }: LayoutProps) {
  return (
    <>
      <label className={styles.container}>
        <input defaultChecked={false} type="checkbox" />
        <div className={styles.checkmark}></div>
        <span className={styles.label}>{children}</span>
      </label>
    </>
  );
}
