import { createContext } from 'react';
import { BaseSteps } from '../ConfigContext';

type StepDispatcherArguments<
  Steps extends BaseSteps,
  Step extends keyof Steps,
> = Steps[Step] extends never ? [step: Step] : [step: Step, params: Steps[Step]];

export type StepDispatcher<Steps extends BaseSteps> = <Step extends keyof Steps>(
  ...args: StepDispatcherArguments<Steps, Step>
) => void;

export interface StepperContextType<Steps extends BaseSteps> {
  step: StepDispatcher<Steps>;
  stepBack: () => void;
}

const StepperContext = createContext<StepperContextType<BaseSteps> | undefined>(undefined);

export default StepperContext;
