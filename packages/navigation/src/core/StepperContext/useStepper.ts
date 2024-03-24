import { useContext } from 'react';
import { BaseSteps } from '../ConfigContext';
import StepperContext, { StepperContextType } from './StepperContext';

function useStepper<Steps extends BaseSteps>() {
  const stepper = useContext(StepperContext);
  if (!stepper) {
    throw new Error();
  }

  // FIXME: Upcasting
  return stepper as unknown as StepperContextType<Steps>;
}

export default useStepper;
