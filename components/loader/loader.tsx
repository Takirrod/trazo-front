import styles from "../../styles/components/loader/Loader.module.css";

interface LayoutProps {
  notAll?: boolean;
}

export default function Loader({ notAll = false }: LayoutProps) {
  return (
    <>
      {notAll ? (
        <span className={styles.loader}></span>
      ) : (
        <div className={styles.center}>
          <span className={styles.loader}></span>
        </div>
      )}
    </>
  );
}
