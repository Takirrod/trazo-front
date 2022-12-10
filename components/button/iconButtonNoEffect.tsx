import React from "react";
import styles from "../../styles/components/button/IconButtonNoEffect.module.css";

interface LayoutProps {
  icon: React.ReactNode;
  tooltip: string;
  onClick?: () => void;
}

export default function IconButtonNoEfect({
  icon,
  tooltip,
  onClick,
}: LayoutProps) {
  return (
    <>
      <button onClick={onClick} className={styles.tooltip} id="button">
        {icon}
        <span className={styles.tooltiptext}>{tooltip}</span>
      </button>
    </>
  );
}
