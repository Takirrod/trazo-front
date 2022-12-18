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

import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import IconButtonNoEfect from "../components/button/iconButtonNoEffect";
import IconEdit from "../components/icons/edit";
import IconDelete from "../components/icons/delete";
import useAxios from "axios-hooks";
import { User } from "../types/UserRegister";
import ModalBase from "../components/modal/modal";
import { Rol } from "../types/Rol";
import CheckBox from "../components/input/checkbox";

function UsersTable() {
  const dataTemp: User[] = [];
  const [modal, setModal] = useState(false);

  const [data, setData] = useState(() => [...dataTemp]);
  const [checkBoxes, setCheckBoxes] = useState<boolean[]>([]);

  const rerender = useReducer(() => ({}), {})[1];
  let token = "";

  if (typeof window !== "undefined") {
    token = localStorage.getItem("token") || "";
  }

  const [{ data: dataRolesAll, loading: loadingRolesAll }] = useAxios<Rol[]>({
    url: `${process.env.NEXT_PUBLIC_DATABASE_URL}/rol/all`,
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  const [{ data: dataRoles, loading, error }, refetch] = useAxios<User[]>({
    url: `${process.env.NEXT_PUBLIC_DATABASE_URL}/user/all`,
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  const [
    { data: dataUserRols, loading: loadingUserRol, error: errorUserRols },
    getRolesUser,
  ] = useAxios<Rol[]>({
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  const getRoles = async ({ userID }: { userID: number }) => {
    const data = await getRolesUser({
      url: `${process.env.NEXT_PUBLIC_DATABASE_URL}/rol/user/${userID}`,
    });
  };

  useEffect(() => {
    if (dataRoles) {
      setData(() => [...dataRoles]);
    }
  }, [dataRoles]);

  const columnHelper = createColumnHelper<User>();

  const columns = [
    columnHelper.accessor((row) => row.nombre, {
      id: "usuario",
      cell: (info) => info.getValue(),
      header: () => <span>Usuario</span>,

      // footer: (info) => info.column.id,
    }),
    columnHelper.accessor((row) => row.email, {
      id: "correo",
      cell: (info) => <i>{info.getValue()}</i>,
      header: () => <span>Correo</span>,
      // footer: (info) => info.column.id,
    }),
    columnHelper.accessor((row) => row.id, {
      id: "acciones",
      header: () => <span>Acciones</span>,
      cell: (info) => (
        <span className={styles.actions_table}>
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
              getRoles({ userID: info.getValue() });
              setModal(true);
            }}
          />
          <IconButtonNoEfect
            tooltip="Eliminar"
            icon={
              <IconDelete
                width={"1em"}
                height={"1em"}
                //   color={"white"}
              />
            }
            onClick={() => console.log("editar")}
          />
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

  const rolesTemp: Rol[] = [
    {
      id: 0,
      nombre: "",
      descripcion: "",
      esPublico: false,
    },
  ];

  return (
    <>
      {loading ? (
        <div>Cargando...</div>
      ) : (
        <div className={styles.container_table_pagination}>
          <ModalUser
            setShowModal={setModal}
            showModal={modal}
            dataUserRols={dataRolesAll || rolesTemp}
            dataRolesSelectUser={dataUserRols || rolesTemp}
            checkboxes={checkBoxes}
            setCheckBoxes={setCheckBoxes}
            loading={loadingUserRol}
          ></ModalUser>
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

function ModalUser({
  showModal,
  setShowModal,
  dataUserRols,
  checkboxes,
  setCheckBoxes,
  loading,
  dataRolesSelectUser,
}: {
  showModal: boolean;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
  dataUserRols: Rol[];
  checkboxes: boolean[];
  setCheckBoxes: React.Dispatch<React.SetStateAction<boolean[]>>;
  loading: boolean;
  dataRolesSelectUser: Rol[];
}) {
  return (
    <ModalBase
      txtButton="Guardar"
      showModal={showModal}
      setShowModal={setShowModal}
      textTittle="Editar Roles de Usuario"
      onClickCrear={() => console.log("crear")}
    >
      <div className={styles.container_roles}>
        {!loading ? (
          dataUserRols!.map((role, index) => (
            // set checkbox index to true
            <CheckBox
              key={role.id}
              onChange={(e: any) => {}}
              onClick={() => {
                // Change value of checkbox
                let newCheckBoxes = checkboxes;
                newCheckBoxes[index] = !newCheckBoxes[index];
                setCheckBoxes(newCheckBoxes);
              }}
              defaultChecked={checkIfitHasRol(dataRolesSelectUser, role)}
            >
              {role.nombre}
            </CheckBox>
          ))
        ) : (
          <></>
        )}
      </div>
    </ModalBase>
  );
}

function checkIfitHasRol(roles: Rol[], rol: Rol): boolean {
  let hasRol: boolean = false;
  roles.forEach((role) => {
    if (role.id === rol.id) {
      hasRol = true;
    }
  });
  return hasRol;
}
export default UsersTable;
