import Link from "next/link";
import SimpleButton from "../../components/button/simpleButtton";
import SimpleCard from "../../components/card/simpleCard";
import StickyCard from "../../components/card/stickyCard";
import CheckBox from "../../components/input/checkbox";
import Layout from "../../components/layout/layout";
import styles from "../../styles/user/Roles.module.css";

const roles = ["Estudiante", "Profesor", "Secretario"];

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
            <SimpleButton type="button" btnText="Continuar"/>
            
            </Link>
          </div>
        </div>
      </Layout>
    </div>
  );
}

function StickyBody() {
  return (
    <div className={styles.sticky_body}>
      <h1>Selecciona los Roles que te correspondan</h1>
      <div className={styles.container_cards_roles}>
        <SimpleCard
          background_color={"#ffffffbf"}
          height={"40%"}
          width={"30%"}
          align_items={""}
          justify_content={"center"}
        >
          <div className={styles.container_roles}>
            {roles.map((role) => (
              <CheckBox>{role}</CheckBox>
            ))}
          </div>
        </SimpleCard>

        <SimpleCard
          background_color={"#ffffffbf"}
          height={"40%"}
          width={"30%"}
          align_items={""}
          justify_content={"center"}
        >
          <div className={styles.container_roles}>
            {roles.map((role) => (
              <CheckBox>{role}</CheckBox>
            ))}
          </div>
        </SimpleCard>
        <SimpleCard
          background_color={"#ffffffbf"}
          height={"40%"}
          width={"30%"}
          align_items={""}
          justify_content={"center"}
        >
          <div className={styles.container_roles}>
            {roles.map((role) => (
              <CheckBox>{role}</CheckBox>
            ))}
          </div>
        </SimpleCard>
      </div>

      <h3>Si deseas otro rol a demas de estos realiza un procedimiento</h3>
    </div>
  );
}

export default Roles;
