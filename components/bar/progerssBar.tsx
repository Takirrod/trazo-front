// import the progress bar
import StepProgressBar from "react-step-progress";
// import the stylesheet
import "react-step-progress/dist/index.css";
import styles from "../../styles/components/bar/ProgressBar.module.css";
import { TrazoGuardado, TrazoHome } from "../../types/Trazos";

// setup the step content

function ProgressBar({
  stepsNumber,
}: {
  stepsNumber: TrazoGuardado | TrazoHome;
}) {
  // get type of stepsNumber
  const stepsNumberType = typeof stepsNumber;

  const isTrazoGuardado =
    stepsNumberType === "object" && stepsNumber.hasOwnProperty("numeroPasos");

  const steps = [];
  let currentStep = 0;

  if (isTrazoGuardado) {
    const trazo = stepsNumber as TrazoGuardado;

    for (let i = 0; i < trazo!.numeroPasos!; i++) {
      steps.push({
        label: "",
        subtitle: "",
        name: "",
        content: <></>,
      });
    }
  } else {
    const trazo = stepsNumber as TrazoHome;

    currentStep = currentStep > 0 ? trazo.pasoActual : 0;

    for (let i = 0; i < trazo.cantidadPasos; i++) {
      steps.push({
        label: "",
        subtitle: "",
        name: "",
        content: <></>,
      });
    }
  }

  function onFormSubmit() {
    // handle the submit logic here
    // This function will be executed at the last step
    // when the submit button (next button in the previous steps) is pressed
  }

  // render the progress bar

  return (
    <StepProgressBar
      primaryBtnClass={styles.button}
      secondaryBtnClass={styles.button}
      stepClass={styles.step}
      wrapperClass={styles.wrapper}
      startingStep={currentStep}
      onSubmit={onFormSubmit}
      steps={steps}
    />
  );
}

export default ProgressBar;
