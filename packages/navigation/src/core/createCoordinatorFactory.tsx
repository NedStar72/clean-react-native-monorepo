import React from 'react';
import type { WithOptionalProperty } from '@packages/ts-kit';
import {
  BaseOptions,
  BaseSteps,
  ComponentType,
  Step,
  StepConfig,
  useStepComponent,
  withConfig,
} from './ConfigContext';

type BaseCoordinatorOptions = object;

interface CoordinatorBaseProps<
  Steps extends BaseSteps,
  CoordinatorOptions extends BaseCoordinatorOptions,
  Step extends keyof Steps,
> {
  initialStep: Step;
  // FIXME: типизация не справляется с шагом в шаге (ну или я не справляюсь с типизацией)
  // Опционал позволяет в шагах на координатор указывать необязательный initialParams
  initialParams?: Steps[Step];
  options?: CoordinatorOptions;
}

type CoordinatorProps<
  Steps extends BaseSteps,
  CoordinatorOptions extends BaseCoordinatorOptions,
  Step extends keyof Steps,
> = Steps[Step] extends never
  ? WithOptionalProperty<CoordinatorBaseProps<Steps, CoordinatorOptions, Step>, 'initialParams'>
  : CoordinatorBaseProps<Steps, CoordinatorOptions, Step>;

type CoordinatorPropsWithChildren<
  Steps extends BaseSteps,
  CoordinatorOptions extends BaseCoordinatorOptions,
  Step extends keyof Steps,
> = React.PropsWithChildren<CoordinatorProps<Steps, CoordinatorOptions, Step>>;

interface CoordinatorType<
  Steps extends BaseSteps,
  CoordinatorOptions extends BaseCoordinatorOptions,
  Step extends keyof Steps,
> {
  (props: CoordinatorPropsWithChildren<Steps, CoordinatorOptions, Step>): React.JSX.Element;
}

export type CoordinatorFactory<
  Steps extends BaseSteps,
  CoordinatorOptions extends BaseCoordinatorOptions,
  StepOptions extends BaseOptions,
> = {
  Coordinator: <Step extends keyof Steps>(
    _: CoordinatorPropsWithChildren<Steps, CoordinatorOptions, Step>,
  ) => ReturnType<CoordinatorType<Steps, CoordinatorOptions, Step>>;
  Step: <Step extends keyof Steps>(_: StepConfig<Steps, StepOptions, Step>) => null;
  useStepComponent: <Step extends keyof Steps>(
    _: ComponentType<Steps, StepOptions, Step>,
  ) => ComponentType<Steps, StepOptions, Step>;
};

interface CoordinatorFactoryOptions {
  nestedCoordinator?: boolean;
}

function createCoordinatorFactory<
  StepOptions extends BaseOptions,
  CoordinatorOptions extends BaseCoordinatorOptions = BaseCoordinatorOptions,
>(
  Coordinator: CoordinatorType<BaseSteps, CoordinatorOptions, keyof BaseSteps>,
  options?: CoordinatorFactoryOptions,
) {
  return function createCoordinator<Steps extends BaseSteps>() {
    return {
      Coordinator: options?.nestedCoordinator
        ? Coordinator
        : (withConfig()(Coordinator) as typeof Coordinator),
      Step,
      useStepComponent,
    } as CoordinatorFactory<Steps, CoordinatorOptions, StepOptions>;
  };
}

export default createCoordinatorFactory;
