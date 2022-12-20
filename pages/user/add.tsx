import useAxios from "axios-hooks";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import IconButtonNoEfect from "../../components/button/iconButtonNoEffect";
import IconPlus from "../../components/icons/plus";
import Input from "../../components/input/input";
import InputNormal from "../../components/input/inputNormal";
import ModalBase from "../../components/modal/modal";
import { TrazoGuardado } from "../../types/Trazos";
import FormCreateRole from "../../views/formCreateRol";
import FormNewTrazo from "../../views/formNewTrazo";
import ListDrag from "../../views/list_trazos";
import StickyNotesDefault from "../../views/sticky_notes_general";
import styles from "../../styles/add/AddTrazo.module.css";

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
interface stepType {
  descripcion: string;
  id: number;
  idRol: number;
  idTrazoGuardado: number;
  idUsuario: number;
  nombre: string;
  pasoNumero: number;
}

const trazos = [1, 2, 3, 4, 5, 6, 7, 8];

export default function Add() {
  const [showModal, setShowModal] = useState(false);
  const [showModalEdit, setShowModalEdit] = useState(false);

  const [steps, setSteps] = useState<stepType[]>([]);
  const [changeSteps, setChangeSteps] = useState(false);

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
  const [{ data, loading, error }, refetch] = useAxios<TrazoGuardado[]>(
    {
      url: `${process.env.NEXT_PUBLIC_DATABASE_URL}/guardado/all`,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    },
    {
      useCache: false,
    }
  );

  useEffect(() => {
    // refetch();
  }, [setChangeSteps]);

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
          onClickSitickyCard={(id) => {
            // router.push(`/user/trazos/${id}`);
            const trazoSelected = id as TrazoGuardado;
            // console.log(id);
            setShowModalEdit(!showModalEdit);
            setSteps(trazoSelected.pasoGuardado!);
          }}
        />
      )}
      <ModalEditTrazo
        setListSteps={setSteps}
        steps={steps}
        showModal={showModalEdit}
        setShowModal={setShowModalEdit}
        changeSteps={changeSteps}
        setChangeSteps={setChangeSteps}
      />
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
      onClickCrear={() => {}}
    >
      <FormNewTrazo router={router} setShowModal={setShowModal} />
      {/* <Input labelText="Nombre del Paso"/> */}
    </ModalBase>
  );
}

function ModalEditTrazo({
  showModal,
  setShowModal,
  setListSteps,

  steps,

  changeSteps,
  setChangeSteps,
}: {
  showModal: boolean;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
  steps: stepType[];
  setListSteps: React.Dispatch<React.SetStateAction<stepType[]>>;

  changeSteps: boolean;
  setChangeSteps: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  let router = useRouter();

  return (
    <ModalBase
      showButton={true}
      txtButton="Guardar"
      showModal={showModal}
      setShowModal={setShowModal}
      textTittle="Editar Trazo"
      onClickCrear={() => {}}
    >
      <div className={styles.container_sub_tittle}>
        <IconButtonNoEfect
          tooltip="Agregar Paso"
          icon={
            <IconPlus
              width={"1em"}
              height={"1em"}
              //   color={"white"}
            />
          }
          onClick={() => {}}
        />
        <h2>Mueve los trazos para cambiar el orden</h2>
      </div>
      <ListDrag
        changeSteps={changeSteps}
        setChangeSteps={setChangeSteps}
        setListSteps={setListSteps}
        listSteps={steps}
      />
    </ModalBase>
  );
}
