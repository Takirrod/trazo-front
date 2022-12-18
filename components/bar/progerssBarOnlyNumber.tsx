// import the progress bar
import StepProgressBar from "react-step-progress";
// import the stylesheet
import "react-step-progress/dist/index.css";
import styles from "../../styles/components/bar/ProgressBar.module.css";
import { TrazoGuardado, TrazoHome } from "../../types/Trazos";

// setup the step content

function ProgressBarOnlyNumber({
  stepsNumber,
  currentStep,
}: {
  stepsNumber: number;
  currentStep: number;
}) {
  // get type of stepsNumber
  const steps = [];

  for (let i = 0; i < stepsNumber; i++) {
    steps.push({
      label: "",
      subtitle: "",
      name: "",
      content: <></>,
    });
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
      startingStep={currentStep - 1}
      onSubmit={onFormSubmit}
      steps={steps}
    />
  );
}

export default ProgressBarOnlyNumber;
