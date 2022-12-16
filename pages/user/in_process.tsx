import useAxios from "axios-hooks";
import { TrazoHome } from "../../types/Trazos";
import StickyNotesDefault from "../../views/sticky_notes_general";

function InProcess() {
  let token = "";

  if (typeof window !== "undefined") {
    token = localStorage.getItem("token") || "";
  }

  const [{ data, loading, error }, refetch] = useAxios<TrazoHome[]>({
    url: `${process.env.NEXT_PUBLIC_DATABASE_URL}/trazo/admin`,
    params: {
      terminados: false,
    },
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  return (
    <>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <StickyNotesDefault stickyNotes={data!} tittlePage="Trazos En Proceso" />
      )}
    </>
  );
}

export default InProcess;
