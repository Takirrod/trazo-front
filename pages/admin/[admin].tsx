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
import { useRouter } from "next/router";

function Home() {
  const [title, setTitle] = useState("Usuarios");

  return (
    <div className={styles.container}>
      <Layout navbar={<NavbarAdmin />}>
        <div className={styles.container_header_home}>
          <h1>{title}</h1>
        </div>

        <div className={styles.container_sticky_card}>
          <TabEx setTitle={setTitle} />
        </div>
        <div className={styles.container_footer_home}></div>
      </Layout>
    </div>
  );
}

function TabEx({
  setTitle,
}: {
  setTitle: React.Dispatch<React.SetStateAction<string>>;
}) {
  const router = useRouter();
  const { admin } = router.query;

  const [tab, setTab] = useState(2);

  useEffect(() => {
    if (admin === "users") {
      setTitle("Usuarios");
      setTab(0);
    } else if (admin === "roles") {
      setTitle("Roles");
      setTab(1);
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
          <RoleTable />
        </div>
      </TabPanel>
    </Tabs>
  ) : (
    <></>
  );
}
export default Home;
