import useAxios from "axios-hooks";
import { TrazoCreate, TrazoGuardado, TrazoHome } from "../../types/Trazos";
import StickyNotesDefault from "../../views/sticky_notes_general";

export default function MiTrazo() {
  let token = "";
  let id = 0;

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

  function updateData(trazo: TrazoGuardado) {
    postAsignTrazo({
      data: dataNewTrazo(trazo),
    });
  }

  function dataNewTrazo(trazo: TrazoGuardado ): TrazoCreate {
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
        <StickyNotesDefault
          onClickSitickyCard={(trazo) => updateData( trazo)}
          stickyNotes={data!}
          tittlePage="Trazos Disponibles"
        />
      )}
    </>
  );
}
