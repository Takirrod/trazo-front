import useAxios from "axios-hooks";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { TrazoHome } from "../../types/Trazos";
import StickyNotesDefault from "../../views/sticky_notes_general";

function InProcess() {
  let token = "";

  if (typeof window !== "undefined") {
    token = localStorage.getItem("token") || "";
  }

  const router = useRouter();

  let roles = "";

  if (typeof window !== "undefined") {
    roles = localStorage.getItem("id_rol") || "";
  }

  const [rolesNumber, setRolesNumber] = useState<number[]>([]);

  useEffect(() => {
    if (roles) {
      setRolesNumber(JSON.parse(roles));
    }
  }, [roles]);

  useEffect(() => {
    if (rolesNumber && !rolesNumber.includes(1)) {
      // router.push("/user/home");
    }
  }, [rolesNumber]);

  const [{ data, loading, error }, refetch] = useAxios<TrazoHome[]>({
    url: `${process.env.NEXT_PUBLIC_DATABASE_URL}/trazo/admin`,
    params: {
      terminados: false,
    },
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  },
  {
    useCache: false
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
