import styles from "../../styles/components/layout/Layout.module.css";
import Navbar from "../../views/navbar";

interface LayoutProps {
  children: React.ReactNode;
  navbar?: React.ReactNode;
  childrenheader?: React.ReactNode;
  align_items?: String;
  justify_content?: String;
}

export default function Layout({
  children,
  childrenheader,
  align_items = "center",
  justify_content = "center",
  navbar= <></>,
}: LayoutProps) {
  return (
    <>
      <div className={styles.parent}>
        <div className={styles.container_navbar}>{navbar}</div>

        <div
          style={{
            alignItems: `${align_items}`,
            justifyContent: `${justify_content}`,
          }}
          className={styles.div1}
        >
          <div className={styles.div2}>{children}</div>
          {childrenheader}

        </div>
      </div>
    </>
  );
}
