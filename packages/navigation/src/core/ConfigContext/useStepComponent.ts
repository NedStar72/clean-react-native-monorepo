import { useRef } from 'react';
import { BaseSteps } from './BaseSteps';
import { BaseOptions, StepConfig } from './Step';

export type ComponentType<
  Steps extends BaseSteps,
  Options extends BaseOptions,
  Step extends keyof Steps,
> = StepConfig<Steps, Options, Step>['component'];

export default function useStepComponent<
  Steps extends BaseSteps,
  Options extends BaseOptions,
  Step extends keyof Steps,
>(Component: ComponentType<Steps, Options, Step>) {
  return useRef(Component).current;
}
