import React from 'react';
import { BaseSteps } from './BaseSteps';

export type BaseOptions = object;

export interface StepConfig<
  Steps extends BaseSteps,
  Options extends BaseOptions,
  Step extends keyof Steps,
> {
  step: Step;
  component: React.ComponentType<Steps[Step] extends never ? object : Steps[Step]>;
  options?: Options;
}

/**
 * Empty component used for specifying coordinator configuration
 */
const Step = <Steps extends BaseSteps, Options extends BaseOptions, Step extends keyof Steps>(
  // FIXME: no-unused-vars
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _: StepConfig<Steps, Options, Step>,
) => {
  return null;
};

export default Step;
