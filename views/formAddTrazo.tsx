import React, { useEffect } from "react";
import * as Yup from "yup";
import { withFormik, FormikProps, FormikErrors, Form, Field } from "formik";
import styles from "../styles/view/forms/Forms.module.css";
import Input from "../components/input/input";
import CheckBox from "../components/input/checkbox";
import SimpleButton from "../components/button/simpleButtton";
import { Rol } from "../types/Rol";
import { NextRouter } from "next/router";
import { PasoGuardado, TrazoCreate } from "../types/Trazos";

// Shape of form values
interface FormValues {
  name: string;
  description: string;
}

interface OtherProps {
  router: NextRouter;
  pasoActal: number;
  nameTrazo: string;
  pasoSave: PasoGuardado[];
  textArea: string;
  registerNewTrazo: (name: string) => void;
  setPasoSave: React.Dispatch<React.SetStateAction<PasoGuardado[]>>;
  setSendTrazoNew: React.Dispatch<React.SetStateAction<boolean>>;
}

// Aside: You may see InjectedFormikProps<OtherProps, FormValues> instead of what comes below in older code.. InjectedFormikProps was artifact of when Formik only exported a HoC. It is also less flexible as it MUST wrap all props (it passes them through).
const InnerForm = (props: OtherProps & FormikProps<FormValues>) => {
  const { touched, errors, isSubmitting, pasoSave } = props;
  return (
    <Form>
      <div className={styles.container_form}>
        <h1>Paso numero {props.pasoActal}</h1>
        <Input
          type="text"
          id="name"
          labelText="Nombre del Paso"
          colorLabel="black"
        />
        {touched.name && errors.name && <div>{errors.name}</div>}
        <Input
          type="text"
          id="description"
          labelText="Asignar a Persona/Rol"
          colorLabel="black"
        />
        {touched.description && errors.description && (
          <div>{errors.description}</div>
        )}
        <p></p>
        <p></p>
        <div className={styles.container_buttons}>
          <SimpleButton type="submit" btnText="Agregar Paso" />
          <SimpleButton
            onClick={async () => {
              await props.setTouched({
                name: true,
                description: true,
              });
              if (props.values.name && props.values.description) {

                props.setPasoSave(
                  props.pasoSave.concat({
                    nombre: props.values.name,
                    descripcion: props.values.description,
                    pasoNumero: props.pasoActal,
                    idUsuario: null,
                    idRol: null,
                    idTrazoGuardado: null,
                  }),
                )

                props.setSendTrazoNew(true);

              } else {
                // props.
              }

              // props.router.push(`/user/home`);
            }}
            type="button"
            btnText="Crear Trazo"
          />
        </div>
      </div>
    </Form>
  );
};

// The type of props MyForm receives
interface MyFormProps {
  router: NextRouter;
  pasoActal: number;
  nameTrazo: string;
  pasoSave: PasoGuardado[];
  textArea: string;
  registerNewTrazo: (name: string) => void;
  setPasoSave: React.Dispatch<React.SetStateAction<PasoGuardado[]>>;
  setSendTrazoNew: React.Dispatch<React.SetStateAction<boolean>>;
}

// Wrap our form with the withFormik HoC
const FormAddTrazo = withFormik<MyFormProps, FormValues>({
  // Transform outer props into form values
  mapPropsToValues: (props) => {
    return {
      name: "",
      description: "",
    };
  },

  // Add a custom validation function (this can be async too!)
  validate: (values: FormValues) => {
    let errors: FormikErrors<FormValues> = {};
    if (!values.name) {
      errors.name = "Requerido";
    }

    if (!values.description) {
      errors.description = "Requerido";
    }
    return errors;
  },

  handleSubmit: (values, { props }) => {

    // wait for setPasoSave to finish
    props.setPasoSave(
      props.pasoSave.concat({
        nombre: values.name,
        descripcion: values.description,
        pasoNumero: props.pasoActal,
        idUsuario: null,
        idRol: null,
        idTrazoGuardado: null,
      }),
    )

    // useEffect(() => {
    const nextStep = props.pasoActal + 1;

    props.router.push({
      pathname: "/add/trazo/",
      query: { paso: nextStep, name: props.nameTrazo },
    });


    values.name = "";
    values.description = "";

    //   console.log(props.pasoSave);
    // }, [props.pasoSave])
    // console.log(props.pasoSave);





  },
})(InnerForm);

export default FormAddTrazo;
