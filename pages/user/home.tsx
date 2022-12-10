"react-pagination-bar/dist/index.css";
import { useState } from "react";
import StickyNotesDefault from "../../views/sticky_notes_general";
import ModalBase from "../../components/modal/modal";
import InputNormal from "../../components/input/inputNormal";
import { useRouter } from "next/router";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};

const trazos = [1, 2];

function Home() {
  const [currentPage, setCurrentPage] = useState(1);
  const pagePostsLimit = 6;
  const [showModal, setShowModal] = useState(false);
  let router= useRouter()


  return (
    <StickyNotesDefault
      modalAddButton={
        <ModalAddButton showModal={showModal} setShowModal={setShowModal} />
      }
      tittlePage="Mis Trazos"
      isButton={true}
      onClickAddButton={() => router.push('/add/mi_trazo')}
      stickyNotes={trazos}
    />
  );
  // return <Navbar/>
}

function ModalAddButton({
  showModal,
  setShowModal,
}: {
  showModal: boolean;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  return (
    <ModalBase
      txtButton="Crear"
      showModal={showModal}
      setShowModal={setShowModal}
      textTittle="Agregar Trazo"
      onClickCrear={() => console.log("crear")}
    >
      <InputNormal id="trazo_name" labelText="Nombre del Trazo" />
      {/* <Input labelText="Nombre del Paso"/> */}
    </ModalBase>
  );
}
export default Home;
