import useAxios from "axios-hooks";
import Link from "next/link";
import { useRouter } from "next/router";
import { TrazoCreate, TrazoGuardado, TrazoHome } from "../../types/Trazos";
import StickyNotesDefault from "../../views/sticky_notes_general";
import styles from "../../styles/user/Home.module.css";

export default function MiTrazo() {
  let token = "";
  let id = 0;

  const router = useRouter();

  if (typeof window !== "undefined") {
    token = localStorage.getItem("token") || "";
    id = parseInt(localStorage.getItem("id_user") || "");
  }

  const [{ data, loading, error }, refetch] = useAxios<TrazoGuardado[]>({
    url: `${process.env.NEXT_PUBLIC_DATABASE_URL}/guardado/all`,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  const [
    { data: postTrazo, loading: postLoadingTrazo, error: postErrorTrazo },
    postAsignTrazo,
  ] = useAxios(
    {
      url: `${process.env.NEXT_PUBLIC_DATABASE_URL}/trazo`,
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    },
    { manual: true }
  );

  async function updateData(trazo: TrazoGuardado) {
   await postAsignTrazo({
      data: dataNewTrazo(trazo),
    });

    // goto user/home
    router.prefetch("/user/home");


    router.replace("/user/home");
  }

  function dataNewTrazo(trazo: TrazoGuardado): TrazoCreate {
    return {
      nombre: trazo.nombre,
      descripcion: trazo.descripcion,
      cantidadPasos: trazo.numeroPasos,
      estaTerminado: false,
      pasoActual: 1,
      idUsuario: id,
      idRol: 1, //TODO ask takis
      paso: [
        {
          nombre: trazo.nombre,
          descripcion: trazo.descripcion,
          pasoNumero: 1,
          idTrazo: trazo.id,
          idRol: 1, //TODO ask takis
          idUsuario: id,

          estaTerminado: false,
        },
      ],
    };
  }

  return (
    <>
      {loading ? (
        <div>Loading...</div>
      ) : (
        // <Link className={styles.link} href={"/user/home"}>
          <StickyNotesDefault
            onClickSitickyCard={(trazo) => {
              updateData(trazo);
              // router.push("/user/home", undefined, { shallow: true });
            }}
            stickyNotes={data!}
            tittlePage="Trazos Disponibles"
          />
        // </Link>
      )}
    </>
  );
}
