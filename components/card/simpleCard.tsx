import styles from "../../styles/components/card/SimpleCard.module.css";

interface LayoutProps {
  children: React.ReactNode;
  align_items: String;
  justify_content: String;
  height?: String;
  width?: String;
  background_color?: String;
  gap?: String;
  OnClick?: () => void;
}

export default function SimpleCard({
  children,
  align_items,
  justify_content,
  height = "60%",
  width = "70%",
  background_color = "#e0e0e0",
  gap = "15%",
  OnClick = () => {},
  
}: LayoutProps) {
  return (
    <>
      <div
      onClick={OnClick}
        style={{
          alignItems: `${align_items}`,
          justifyContent: `${justify_content}`,
          height: `${height}`,
          width: `${width}`,
          backgroundColor: `${background_color}`,
          gap: `${gap}`,
        }}
        className={styles.card}
      >
        {children}
      </div>
    </>
  );
}
