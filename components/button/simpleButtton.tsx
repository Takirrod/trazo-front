import styles from "../../styles/components/button/SimpleButton.module.css";

interface LayoutProps {
  btnText: string;
  onClick?: () => void;
  type: "button" | "submit" | "reset";
  disabled?: boolean;
}

export default function SimpleButton({
  btnText,
  onClick,
  type,
  disabled = false,
}: LayoutProps) {
  return (
    <>
      <button
        disabled={disabled}
        type={type}
        onClick={onClick}
        className={styles.btn_76}
      >
        {btnText}
      </button>
    </>
  );
}
