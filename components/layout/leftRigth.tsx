import styles from "../../styles/components/layout/LeftRight.module.css";

interface LayoutProps {
    child1: React.ReactNode;
    child2: React.ReactNode;
}

export default function LeftRigth({ child1, child2 }: LayoutProps) {
  return (
    <section className={styles.layout}>
      <div className={styles.left}>{child1}</div>
      <div className={styles.rigth}>{child2}</div>
    </section>
  );
}
