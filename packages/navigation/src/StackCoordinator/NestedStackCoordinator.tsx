import React from 'react';
import NavigationError from '../../NavigationError';
import { BaseSteps, useNavigator, createCoordinatorFactory, useCoordinatorBuilder } from '../core';
import { StackStepOptions } from './StackStepOptions';
import StackCoordinatorType from './StackCoordinatorType';

interface NestedStackCoordinatorProps<Steps extends BaseSteps, Step extends keyof Steps> {
  initialStep: Step;
  initialParams?: Steps[Step];
}

const NestedStackCoordinator = <Steps extends BaseSteps, Step extends keyof Steps>({
  initialStep,
  initialParams,
  children,
}: React.PropsWithChildren<NestedStackCoordinatorProps<Steps, Step>>) => {
  const { config } = useCoordinatorBuilder<Steps, StackStepOptions>({
    type: StackCoordinatorType,
    children,
  });

  const navigator = useNavigator();

  if (navigator.type !== StackCoordinatorType) {
    throw new NavigationError(
      'NestedStackCoordinator должен находить непосредственно под StackCoordinator',
    );
  }

  // FIXME: casting to string
  const { component: InitialScreen } = config[initialStep as string];
  // FIXME: Из-за `Stepper[Step] extends never ? ... : ...`
  // @ts-expect-error
  return <InitialScreen {...initialParams} />;
};

const createNestedStackCoordinator = createCoordinatorFactory<StackStepOptions>(
  NestedStackCoordinator,
  { nestedCoordinator: true },
);

export default createNestedStackCoordinator;
