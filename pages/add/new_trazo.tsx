import useAxios from "axios-hooks";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Input from "../../components/input/input";
import InputNormal from "../../components/input/inputNormal";
import ModalBase from "../../components/modal/modal";
import { TrazoGuardado } from "../../types/Trazos";
import StickyNotesDefault from "../../views/sticky_notes_general";
import Loader from "../../components/loader/loader";

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

export default function NewTrazo() {
  const [showModal, setShowModal] = useState(false);
  let token = "";

  if (typeof window !== "undefined") {
    token = localStorage.getItem("token") || "";
  }

  const router = useRouter();



  let roles = "";

  if (typeof window !== "undefined") {
    roles = localStorage.getItem("id_rol") || "";
  }

  const [rolesNumber, setRolesNumber] = useState<number[]>([]);

  useEffect(() => {
    if (roles) {
      setRolesNumber(JSON.parse(roles));
    }
  }, [roles]);

  useEffect(() => {
    if (rolesNumber && !rolesNumber.includes(1)) {
      // router.push("/user/home");
    }
  }, [rolesNumber]);

  const [{ data, loading, error }, refetch] = useAxios<TrazoGuardado[]>({
    url: `${process.env.NEXT_PUBLIC_DATABASE_URL}/guardado/all`,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  return (
    <>
      {loading ? (
        <Loader/>
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
      txtButton="Crear"
      showModal={showModal}
      setShowModal={setShowModal}
      textTittle="Agregar Trazo"
      onClickCrear={() => {
        router.push("/add/trazo?paso=1");
      }}
    >
      <InputNormal id="trazo_name" labelText="Nombre del Trazo" />
      {/* <Input labelText="Nombre del Paso"/> */}
    </ModalBase>
  );
}
