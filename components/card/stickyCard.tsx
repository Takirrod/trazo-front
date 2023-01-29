import styles from "../../styles/components/card/StickyCard.module.css";
import ProgressBar from "../bar/progerssBar";
import SimpleCard from "./simpleCard";

interface LayoutProps {
  childHeader: React.ReactNode;
  childBody: React.ReactNode;
  childFooter?: React.ReactNode;
  align_items: String;
  justify_content: String;
  height?: String;
  width?: String;
  background_color?: String;
  align_items_header?: String;
  justify_content_header?: String;
  align_items_body?: String;
  justify_content_body?: String;
  OnClick?: () => void;
}

export default function StickyCard({
  childHeader,
  childBody,
  childFooter,
  align_items,
  justify_content,
  height = "100%",
  width = "100%",
  background_color = "#FFE279",
  align_items_header = "center",
  justify_content_header = "center",
  align_items_body = "center",
  justify_content_body = "center",
  OnClick = () => {},
}: LayoutProps) {
  return (
    <>
      <SimpleCard
        OnClick={OnClick}
        height={height}
        width={width}
        align_items={align_items}
        justify_content={justify_content}
        gap={"auto"}
      >
        <section
          style={{ backgroundColor: `${background_color}` }}
          className={styles.layout}
        >
          <div
        
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
          <div
            style={{
              justifyContent: "center",
              alignItems: "center",
            }}
            className={styles.foot}
          >
            {childFooter}
          </div>
        </section>
      </SimpleCard>
    </>
  );
}
