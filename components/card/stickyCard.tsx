import styles from "../../styles/components/card/StickyCard.module.css";
import SimpleCard from "./simpleCard";

interface LayoutProps {
  childHeader: React.ReactNode;
  childBody: React.ReactNode;
  align_items: String;
  justify_content: String;
  height?: String;
  width?: String;
  background_color?: String;
  align_items_header?: String;
  justify_content_header?: String;
  align_items_body?: String;
  justify_content_body?: String;
}

export default function StickyCard({
  childHeader,
  childBody,
  align_items,
  justify_content,
  height = "90%",
  width = "90%",
  background_color = "#FFE279",
  align_items_header = "center",
  justify_content_header = "center",
  align_items_body = "center",
  justify_content_body = "center",
}: LayoutProps) {
  return (
    <>
      <SimpleCard
        height={height}
        width={width}
        align_items={align_items}
        justify_content={justify_content}
      >
        <section
          style={{ backgroundColor: `${background_color}` }}
          className={styles.layout}
        >
          <div
            style={{
              justifyContent: "center",
              alignItems: "center",
            }}
            className={styles.header}
          >
            {childHeader}
          </div>
          <div
            style={{
              justifyContent: "center",
              alignItems: "center",
            }}
            className={styles.main}
          >
            {childBody}
          </div>
        </section>
      </SimpleCard>
    </>
  );
}
