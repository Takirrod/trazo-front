import Layout from "../../components/layout/layout";
import LeftRigth from "../../components/layout/leftRigth";
import styles from "../../styles/Login.module.css";
import Image from "next/image";
import SimpleCard from "../../components/card/simpleCard";
import GoogleButton from "react-google-button";
import Link from "next/link";
import { signIn, signOut, useSession } from "next-auth/react";
import useAxios from "axios-hooks";
import { useEffect } from "react";
import { useRouter } from "next/router";

function Login() {
  const { data: session, status } = useSession();
  const router = useRouter()

  const [{ data, loading, error }, refetch] = useAxios(
    `${process.env.NEXT_PUBLIC_DATABASE_URL}/user/exist?email=${session?.user?.email}`
  );

  const [{ data: dataToken }] = useAxios(
    `/api/getYTData`
  );

  console.log(dataToken);

  useEffect(()=>{
    if(session){
      if(data && data.exist){
        // router.push(`/user/home`)
      }else{
        // router.push(`/user/roles`)
      }
    }
  })

  // console.log(data);

  // console.log(data);

  return (
    <div className={styles.container}>
      <Layout>
        <LeftRigth child1={<LeftLogin />} child2={<RigthLogin />} />
        {/* <iframe src="/api/getYTData" /> */}
      </Layout>
    </div>
  );
}
function LeftLogin() {
  return (
    <div className={styles.image_guy_container}>
      <GuyImage />
    </div>
  );
}

function RigthLogin() {

  // console.log(session);

  // console.log(status);

  return (
    <div className={styles.card_login}>
      <SimpleCard align_items={"center"} justify_content={"center"}>
        <h1>Ingresar</h1>
        <Link
          href={`/api/auth/signin`}
          className={styles.buttonPrimary}
          onClick={(e) => {
            e.preventDefault();
            signIn(
              "google",
              { callbackUrl: "http://localhost:3001/auth/login" }, //TODO: cambiar callbackUrl
              { prompt: "login" }
            );
          }}
        >
          <GoogleButton type="light" label="Ingresar con Google" />
        </Link>
      </SimpleCard>
    </div>
  );
}

function GuyImage() {
  return (
    <Image
      layout="fill"
      objectFit="contain"
      src="/assets/imagen_login.png"
      alt="guy_image"
    />
  );
}

export default Login;
