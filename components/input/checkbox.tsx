import styles from "../../styles/components/input/Checkbox.module.css";

interface LayoutProps {
  children: React.ReactNode;
  defaultChecked?: boolean;
  disabled?: boolean;
}

export default function CheckBox({
  children,
  defaultChecked = false,
  disabled = false,
}: LayoutProps) {
  return (
    <>
      <label className={styles.container}>
        <input disabled={disabled} defaultChecked={defaultChecked} type="checkbox" />
        <div className={styles.checkmark}></div>
        <span className={styles.label}>{children}</span>
      </label>
    </>
  );
}
