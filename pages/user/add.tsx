import useAxios from "axios-hooks";
import { useRouter } from "next/router";
import { useState } from "react";
import Input from "../../components/input/input";
import InputNormal from "../../components/input/inputNormal";
import ModalBase from "../../components/modal/modal";
import { TrazoGuardado } from "../../types/Trazos";
import FormCreateRole from "../../views/formCreateRol";
import FormNewTrazo from "../../views/formNewTrazo";
import StickyNotesDefault from "../../views/sticky_notes_general";

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

const trazos = [1, 2, 3, 4, 5, 6, 7, 8];

export default function Add() {
  const [showModal, setShowModal] = useState(false);
  let token = "";

  if (typeof window !== "undefined") {
    token = localStorage.getItem("token") || "";
  }

  const [{ data, loading, error }, refetch] = useAxios<TrazoGuardado[]>({
    url: `${process.env.NEXT_PUBLIC_DATABASE_URL}/guardado/all`,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  },{
    useCache: false
  });

  return (
    <>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <StickyNotesDefault
          modalAddButton={
            <ModalAddButton showModal={showModal} setShowModal={setShowModal} />
          }
          tittlePage="Trazos"
          isButton={true}
          onClickAddButton={() => setShowModal(!showModal)}
          stickyNotes={data!}
        />
      )}
    </>
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
  let router = useRouter();

  return (
    <ModalBase
      showButton={false}
      txtButton="Crear"
      showModal={showModal}
      setShowModal={setShowModal}
      textTittle="Agregar Trazo"
      onClickCrear={() => {
 
      }}
    >
      <FormNewTrazo router={router} setShowModal={setShowModal} />
      {/* <Input labelText="Nombre del Paso"/> */}
    </ModalBase>
  );
}
