import useAxios from "axios-hooks";
import Link from "next/link";
import { useRouter } from "next/router";
import ProgressBar from "../../components/bar/progerssBar";
import ProgressBarOnlyNumber from "../../components/bar/progerssBarOnlyNumber";
import SimpleButton from "../../components/button/simpleButtton";
import SimpleCard from "../../components/card/simpleCard";
import StickyCard from "../../components/card/stickyCard";
import CheckBox from "../../components/input/checkbox";
import Layout from "../../components/layout/layout";
import styles from "../../styles/user/Trazado.module.css";
import { Trazo, TrazoHome, TrazoPasos } from "../../types/Trazos";
import NavbarAdmin from "../../views/navbarAdmin";

const roles = ["Estudiante", "Profesor", "Secretario"];

function Roles() {
  const { query } = useRouter();

  let token = "";

  if (typeof window !== "undefined") {
    token = localStorage.getItem("token") || "";
  }

  // get query param

  const [{ data, loading, error }, refetch] = useAxios<Trazo>(
    {
      url: `${process.env.NEXT_PUBLIC_DATABASE_URL}/trazo/${query.trazo}`,
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    },
    { useCache: false }
  );

  return (
    <div className={styles.container}>
      <Layout navbar={<NavbarAdmin />}>
        <div className={styles.container_sticky_card}>
          <div className={styles.containerprogressbar}>
            <ProgressBarOnlyNumber
              stepsNumber={data?.cantidadPasos || 1}
              currentStep={data?.pasoActual || 1}
            />
          </div>

          <StickyCard
            childHeader={<h1>{data?.nombre}</h1>}
            childBody={<StickyBody description={data?.descripcion || ""} />}
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

function StickyBody({ description }: { description: string }) {
  return (
    <div className={styles.sticky_body}>
      <h1>{description}</h1>
      <div className={styles.container_cards_roles}></div>
    </div>
  );
}

export default Roles;
