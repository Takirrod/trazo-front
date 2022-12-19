import React from "react";
import * as Yup from "yup";
import { withFormik, FormikProps, FormikErrors, Form, Field } from "formik";
import styles from "../styles/view/forms/Forms.module.css";
import Input from "../components/input/input";
import CheckBox from "../components/input/checkbox";
import SimpleButton from "../components/button/simpleButtton";
import { Rol } from "../types/Rol";
import { NextRouter } from "next/router";
import { Paso, TrazoCreate } from "../types/Trazos";

// Shape of form values
interface FormValues {
  name: string;
  description: string;
}

interface OtherProps {
  router: NextRouter;
  pasoActal: number;
  nameTrazo: string;
  pasoSave: Paso[];
  setPasoSave: React.Dispatch<React.SetStateAction<Paso[]>>;
  textArea: string;
  registerNewTrazo: (name: string) => void;
}

// Aside: You may see InjectedFormikProps<OtherProps, FormValues> instead of what comes below in older code.. InjectedFormikProps was artifact of when Formik only exported a HoC. It is also less flexible as it MUST wrap all props (it passes them through).
const InnerForm = (props: OtherProps & FormikProps<FormValues>) => {
  const { touched, errors, isSubmitting } = props;
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
                props.setPasoSave([
                  ...props.pasoSave,
                  {
                    nombre: props.values.name,
                    descripcion: props.values.description,
                    estaTerminado: false,
                    pasoNumero: props.pasoActal,
                    idUsuario: null,
                    idRol: 1,
                    idTrazo: 1,
                  },
                ]);
                console.log("paso actual", props.pasoActal);

                setTimeout(() => {
                  props.registerNewTrazo(props.nameTrazo);

                }, 1000);
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
  pasoSave: Paso[];
  setPasoSave: React.Dispatch<React.SetStateAction<Paso[]>>;
  textArea: string;
  registerNewTrazo: (name: string) => void;
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
    props.setPasoSave([
      ...props.pasoSave,
      {
        nombre: values.name,
        descripcion: values.description,
        estaTerminado: false,
        pasoNumero: props.pasoActal,
        idUsuario: null,
        idRol: 1,
        idTrazo: 1,
      },
    ]);
    const nextStep = props.pasoActal + 1;

    props.router.push({
      pathname: "/add/trazo/",
      query: { paso: nextStep, name: props.nameTrazo },
    });

    values.name = "";
    values.description = "";
  },
})(InnerForm);

export default FormAddTrazo;
