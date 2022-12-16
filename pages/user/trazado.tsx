import Link from "next/link";
import ProgressBar from "../../components/bar/progerssBar";
import SimpleButton from "../../components/button/simpleButtton";
import SimpleCard from "../../components/card/simpleCard";
import StickyCard from "../../components/card/stickyCard";
import CheckBox from "../../components/input/checkbox";
import Layout from "../../components/layout/layout";
import styles from "../../styles/user/Trazado.module.css";
import NavbarAdmin from "../../views/navbarAdmin";

const roles = ["Estudiante", "Profesor", "Secretario"];

function Roles() {
  return (
    <div className={styles.container}>
      <Layout navbar={<NavbarAdmin />}>
        <div className={styles.container_sticky_card}>
          <div className={styles.containerprogressbar}>
            <ProgressBar />
          </div>

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
  return (
    <div className={styles.sticky_body}>
      <h1>Practica Profesional de ...</h1>
      <div className={styles.container_cards_roles}></div>
    </div>
  );
}

export default Roles;
