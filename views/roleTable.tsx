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
import { Rol } from "../types/Rol";

type Person = {
  usuario: string;
  correo: string;
  acciones: boolean;
};

function RoleTable() {
  const dataTemp: Rol[] = [];

  const [data, setData] = useState(() => [...dataTemp]);
  const rerender = useReducer(() => ({}), {})[1];
  let token = "";

  if (typeof window !== "undefined") {
    token = localStorage.getItem("token") || "";
  }

  const [{ data: dataRoles, loading, error }, refetch] = useAxios<Rol[]>({
    url: `${process.env.NEXT_PUBLIC_DATABASE_URL}/rol/all`,
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

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
    columnHelper.accessor((row) => row.id, {
      id: "acciones",
      header: () => <span>Acciones</span>,
      cell: (info) => (
        <span className={styles.actions_table}>
          {info.getValue() > 2 && (
            <IconButtonNoEfect
              tooltip="Editar"
              icon={
                <IconEdit
                  width={"1em"}
                  height={"1em"}
                  //   color={"white"}
                />
              }
              onClick={() => console.log("editar")}
            />
          )}

          {info.getValue() > 2 && (
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
        <div>Cargando...</div>
      ) : (
        <div className={styles.container_table_pagination}>
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

export default RoleTable;
