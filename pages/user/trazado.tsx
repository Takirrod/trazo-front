import useAxios from "axios-hooks";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import ProgressBar from "../../components/bar/progerssBar";
import ProgressBarOnlyNumber from "../../components/bar/progerssBarOnlyNumber";
import SimpleButton from "../../components/button/simpleButtton";
import SimpleCard from "../../components/card/simpleCard";
import StickyCard from "../../components/card/stickyCard";
import CheckBox from "../../components/input/checkbox";
import Layout from "../../components/layout/layout";
import styles from "../../styles/user/Trazado.module.css";
import { Trazo, TrazoHome, TrazoPasos } from "../../types/Trazos";
import Navbar from "../../views/navbar";
import NavbarAdmin from "../../views/navbarAdmin";
import Loader from "../../components/loader/loader";
import StepProgressBar from "../../components/bar/stepBar";

const roles = ["Estudiante", "Profesor", "Secretario"];

function Roles() {
  const { query } = useRouter();

  let token = "";
  let id = "";
  let roles = "";

  if (typeof window !== "undefined") {
    token = localStorage.getItem("token") || "";
    id = localStorage.getItem("id_user") || "";
    roles = localStorage.getItem("id_rol") || "";
  }

  const [rolesNumber, setRolesNumber] = useState<number[]>([]);

  useEffect(() => {
    if (roles) {
      setRolesNumber(JSON.parse(roles));
    }
  }, [roles]);

  // get query param

  // console.log(id)
  // console.log(rolesNumber)

  const router = useRouter();

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

  const [, updatePaso] = useAxios(
    {
      url: `${process.env.NEXT_PUBLIC_DATABASE_URL}/paso`,
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    },
    { manual: true }
  );

  const nextStep = async () => {
    const dataNewStep = await updatePaso({
      data: {
        id: data?.paso[stepNumber].id,
        estaTerminado: true,
        idTrazo: data?.id,
        pasoNumero: stepNumber + 1,
      },
    });

    if (data!.paso.length > stepNumber + 1) {
      // console.log(data?.paso.length, stepNumber + 1);
      router.push(
        {
          pathname: "/user/trazado",
          query: { trazo: query.trazo, step: stepNumber + 2 },
        },
        undefined,
        { shallow: true }
      );

      setActualStep(stepNumber + 2);

      refetch();
    } else {
      router.push("/user/home");
    }
  };

  const stepNumber = query.step ? parseInt(query.step as string) - 1 : 0;

  const [disableButton, setDisableButton] = useState(false);

  const [actualStep, setActualStep] = useState(stepNumber + 1 || 1);

  // if data.paso[stepNumber].idRol is in rolesNumber array enable button

  // if data.paso[stepNumber].idUsuario is not equal to id disable button
  useEffect(() => {
    setActualStep(stepNumber + 1);
  }, [stepNumber]);

  useEffect(() => {
    if (
      data?.paso[stepNumber].idUsuario &&
      (data?.paso[stepNumber].idUsuario !== data?.idUsuario ||
        data?.paso[stepNumber].estaTerminado)
    ) {
      setDisableButton(true);
    }

    if (
      data?.paso[stepNumber].idRol &&
      (rolesNumber.indexOf(data?.paso[stepNumber].idRol) === -1 ||
        data?.paso[stepNumber].estaTerminado)
    ) {
      setDisableButton(true);
    }
  }, [loading]);

  const steps = [];

  for (let i = 0; i < data?.cantidadPasos!; i++) {
    steps.push({
      label: "",
      subtitle: "",
      name: "",
      content: <></>,
      clickedStep: () => {
        router.push(
          {
            pathname: "/user/trazado",
            query: { trazo: query.trazo, step: i + 1 },
          },
          undefined,
          { shallow: true }
        );
      },
    });
  }

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div className={styles.container}>
          <Layout
            navbar={rolesNumber.includes(1) ? <NavbarAdmin /> : <Navbar />}
          >
            <div className={styles.container_sticky_card}>
              <div className={styles.containerprogressbar}>
                {/* <ProgressBarOnlyNumber
                  stepsNumber={data?.cantidadPasos || 1}
                  currentStep={actualStep}
                  terminado={data?.estaTerminado || false}
                /> */}

                <StepProgressBar
                  stepsNumber={data?.cantidadPasos || 1}
                  startingStep={
                    data?.cantidadPasos == actualStep
                      ? actualStep
                      : actualStep - 1
                  }
                  onSubmit={() => {}}
                  primaryBtnClass={styles.button}
                  secondaryBtnClass={styles.button}
                  stepClass={styles.step}
                  wrapperClass={styles.wrapper_trazado}
                  contentClass={styles.content}
                  steps={steps}
                />
              </div>

              <StickyCard
                childHeader={<h1>{data?.paso[stepNumber].nombre}</h1>}
                childBody={
                  <StickyBody
                    description={data?.paso[stepNumber].descripcion || ""}
                  />
                }
                align_items={"center"}
                justify_content={"center"}
              />
              <div className={styles.button_container}>
                <SimpleButton
                  disabled={disableButton}
                  onClick={() => {
                    nextStep();
                  }}
                  type="button"
                  btnText="Continuar"
                />
              </div>
            </div>
          </Layout>
        </div>
      )}
    </>
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
