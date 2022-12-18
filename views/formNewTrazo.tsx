import React from "react";
import * as Yup from "yup";
import { withFormik, FormikProps, FormikErrors, Form, Field } from "formik";
import styles from "../styles/view/forms/Forms.module.css";
import Input from "../components/input/input";
import CheckBox from "../components/input/checkbox";
import SimpleButton from "../components/button/simpleButtton";
import { Rol } from "../types/Rol";
import { NextRouter } from "next/router";

// Shape of form values
interface FormValues {
  name: string;
}

interface OtherProps {
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
  router: NextRouter;
}

// Aside: You may see InjectedFormikProps<OtherProps, FormValues> instead of what comes below in older code.. InjectedFormikProps was artifact of when Formik only exported a HoC. It is also less flexible as it MUST wrap all props (it passes them through).
const InnerForm = (props: OtherProps & FormikProps<FormValues>) => {
  const { touched, errors, isSubmitting } = props;
  return (
    <Form>
      <div className={styles.container_form}>
        <Input labelText="Nombre" id="name" />
        {touched.name && errors.name && <div>{errors.name}</div>}

        <SimpleButton
          type="submit"
          btnText={"Siguiente"}
          disabled={isSubmitting}
        />
      </div>
    </Form>
  );
};

// The type of props MyForm receives
interface MyFormProps {
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
  router: NextRouter;
}

// Wrap our form with the withFormik HoC
const FormNewTrazo = withFormik<MyFormProps, FormValues>({
  // Transform outer props into form values
  mapPropsToValues: (props) => {
    return {
      name: "",
    };
  },

  // Add a custom validation function (this can be async too!)
  validate: (values: FormValues) => {
    let errors: FormikErrors<FormValues> = {};
    if (!values.name) {
      errors.name = "Requerido";
    }

    return errors;
  },

  handleSubmit: (values, { props }) => {
    props.router.push({
      pathname: "/add/trazo/",
      query: { paso: 1, name: values.name },
    });
  },
})(InnerForm);

export default FormNewTrazo;
