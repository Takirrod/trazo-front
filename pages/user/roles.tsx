import useAxios from "axios-hooks";
import Link from "next/link";
import { useEffect } from "react";
import SimpleButton from "../../components/button/simpleButtton";
import SimpleCard from "../../components/card/simpleCard";
import StickyCard from "../../components/card/stickyCard";
import CheckBox from "../../components/input/checkbox";
import Layout from "../../components/layout/layout";
import styles from "../../styles/user/Roles.module.css";
import { RolPublic } from "../../types/RolPublic";

function Roles() {
  return (
    <div className={styles.container}>
      <Layout>
        <div className={styles.container_sticky_card}>
          <StickyCard
            childHeader={<></>}
            childBody={<StickyBody />}
            align_items={"center"}
            justify_content={"center"}
          />
          <div className={styles.button_container}>
            <Link href={"/user/home"}>
              <SimpleButton type="button" btnText="Continuar" />
            </Link>
          </div>
        </div>
      </Layout>
    </div>
  );
}

function StickyBody() {
  const [{ data, loading, error }, refetch] = useAxios<RolPublic[]>(
    `${process.env.NEXT_PUBLIC_DATABASE_URL}/rol/public`
  );

  let roles: RolPublic[] = [];
  useEffect(() => {
    if (data) roles = data;
  }, []);

  return (
    <div className={styles.sticky_body}>
      <h1>Selecciona los Roles que te correspondan</h1>
      <div className={styles.container_cards_roles}>
        <SimpleCard
          background_color={"#ffffffbf"}
          height={"100%"}
          width={"30%"}
          align_items={""}
          justify_content={"center"}
        >
          <div className={styles.container_roles}>
            <CheckBox disabled={true} defaultChecked={true}>
              Usuario
            </CheckBox>

            {roles.map((role) => (
              <CheckBox key={role.id}>{role.nombre}</CheckBox>
            ))}
          </div>
          {roles.length != 0 ? (
            <></>
          ) : (
            <h1 className={styles.error}>No hay roles seleccionables</h1>
          )}
        </SimpleCard>
      </div>

      <h3>Si deseas otro rol a demas de estos realiza un procedimiento</h3>
    </div>
  );
}

export default Roles;
