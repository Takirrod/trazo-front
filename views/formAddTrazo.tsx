import Link from "next/link";
import React from "react";
import styles from "../styles/view/forms/Forms.module.css";
import { Formik, Field, Form, FormikHelpers } from "formik";
import Input from "../components/input/input";
import SimpleButton from "../components/button/simpleButtton";
import { useRouter } from "next/router";

interface Values {
  nombre_paso?: string;
  asignar_rol?: string;
}
const FormAddTrazo = () => {
  const router = useRouter();
  const { query } = useRouter();

  return (
    <>
      <div className={styles.container_all}>
        <h1>Paso {query.paso}</h1>
        <Formik
          initialValues={
            {
              // nombre_paso: "",
            }
          }
          onSubmit={(
            values: Values,
            { setSubmitting }: FormikHelpers<Values>
          ) => {
            setTimeout(() => {
              //   alert(JSON.stringify(values, null, 2));
              setSubmitting(false);
            }, 500);
          }}
        >
          <Form>
            <div className={styles.container_form}>
              <Input
                type="number"
                id="nombre_paso"
                labelText="Nombre del Paso"
                colorLabel="black"
              />

              <Input
                type="text"
                id="asignar_rol"
                labelText="Asignar a Persona/Rol"
                colorLabel="black"
              />
              <p></p>
              <p></p>
              <div className={styles.container_buttons}>
                <SimpleButton
                  onClick={() => {
                    const nextStep = parseInt(query.paso!.toString()) + 1;
                    router.push(`/add/trazo?paso=${nextStep}`);
                  }}
                  type="submit"
                  btnText="Agregar Paso"
                />
                <SimpleButton
                  onClick={() => {
                    router.push(`/user/home`);
                  }}
                  type="button"
                  btnText="Crear Trazo"
                />
              </div>
            </div>
          </Form>
        </Formik>
      </div>
    </>
  );
};

export default FormAddTrazo;
