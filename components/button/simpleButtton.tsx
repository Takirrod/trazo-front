import styles from "../../styles/components/button/SimpleButton.module.css";

interface LayoutProps {
  btnText: string;
  onClick?: () => void;
  type: "button" | "submit" | "reset";
}

export default function SimpleButton({ btnText, onClick, type }: LayoutProps) {
  return (
    <>
      <button type={type} onClick={onClick} className={styles.btn_76}>
        {btnText}
      </button>
    </>
  );
}
