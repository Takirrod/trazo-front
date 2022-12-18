import Layout from "../../components/layout/layout";
import NavbarAdmin from "../../views/navbarAdmin";
import styles from "../../styles/admin/Home.module.css";
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { useEffect, useReducer, useState } from "react";
import IconButtonNoEfect from "../../components/button/iconButtonNoEffect";
import IconCross from "../../components/icons/cross";
import IconEdit from "../../components/icons/edit";
import IconDelete from "../../components/icons/delete";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import UsersTable from "../../views/userTable";
import RoleTable from "../../views/roleTable";
import Router, { useRouter } from "next/router";
import IconButton from "../../components/button/iconButton";
import IconPlus from "../../components/icons/plus";
import useAxios from "axios-hooks";
import { Rol } from "../../types/Rol";
import ModalBase from "../../components/modal/modal";
import FormEditRole from "../../views/formEditRole";
import FormCreateRole from "../../views/formCreateRol";

function Admin({}) {
  let token = "";

  if (typeof window !== "undefined") {
    token = localStorage.getItem("token") || "";
  }

  const [title, setTitle] = useState("Usuarios");
  const [isButton, setIsButton] = useState(false);

  const [showModal, setShowModal] = useState(false);
  const [isChecked, setIsChecked] = useState(false);

  const [{ data: dataRoles, loading, error }, refetch] = useAxios<Rol[]>({
    url: `${process.env.NEXT_PUBLIC_DATABASE_URL}/rol/all`,
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  return (
    <div className={styles.container}>
      <Layout
        childrenheader={
          isButton ? (
            <IconButtonHeader
              modalAddButton={
                <ModalRole
                  token={token}
                  showModal={showModal}
                  isChecked={isChecked}
                  setShowModal={setShowModal}
                  setIsChecked={setIsChecked}
                  refetch={refetch}
                />
              }
              onClickAddButton={() => {
                setIsChecked(false);
                setShowModal(true);
              }}
            />
          ) : (
            <></>
          )
        }
        navbar={<NavbarAdmin />}
      >
        <div className={styles.container_header_home}>
          <h1>{title}</h1>
        </div>

        <div className={styles.container_sticky_card}>
          <TabEx
            loading={loading}
            dataRoles={dataRoles}
            refetch={refetch}
            setIsButton={setIsButton}
            setTitle={setTitle}
          />
        </div>
        <div className={styles.container_footer_home}></div>
      </Layout>
    </div>
  );
}

function TabEx({
  setTitle,
  setIsButton,
  loading,
  dataRoles,
  refetch,
}: {
  setTitle: React.Dispatch<React.SetStateAction<string>>;
  setIsButton: React.Dispatch<React.SetStateAction<boolean>>;
  loading: boolean;
  dataRoles: Rol[] | undefined;
  refetch: () => void;
}) {
  const router = useRouter();
  const { admin } = router.query;

  const [tab, setTab] = useState(2);

  useEffect(() => {
    if (admin === "users") {
      setTitle("Usuarios");
      setTab(0);
      setIsButton(false);
    } else if (admin === "roles") {
      setTitle("Roles");
      setTab(1);
      setIsButton(true);
    }
  }, [admin]);

  return tab < 2 ? (
    <Tabs
      selectedIndex={tab}
      className={styles.tabs}
      onSelect={(index) => {
        setTab(index);
      }}
    >
      <TabList className={styles.tabsList}>
        <Tab
          onClick={() => {
            // setTitle("Usuarios");
            router.push("/admin/users");
          }}
        >
          Usuarios
        </Tab>
        <Tab
          onClick={() => {
            // setTitle("Roles");
            router.push("/admin/roles");
          }}
        >
          Roles
        </Tab>
      </TabList>

      <TabPanel>
        <div className={styles.tabcontent}>
          <UsersTable />
        </div>
      </TabPanel>
      <TabPanel>
        <div className={styles.tabcontent}>
          <RoleTable
            loading={loading}
            refetch={refetch}
            dataRoles={dataRoles!}
          />
        </div>
      </TabPanel>
    </Tabs>
  ) : (
    <></>
  );
}

function IconButtonHeader({
  onClickAddButton,
  modalAddButton,
}: {
  onClickAddButton: () => void;
  modalAddButton: React.ReactNode;
}) {
  return (
    <div id="main" className={styles.iconbtn_container}>
      <IconButton
        icon={
          <IconPlus
            width={"100%"}
            height={"100%"}
            className={styles.iconPlus}
          />
        }
        onClick={onClickAddButton}
      />
      {modalAddButton}
    </div>
  );
}

function ModalRole({
  showModal,
  setShowModal,
  isChecked,
  setIsChecked,
  token,
  refetch
}: {
  showModal: boolean;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
  isChecked: boolean;
  setIsChecked: React.Dispatch<React.SetStateAction<boolean>>;
  token: string;
  refetch: () => void;
}) {
  const router = useRouter();
  const [, actualizaRol] = useAxios(
    {
      url: `${process.env.NEXT_PUBLIC_DATABASE_URL}/rol/create`,
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token || ""}`,
      },
    },
    { manual: true }
  );
  const updateRol = async (name: string, description: string) => {
    const data = await actualizaRol({
      data: setNewRoles(name, description),
    });

    // console.log(data);
    router.push("/admin/roles");

    refetch()
  };

  function setNewRoles(name: string, description: string): any {
    return {
      nombre: name,
      descripcion: description,
      esPublico: isChecked,
    };
  }

  return (
    <ModalBase
      txtButton="Guardar"
      showModal={showModal}
      setShowModal={setShowModal}
      textTittle="Crear Rol"
      onClickCrear={() => {
        // registerNewUser();
        setShowModal(false);
      }}
      showButton={false}
    >
      <div className={styles.container_roles}>
        <FormCreateRole
          updateRol={updateRol}
          setShowModal={setShowModal}
          isChecked={isChecked}
          setIsChecked={setIsChecked}
        />
      </div>
    </ModalBase>
  );
}

export default Admin;
