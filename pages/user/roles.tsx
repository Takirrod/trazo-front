import useAxios from "axios-hooks";
import { getToken } from "next-auth/jwt";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import SimpleButton from "../../components/button/simpleButtton";
import SimpleCard from "../../components/card/simpleCard";
import StickyCard from "../../components/card/stickyCard";
import CheckBox from "../../components/input/checkbox";
import Layout from "../../components/layout/layout";
import styles from "../../styles/user/Roles.module.css";
import { RolPublic } from "../../types/RolPublic";
import { UserRegister, UserRegisterRes } from "../../types/UserRegister";

function Roles() {
  const [checkBoxes, setCheckBoxes] = useState<boolean[]>([]);
  const { data: session, status } = useSession();

  const router = useRouter();

  const [, register] = useAxios<UserRegisterRes>(
    {
      url: `${process.env.NEXT_PUBLIC_DATABASE_URL}/auth/register`,
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_TOKEN || ""}`,
      },
    },
    { manual: true }
  );

  // fetch getYTData

  // console.log(dataToken);

  const [{ data, loading, error }, refetch] = useAxios<RolPublic[]>(
    `${process.env.NEXT_PUBLIC_DATABASE_URL}/rol/public`
  );

  let roles: RolPublic[] = [];
  useEffect(() => {
    if (data) {
      roles = data;
      roles.forEach((role) => {
        setCheckBoxes((prevState) => [...prevState, false]);
      });
    }
  }, [data]);

  const registerNewUser = async () => {
    const data = await register({
      data: setUser(),
    });

    // console.log(data);

    localStorage.setItem("token", data.data.token);
    localStorage.setItem("id_user", data.data.idUsuario.toString());
    localStorage.setItem("id_rol", JSON.stringify(data.data.roles));

    router.push("/user/home");
  };

  function setUser(): UserRegister {
    let rolesChecked: number[] = [
      ...checkBoxes
        .map((value, index) => (value ? data![index].id : 0))
        .filter((value) => value != 0),
    ];
    rolesChecked?.push(2);
    return {
      email: session?.user?.email || "",
      nombre: session?.user?.name || "",
      apellido: "",
      idRol: rolesChecked,
      usuario: session?.user?.name || "",
      urlPerfil: session?.user?.image || "",
    };
  }

  return (
    <div className={styles.container}>
      <Layout>
        <div className={styles.container_sticky_card}>
          <StickyCard
            childHeader={<></>}
            childBody={
              <StickyBody
                data={data}
                loading={loading}
                setCheckBoxes={setCheckBoxes}
                checkBoxes={checkBoxes}
              />
            }
            align_items={"center"}
            justify_content={"center"}
          />
          <div className={styles.button_container}>
            ={" "}
            <SimpleButton
              onClick={() => {
                registerNewUser();
                // console.log(checkBoxes);
              }}
              type="button"
              btnText="Continuar"
            />
          </div>
        </div>
      </Layout>
    </div>
  );
}

function StickyBody({
  checkBoxes,
  setCheckBoxes,
  loading,
  data,
}: {
  checkBoxes: boolean[];
  setCheckBoxes: React.Dispatch<React.SetStateAction<boolean[]>>;
  loading: boolean;
  data: RolPublic[] | undefined;
}) {
  return (
    <div className={styles.sticky_body}>
      <h1>Selecciona los Roles que te correspondan</h1>
      <div className={styles.container_cards_roles}>
        <SimpleCard
          background_color={"#ffffffbf"}
          height={"100%"}
          width={"30%"}
          align_items={""}
          justify_content={"center"}
        >
          <div className={styles.container_roles}>
            <CheckBox isChecked={true} disabled={true} defaultChecked={true}>
              Usuario
            </CheckBox>

            {!loading ? (
              data!.map((role, index) => (
                // set checkbox index to true
                <CheckBox
                  key={role.id}
                  onChange={(e: any) => {}}
                  onClick={() => {
                    // Change value of checkbox
                    let newCheckBoxes = checkBoxes;
                    newCheckBoxes[index] = !newCheckBoxes[index];
                    setCheckBoxes(newCheckBoxes);
                  }}
                >
                  {role.nombre}
                </CheckBox>
              ))
            ) : (
              <></>
            )}
          </div>
        </SimpleCard>
      </div>

      <h3>Si deseas otro rol a demas de estos realiza un procedimiento</h3>
    </div>
  );
}

export default Roles;
