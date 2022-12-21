import useAxios from "axios-hooks";
import { type } from "os";
import React, { useEffect, useState } from "react";
import DraggableList from "react-draggable-lists";
import IconButtonNoEfect from "../components/button/iconButtonNoEffect";
import StickyCard from "../components/card/stickyCard";
import IconDelete from "../components/icons/delete";
import IconEdit from "../components/icons/edit";

import styles from "../styles/view/Dragable.module.css";
import Loader from "../components/loader/loader";
import ModalBase from "../components/modal/modal";
import { useRouter } from "next/router";
import FormUpdatePaso from "./formUpdatePaso";
import { RolPublic } from "../types/RolPublic";
import { User } from "../types/UserRegister";

const listItems = [
  "Entertainment",
  "Private Time",
  "Rest",
  "Meal",
  "Exercise",
  "Work",
  "Home Projects",
  "Family",
];

interface stepType {
  descripcion: string;
  id: number;
  idRol: number;
  idTrazoGuardado: number;
  idUsuario: number;
  nombre: string;
  pasoNumero: number;
}

const ListDrag = ({
  listSteps,
  setListSteps,
  changeSteps,
  setChangeSteps,
  refetchGuardados,
}: {
  listSteps: stepType[];
  setListSteps: React.Dispatch<React.SetStateAction<stepType[]>>;
  changeSteps: boolean;
  setChangeSteps: React.Dispatch<React.SetStateAction<boolean>>;
  refetchGuardados: () => void;
}) => {
  let token = "";

  if (typeof window !== "undefined") {
    token = localStorage.getItem("token") || "";
  }

  const [showNewPaso, setShowNewPaso] = useState(false);

  const [selectedStep, setSelectedStep] = useState<stepType | null>(null);

  const [{ loading }, deletePaso] = useAxios(
    {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    },
    { manual: true }
  );

  const [{ loading: loadingNewPaso }, newPaso] = useAxios(
    {
      url: `${process.env.NEXT_PUBLIC_DATABASE_URL}/paso`,
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    },
    { manual: true }
  );

  const postPaso = async () => {
    const data = await newPaso({
      data: {
        nombre: "Paso",
        descripcion: "Descripcion",
        estaTerminado: false,
        pasoNumero: listItems.length + 1,
        idUsuario: null,
        idRol: null,
        idTrazo: selectedStep?.idTrazoGuardado,
      },
    });

    refetchGuardados();
  };

  const delPaso = async (idPaso: number) => {
    const data = await deletePaso({
      url: `${process.env.NEXT_PUBLIC_DATABASE_URL}/guardado/paso/${idPaso}`,
    });

    setListSteps(listSteps.filter((item) => item.id !== idPaso));
    setChangeSteps(!changeSteps);

    refetchGuardados();
  };

  useEffect(() => {
    // console.log(listSteps);
  }, [changeSteps]);

  return (
    <div className={styles.container_list}>
      <div style={{ width: 300, margin: "0 auto" }}>
        {loading || loadingNewPaso ? (
          <Loader notAll={true} />
        ) : (
          <DraggableList width={300} height={150} rowSize={1}>
            {listSteps.map((item, index) => (
              <li key={index}>
                {index + 1}

                <div className={styles.container_sticky}>
                  <StickyCard
                    childHeader={<>{item.nombre}</>}
                    childBody={
                      <div className={styles.container_sticky_bosy_list}>
                        {item.descripcion}
                        {/* <IconButtonNoEfect
                          tooltip="Editar Paso"
                          icon={
                            <IconEdit
                              width={"1em"}
                              height={"1em"}
                              //   color={"white"}
                            />
                          }
                          onClick={() => {
                            setShowNewPaso(true);
                            setSelectedStep(item);
                          }}
                        /> */}
                        <div>
                          <IconButtonNoEfect
                            tooltip="Eliminar Paso"
                            icon={
                              <IconDelete
                                width={"1em"}
                                height={"1em"}
                                //   color={"white"}
                              />
                            }
                            onClick={() => {
                              delPaso(item.id);
                            }}
                          />
                        </div>
                      </div>
                    }
                    align_items={"center"}
                    justify_content={"center"}
                  />
                </div>
              </li>
            ))}
          </DraggableList>
        )}
      </div>

      <ModalAddTrazo
        postPaso={postPaso}
        seletedStep={selectedStep!}
        showModal={showNewPaso}
        setShowModal={setShowNewPaso}
      />
    </div>
  );
};

function ModalAddTrazo({
  showModal,
  setShowModal,
  seletedStep,
  postPaso,
}: {
  showModal: boolean;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
  seletedStep?: stepType;
  postPaso: () => void;
}) {
  let router = useRouter();

  let token = "";

  if (typeof window !== "undefined") {
    token = localStorage.getItem("token") || "";
  }

  const [isChecked, setIsChecked] = useState(false);

  const [{ data, loading, error }, refetch] = useAxios<User[]>(
    {
      url: `${process.env.NEXT_PUBLIC_DATABASE_URL}/user/all`,
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    },
    {
      useCache: false,
    }
  );

  const [
    { data: dataRoles, loading: loadingRoles, error: errorRoles },
    refetchRoles,
  ] = useAxios<RolPublic[]>(
    {
      url: `${process.env.NEXT_PUBLIC_DATABASE_URL}/rol/all`,
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    },
    {
      useCache: false,
    }
  );

  return (
    <ModalBase
      showButton={false}
      txtButton="Guardar"
      showModal={showModal}
      setShowModal={setShowModal}
      textTittle="Editar Paso"
      onClickCrear={() => {}}
    >
      {loading || loadingRoles || !seletedStep ? (
        <Loader notAll={true} />
      ) : (
        <FormUpdatePaso
          postPaso={postPaso}
          selectedStep={seletedStep!}
          setShowModal={setShowModal}
          setIsChecked={setIsChecked}
          isChecked={isChecked}
          dataRolesAll={dataRoles!}
          dataUsersAll={data!}
        />
      )}
    </ModalBase>
  );
}

export default ListDrag;
