import React from "react";
import * as Yup from "yup";
import { withFormik, FormikProps, FormikErrors, Form, Field } from "formik";
import styles from "../styles/view/forms/Forms.module.css";
import Input from "../components/input/input";
import CheckBox from "../components/input/checkbox";
import SimpleButton from "../components/button/simpleButtton";
import { Rol } from "../types/Rol";

// Shape of form values
interface FormValues {
  name: string;
  description: string;
}

interface OtherProps {
  isChecked: boolean;
  setIsChecked: React.Dispatch<React.SetStateAction<boolean>>;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
  selectedRol: Rol;
  updateRol: (name: string, description: string) => void;
  refetch: () => void;
}

// Aside: You may see InjectedFormikProps<OtherProps, FormValues> instead of what comes below in older code.. InjectedFormikProps was artifact of when Formik only exported a HoC. It is also less flexible as it MUST wrap all props (it passes them through).
const InnerForm = (props: OtherProps & FormikProps<FormValues>) => {
  const { touched, errors, isSubmitting, setIsChecked } = props;
  return (
    <Form>
      <div className={styles.container_form}>
        <Input labelText="Nombre" id="name" />
        {touched.name && errors.name && <div>{errors.name}</div>}

        <Input labelText="Descripcion" id="description" />
        {touched.description && errors.description && (
          <div>{errors.description}</div>
        )}

        <CheckBox
          onChange={(e: any) => {}}
          onClick={() => {
            setIsChecked(!props.isChecked);
          }}
          defaultChecked={props.isChecked}
        >
          Es Publico
        </CheckBox>

        <SimpleButton
          type="submit"
          btnText={"Guardar"}
          disabled={isSubmitting}
        />
      </div>
    </Form>
  );
};

// The type of props MyForm receives
interface MyFormProps {
  isChecked: boolean;
  setIsChecked: React.Dispatch<React.SetStateAction<boolean>>;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
  selectedRol: Rol;
  updateRol: (name: string, description: string) => void;
  refetch: () => void;
}

// Wrap our form with the withFormik HoC
const FormEditRole = withFormik<MyFormProps, FormValues>({
  // Transform outer props into form values
  mapPropsToValues: (props) => {
    return {
      name: props.selectedRol.nombre || "",
      description: props.selectedRol.descripcion || "",
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
    props.updateRol(values.name, values.description);

    props.setShowModal(false);
  },
})(InnerForm);

export default FormEditRole;
