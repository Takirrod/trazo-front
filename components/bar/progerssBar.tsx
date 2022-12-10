// import the progress bar
import StepProgressBar from "react-step-progress";
// import the stylesheet
import "react-step-progress/dist/index.css";
import styles from "../../styles/components/bar/ProgressBar.module.css";

// setup the step content

function ProgressBar() {
  // setup step validators, will be called before proceeding to the next step
  function step2Validator() {
    // return a boolean
    return false;
  }

  function step3Validator() {
    // return a boolean
    return false;
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
      startingStep={0}
      onSubmit={onFormSubmit}
      steps={[
        {
          label: "",
          subtitle: "",
          name: "",
          content: <></>,
        },
        {
          label: "",
          subtitle: "",
          name: "",
          content: <></>,
          validator: step2Validator,
        },
        {
          label: "",
          subtitle: "",
          name: "",
          content: <></>,
          validator: step3Validator,
        },
      ]}
    />
  );
}

export default ProgressBar;
