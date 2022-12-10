import { Field } from "formik";
import styles from "../../styles/components/input/Input.module.css";

interface LayoutProps {
  labelText: string;
  type?: string;
  id: string;
  colorLabel?: string;
}

export default function InputNormal({ labelText, type = "text", id, colorLabel }: LayoutProps) {
  return (
    <>
      <div className={styles.container_input}>
        <label style={{color: colorLabel}} htmlFor="description">{labelText}</label>
        <input
          className={styles.input_field}
          type={type}
          name={id}
          id={id}
          placeholder={labelText}
        />
      </div>
    </>
  );
}
