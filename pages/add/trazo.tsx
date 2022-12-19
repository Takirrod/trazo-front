import { useRouter } from "next/router";
import randomColor from "randomcolor";
import { useEffect, useState } from "react";
import StickyCard from "../../components/card/stickyCard";
import Layout from "../../components/layout/layout";
import LeftRigth from "../../components/layout/leftRigth";
import styles from "../../styles/add/AddTrazo.module.css";
import { PasoGuardado, TrazoCreate, TrazoGuardado, TrazoGuardadoCreate } from "../../types/Trazos";
import FormAddTrazo from "../../views/formAddTrazo";
import NavbarAdmin from "../../views/navbarAdmin";
import { MentionsInput, Mention } from 'react-mentions'
import useAxios from "axios-hooks";
import { Rol } from "../../types/Rol";
import { User } from "next-auth";

export default function AddTrazo() {
  const [textArea, setTextArea] = useState("");
  const [textMention, setTextMention] = useState("")
  const randomColorTextArea = randomColor({
    luminosity: "light",
    hue: "random",
  });
  return (
    <div className={styles.container}>
      <Layout navbar={<NavbarAdmin />}>
        <LeftRigth
          child1={<LeftSection textMention={textMention} setTextMention={setTextMention} colorTextArea={randomColorTextArea} setTextArea={setTextArea} />}
          child2={<RightSection textArea={textArea} />}
        />
      </Layout>
    </div>
  );
}

function LeftSection({
  setTextArea,
  colorTextArea,
  setTextMention,
  textMention
}: {
  setTextArea: React.Dispatch<React.SetStateAction<string>>;
  setTextMention: React.Dispatch<React.SetStateAction<string>>;
  colorTextArea: string;
  textMention: string
}) {

  let token = "";

  if (typeof window !== "undefined") {
    token = localStorage.getItem("token") || "";
  }

  const [{ data, loading, error }, refetch] = useAxios<User[]>({
    url: `${process.env.NEXT_PUBLIC_DATABASE_URL}/user/all`,
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  }, {
    useCache: false
  });

  const [users, setUsers] = useState<User[]>([])

  useEffect(() => {
    if (data) {
      data.map((user) => {
        setUsers((prev) => [...prev, { id: user.id, display: user.email }])
      }
      )
    }
  }, [data])

  return (
    <div className={styles.left_container}>
      <div className={styles.tittle_left}>
        <h1>Crear Trazo</h1>
      </div>
      {loading ? <p>Loading...</p> : <div className={styles.left_sticky}>
        <StickyCard
          background_color={"var(--sticky)"}
          // key={trazo}
          childHeader={<></>} //For Sticky Note
          childBody={
            <>

              <MentionsInput
                placeholder="Escribe tu trazo... @ para mencionar a un usuario # para agregar un rol"
                className={styles.text_area}
                onChange={(e) => {
                  setTextMention(e.target.value)
                }}
                value={textMention}>
                <Mention
                  trigger="@"
                  data={[]}
                // renderSuggestion={this.renderUserSuggestion}
                />
                <Mention
                  trigger="#"
                  data={users}
                // renderSuggestion={this.renderTagSuggestion}
                />
              </MentionsInput>
            </>
          }
          align_items={"center"}
          justify_content={"center"}
        />
      </div>}

    </div>
  );
}

function RightSection({ textArea }: { textArea: string }) {
  const router = useRouter();
  const { query } = useRouter();

  const { paso } = query;
  const { name } = query;
  const pasoActual = parseInt(paso?.toString() || "1");
  const pasoSave: PasoGuardado[] = [];
  const [pasoGuardado, setPasoGuardado] = useState<PasoGuardado[]>([]);
  const [sendTrazoNew, setSendTrazoNew] = useState(false);

  const [, newTrazo] = useAxios(
    {
      url: `${process.env.NEXT_PUBLIC_DATABASE_URL}/guardado`,
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_TOKEN || ""}`,
      },
    },
    { manual: true }
  );

  const registerNewTrazo = async (name: string) => {
    const data = await newTrazo({
      data: setUser(name),
    });
    router.push("/user/add");


  };

  function setUser(name: string): TrazoGuardadoCreate {

    return {
      nombre: name,
      descripcion: "",
      pasoGuardado: pasoGuardado,
    };
  }

  useEffect(() => {
    // console.log(pasoGuardado);
  }, [pasoGuardado]);

  useEffect(() => {
    if (sendTrazoNew) {
      registerNewTrazo(name?.toString() || "");
    }
  }, [sendTrazoNew]);


  return (
    <div className={styles.right_container}>
      <FormAddTrazo
        router={router}
        pasoActal={pasoActual}
        nameTrazo={name?.toString() || ""}
        textArea={textArea}
        pasoSave={pasoGuardado}
        setPasoSave={setPasoGuardado}
        registerNewTrazo={registerNewTrazo}
        setSendTrazoNew={setSendTrazoNew}
      />

    </div>
  );
}
