import styles from "../../styles/components/input/Checkbox.module.css";

interface LayoutProps {
  children: React.ReactNode;
  defaultChecked?: boolean;
  disabled?: boolean;
  isChecked?: boolean;
  onChange?: (e:any) => void;
  onClick?: () => void;
}

export default function CheckBox({
  children,
  defaultChecked = false,
  disabled = false,
  isChecked,
  onChange,
  onClick
}: LayoutProps) {
  return (
    <>
      <label className={styles.container}>
        <input
          onClick={onClick}
          onChange={onChange}
          checked={isChecked}
          disabled={disabled}
          type="checkbox"
        />
        <div className={styles.checkmark}></div>
        <span className={styles.label}>{children}</span>
      </label>
    </>
  );
}
