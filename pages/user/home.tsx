"react-pagination-bar/dist/index.css";
import { useEffect, useState } from "react";
import StickyNotesDefault from "../../views/sticky_notes_general";
import ModalBase from "../../components/modal/modal";
import InputNormal from "../../components/input/inputNormal";
import { useRouter } from "next/router";
import { TrazoCreate, TrazoGuardado, TrazoHome } from "../../types/Trazos";
import useAxios from "axios-hooks";

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
  let router = useRouter();

  let token = "";

  if (typeof window !== "undefined") {
    token = localStorage.getItem("token") || "";
  }
  // const token = !!window ? window.localStorage.getItem("token") : ""

  const [{ data, loading, error }, refetch] = useAxios<TrazoHome[]>(
    {
      url: `${process.env.NEXT_PUBLIC_DATABASE_URL}/trazo/home`,
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    },
    { useCache: false }
  );

  async function reloadData() {
    await refetch();
  }

  return (
    <>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <StickyNotesDefault
          modalAddButton={
            <ModalAddButton showModal={showModal} setShowModal={setShowModal} />
          }
          tittlePage="Mis Trazos"
          isButton={true}
          onClickAddButton={() => router.push("/add/mi_trazo")}
          stickyNotes={data!}
          onClickSitickyCard={(trazo) => {
            // if type trazo home go to pasoActual
            // if type trazo create go to paso 1
            const stepsNumberType = typeof trazo;

            if (stepsNumberType === "object" && trazo.hasOwnProperty("pasoActual")) {
              const trazoGuardado = trazo as TrazoHome;


              router.push({
                pathname: "/user/trazado/",
                query: { trazo: trazo.id, step: trazoGuardado.pasoActual },
              });
            }
            else {
              router.push({
                pathname: "/user/trazado/",
                query: { trazo: trazo.id, step: 1 },
              });
            }
          }}
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
