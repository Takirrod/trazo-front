import React, { useEffect } from "react";
import * as Yup from "yup";
import { withFormik, FormikProps, FormikErrors, Form, Field } from "formik";
import styles from "../styles/view/forms/Forms.module.css";
import Input from "../components/input/input";
import CheckBox from "../components/input/checkbox";
import SimpleButton from "../components/button/simpleButtton";
import { Rol } from "../types/Rol";
import DatalistInput, { useComboboxControls } from "react-datalist-input";
import { User } from "../types/UserRegister";
import { RolPublic } from "../types/RolPublic";

// Shape of form values
interface FormValues {
  name: string;
  description: string;
  content: string;
}

interface stepType {
  descripcion: string;
  id: number;
  idRol: number;
  idTrazoGuardado: number;
  idUsuario: number;
  nombre: string;
  pasoNumero: number;
}

interface OtherProps {
  isChecked: boolean;
  setIsChecked: React.Dispatch<React.SetStateAction<boolean>>;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
  dataRolesAll: RolPublic[];
  dataUsersAll: User[];
  selectedStep: stepType;
  postPaso: (
    nombre: string,
    descripcion: string,
    idUser: number | null,
    idRol: number | null
  ) => void;
}

// Aside: You may see InjectedFormikProps<OtherProps, FormValues> instead of what comes below in older code.. InjectedFormikProps was artifact of when Formik only exported a HoC. It is also less flexible as it MUST wrap all props (it passes them through).
const InnerForm = (props: OtherProps & FormikProps<FormValues>) => {
  const { touched, errors, isSubmitting, setIsChecked } = props;
  return (
    <Form>
      <div className={styles.container_form}>
        <Input labelText="Nombre" id="name" />
        {touched.name && errors.name && <div>{errors.name}</div>}

        <CheckBox
          isChecked={props.isChecked}
          onClick={() => {
            props.setIsChecked(!props.isChecked);
          }}
        >
          Asignar a Usuario o Rol
        </CheckBox>

        {!props.isChecked && (
          <InputSuggestions props={props} data={props.dataUsersAll} />
        )}

        {props.isChecked && (
          <InputSuggestionsRoles props={props} data={props.dataRolesAll} />
        )}

        {touched.description && errors.description && (
          <div>{errors.description}</div>
        )}

        <Input labelText="Descripcion" id="content" />
        {touched.content && errors.content && <div>{errors.content}</div>}

        <SimpleButton
          type="submit"
          btnText={"Actualizar Paso"}
          disabled={isSubmitting}
        />
      </div>
    </Form>
  );
};

function InputSuggestionsRoles({
  data,
  props,
}: {
  data: RolPublic[];
  props: OtherProps & FormikProps<FormValues>;
}) {
  const newData = data.map((item) => {
    return {
      id: item.id,
      value: item.nombre,
    };
  });

  const { setValue, value } = useComboboxControls({ isExpanded: true });

  useEffect(() => {
    setValue("");
  }, [props.isSubmitting]);

  return (
    <DatalistInput
      value={value}
      setValue={setValue}
      className={styles.container_input}
      placeholder="Seleccionar Rol"
      label="Seleccionar Rol"
      onSelect={(item) => {
        props.values.description = item.id;
        // setValue("")
      }}
      items={newData}
    />
  );
}

function InputSuggestions({
  data,
  props,
}: {
  data: User[];
  props: OtherProps & FormikProps<FormValues>;
}) {
  const newData = data.map((item) => {
    return {
      id: item.id,
      value: item.nombre,
    };
  });

  const { setValue, value } = useComboboxControls({ isExpanded: true });

  useEffect(() => {
    setValue("");
  }, [props.isSubmitting]);

  // get user from datausersall by props.selectedStep.idUsuario

  return (
    <DatalistInput
      className={styles.container_input}
      value={value}
      setValue={setValue}
      placeholder="Seleccionar a Usuario"
      label="Seleccionar a Usuario"
      onSelect={(item) => {
        props.values.description = item.id;
        // setValue("")
      }}
      items={newData}
    />
  );
}

function getRolUser(
  dataUserAll: User[],
  dataRolesAll: RolPublic[],
  selectedStep: stepType
): string {
  const user = dataUserAll.find((item) => item.id === selectedStep.idUsuario);

  // get rol from datausersall by props.selectedStep.idRol
  const rol = dataRolesAll.find((item) => item.id === selectedStep.idRol);

  // if user exists, set value to user
  if (user) {
    return user.nombre;
  }

  // if rol exists, set value to rol
  if (rol) {
    return rol.nombre;
  }

  return "";
}

// The type of props MyForm receives
interface MyFormProps {
  isChecked: boolean;
  setIsChecked: React.Dispatch<React.SetStateAction<boolean>>;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
  dataRolesAll: RolPublic[];
  dataUsersAll: User[];
  selectedStep?: stepType;
  postPaso: (
    nombre: string,
    descripcion: string,
    idUser: number | null,
    idRol: number | null
  ) => void;
}

// Wrap our form with the withFormik HoC
const FormUpdatePaso = withFormik<MyFormProps, FormValues>({
  // Transform outer props into form values
  mapPropsToValues: (props) => {
    return {
      name: "",
      description: "",
      content: "",
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
    // props.updateRol(values.name, values.description);

    if (!props.isChecked) {
      props.postPaso(
        values.name,
        values.content,
        parseInt(values.description),
        null
      );
    } else {
      props.postPaso(
        values.name,
        values.content,
        null,
        parseInt(values.description)
      );
    }

    props.setShowModal(false);
  },
})(InnerForm);

export default FormUpdatePaso;
