import styles from "../styles/admin/Home.module.css";
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { useEffect, useReducer, useState } from "react";
import { ToastContainer, toast } from "react-toastify";

import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import IconButtonNoEfect from "../components/button/iconButtonNoEffect";
import IconEdit from "../components/icons/edit";
import IconDelete from "../components/icons/delete";
import useAxios from "axios-hooks";
import { Rol } from "../types/Rol";
import CheckBox from "../components/input/checkbox";
import ModalBase from "../components/modal/modal";
import FormEditRole from "./formEditRole";
import Loader from "../components/loader/loader";

type Person = {
  usuario: string;
  correo: string;
  acciones: boolean;
};

function RoleTable({
  dataRoles,
  loading,
  refetch,
}: {
  dataRoles: Rol[];
  loading: boolean;
  refetch: () => void;
}) {
  const dataTemp: Rol[] = [];

  const [modal, setModal] = useState(false);
  const [selectedRole, setSelectedRole] = useState<Rol | null>(null);
  const [data, setData] = useState(() => [...dataTemp]);
  const rerender = useReducer(() => ({}), {})[1];
  let token = "";

  if (typeof window !== "undefined") {
    token = localStorage.getItem("token") || "";
  }
  const [isChecked, setIsChecked] = useState(false);

  const [, deleteRol] = useAxios(
    {
      url: `${process.env.NEXT_PUBLIC_DATABASE_URL}/rol/delete`,
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token || ""}`,
      },
    },
    { manual: true }
  );

  const delRol = async (id: number) => {
    toast.success("Rol borrado", {
      position: "bottom-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
      delay: 200,

    });
    // const data = await deleteRol({
    //   url: `${process.env.NEXT_PUBLIC_DATABASE_URL}/rol/delete/${id}`,
    // });

    // console.log(data);


    refetch();

  };

  useEffect(() => {
    if (dataRoles) {
      setData(() => [...dataRoles]);
    }
  }, [dataRoles]);

  const columnHelper = createColumnHelper<Rol>();

  const columns = [
    columnHelper.accessor("nombre", {
      id: "usuario",
      cell: (info) => info.getValue(),
      header: () => <span>Rol</span>,

      // footer: (info) => info.column.id,
    }),
    columnHelper.accessor((row) => row.descripcion, {
      id: "descripcion",
      cell: (info) => <i>{info.getValue()}</i>,
      header: () => <span>Descripcion</span>,
      // footer: (info) => info.column.id,
    }),

    columnHelper.accessor((row) => row.esPublico, {
      id: "publico",
      cell: (info) => (
        <div className={styles.container_is_public}>
          {info.getValue() ? (
            <div
              style={{
                backgroundColor: "var(--success)",
                borderRadius: "5px",
                fontWeight: "bold",
                minWidth: "5em",
                color: "var(--primaryAccent)",
              }}
            >
              Si
            </div>
          ) : (
            <div
              style={{
                color: "white",
                backgroundColor: "var(--error)",
                borderRadius: "5px",
                fontWeight: "bold",
                minWidth: "5em",
              }}
            >
              No
            </div>
          )}
        </div>
      ),
      header: () => <span>Es Publico</span>,
      // footer: (info) => info.column.id,
    }),
    columnHelper.accessor((row) => row, {
      id: "acciones",
      header: () => <span>Acciones</span>,
      cell: (info) => (
        <span className={styles.actions_table}>
          {info.getValue().id > 2 && (
            <IconButtonNoEfect
              tooltip="Editar"
              icon={
                <IconEdit
                  width={"1em"}
                  height={"1em"}
                  //   color={"white"}
                />
              }
              onClick={() => {
                setSelectedRole(info.getValue());
                setIsChecked(info.getValue().esPublico);
                setModal(true);
              }}
            />
          )}

          {info.getValue().id > 2 && (
            <IconButtonNoEfect
              tooltip="Eliminar"
              icon={
                <IconDelete
                  width={"1em"}
                  height={"1em"}
                  //   color={"white"}
                />
              }
              onClick={() => {
                delRol(info.getValue().id);
  
              }}
            />
          )}
        </span>
      ),
      // footer: (info) => info.column.id,
    }),
  ];

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFilteredRowModel: getFilteredRowModel(),

    initialState: { pagination: { pageIndex: 0, pageSize: 8 } },
  });

  return (
    <>
      {loading ? (
        <Loader notAll={true} />
      ) : (
        <div className={styles.container_table_pagination}>
          <ToastContainer limit={2} />

          <ModalRole
            refetch={refetch}
            token={token}
            selectedRole={selectedRole!}
            isChecked={isChecked}
            setIsChecked={setIsChecked}
            showModal={modal}
            setShowModal={setModal}
          />

          <table className={styles.table}>
            <thead>
              {table.getHeaderGroups().map((headerGroup) => (
                <tr key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <th key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody>
              {table.getRowModel().rows.map((row) => (
                <tr key={row.id}>
                  {row.getVisibleCells().map((cell) => (
                    <td key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
            <tfoot>
              {table.getFooterGroups().map((footerGroup) => (
                <tr key={footerGroup.id}>
                  {footerGroup.headers.map((header) => (
                    <th key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.footer,
                            header.getContext()
                          )}
                    </th>
                  ))}
                </tr>
              ))}
            </tfoot>
          </table>

          {data.length > 8 && (
            <div className={styles.container_pagination}>
              <button
                className="buttonP"
                onClick={() => table.setPageIndex(0)}
                disabled={!table.getCanPreviousPage()}
              >
                {"<<"}
              </button>
              <button
                className="border rounded p-1"
                onClick={() => table.previousPage()}
                disabled={!table.getCanPreviousPage()}
              >
                {"<"}
              </button>
              <button
                className="border rounded p-1"
                onClick={() => table.nextPage()}
                disabled={!table.getCanNextPage()}
              >
                {">"}
              </button>
              <button
                className="border rounded p-1"
                onClick={() => table.setPageIndex(table.getPageCount() - 1)}
                disabled={!table.getCanNextPage()}
              >
                {">>"}
              </button>
              Page
              <strong>
                {table.getState().pagination.pageIndex + 1} of{" "}
                {table.getPageCount()}
              </strong>
              | Go to page:
              <input
                type="number"
                defaultValue={table.getState().pagination.pageIndex + 1}
                onChange={(e) => {
                  const page = e.target.value ? Number(e.target.value) - 1 : 0;
                  table.setPageIndex(page);
                }}
                className="border p-1 rounded w-16"
              />
            </div>
          )}
          {/* <div>{table.getRowModel().rows.length} Rows</div> */}
        </div>
      )}
    </>
  );
}

function ModalRole({
  showModal,
  setShowModal,
  isChecked,
  setIsChecked,
  token,
  selectedRole,
  refetch,
}: {
  showModal: boolean;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
  isChecked: boolean;
  setIsChecked: React.Dispatch<React.SetStateAction<boolean>>;
  token: string;
  selectedRole: Rol;
  refetch: () => void;
}) {
  const [, actualizaRol] = useAxios(
    {
      url: `${process.env.NEXT_PUBLIC_DATABASE_URL}/rol/update`,
      method: "PUT",
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

    refetch();

    // console.log(data);
    toast.success("Roles editado", {
      position: "bottom-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
      delay: 1000,
    });
  };

  function setNewRoles(name: string, description: string): Rol {
    return {
      id: selectedRole.id,
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
      textTittle="Editar Rol"
      onClickCrear={() => {
        // registerNewUser();
        setShowModal(false);
      }}
      showButton={false}
    >
      <div className={styles.container_roles}>
        <FormEditRole
          refetch={refetch}
          updateRol={updateRol}
          setShowModal={setShowModal}
          isChecked={isChecked}
          setIsChecked={setIsChecked}
          selectedRol={selectedRole}
        />
      </div>
    </ModalBase>
  );
}

export default RoleTable;
