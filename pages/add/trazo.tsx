import randomColor from "randomcolor";
import StickyCard from "../../components/card/stickyCard";
import Layout from "../../components/layout/layout";
import LeftRigth from "../../components/layout/leftRigth";
import styles from "../../styles/add/AddTrazo.module.css";
import FormAddTrazo from "../../views/formAddTrazo";
import NavbarAdmin from "../../views/navbarAdmin";

export default function AddTrazo() {
  return (
    <div className={styles.container}>
      <Layout navbar={<NavbarAdmin/>}>
        <LeftRigth child1={<LeftSection />} child2={<RightSection />} />
      </Layout>
    </div>
  );
}

function LeftSection() {
  return (
    <div className={styles.left_container}>
      <div className={styles.tittle_left}>
        <h1>Crear Trazo</h1>
      </div>

      <div className={styles.left_sticky}>
        <StickyCard
          background_color={randomColor({
            luminosity: "light",
            hue: "random",
          })}
          // key={trazo}
          childHeader={<></>} //For Sticky Note
          childBody={
            <>
              <textarea
                placeholder="Escribir que se mostrara en el paso"
                className={styles.text_area}
              ></textarea>
            </>
          }
          align_items={"center"}
          justify_content={"center"}
        />
      </div>
    </div>
  );
}

function RightSection() {

  return (
    <div className={styles.right_container}>
      <FormAddTrazo />
    </div>
  );
}
