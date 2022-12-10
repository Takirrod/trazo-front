import { useState } from "react";
import ReactModal from "react-modal";
import styles from "../../styles/components/modal/Modal.module.css";
import IconButton from "../button/iconButton";
import IconButtonNoEfect from "../button/iconButtonNoEffect";
import SimpleButton from "../button/simpleButtton";
import IconCross from "../icons/cross";
import IconPlus from "../icons/plus";
import Input from "../input/input";

interface LayoutProps {
  children?: React.ReactNode;
  textTittle: string;
  type?: string;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
  showModal: boolean;
  txtButton?: string;
  onClickCrear: () => void;
}

export default function ModalBase({
  children,
  textTittle,
  showModal,
  setShowModal,
  txtButton = "Guardar",
  onClickCrear
}: LayoutProps) {
  //   const [showModal, setShowModal] = useState(false);

  return (
    <>
      <ReactModal
        style={{
          overlay: {
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(255, 255, 255, 0.3)",
            zIndex: 9,
          },
          content: {
            top: "50%",
            left: "50%",
            right: "auto",
            bottom: "auto",
            marginRight: "-50%",
            backgroundColor: "var(--background)",
            transform: "translate(-50%, -50%)",
            borderRadius: "10px",
          },
        }}
        isOpen={showModal}
        contentLabel=""
      >
        {/* <button onClick={() => setShowModal(!showModal)}>Close Modal</button> */}
        <div className={styles.container_modal}>
          <div className={styles.container_button_modal}>
            <IconButtonNoEfect
              tooltip="Cerrar"
              icon={
                <IconCross
                  width={"1em"}
                  height={"1em"}
                  //   color={"white"}
                />
              }
              onClick={() => setShowModal(!showModal)}
            />
          </div>
          <div className={styles.container_modal_header}>
            <h2>{textTittle}</h2>
          </div>
          <div className={styles.container_modal_body}>
            {/* <Input labelText="Nombre del Trazo" /> */}
            {children}
          </div>
          <div className={styles.container_modal_footer}>
            {/* <button>Crear</button> */}
            <SimpleButton type="submit" onClick={onClickCrear} btnText={txtButton} />
          </div>
        </div>
      </ReactModal>
    </>
  );
}
