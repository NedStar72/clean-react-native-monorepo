import React, { useMemo } from 'react';
import { StackActions } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {
  BaseSteps,
  NavigationHandlerFactory,
  createCoordinatorFactory,
  useCoordinatorBuilder,
} from '../core';
import StackCoordinatorType from './StackCoordinatorType';
import { StackStepOptions, createNavigationOptions } from './StackStepOptions';

const NavigationHandler: NavigationHandlerFactory<StackStepOptions> = () => {
  return {
    getForwardNavigationAction(config, step, params) {
      if (config[step]) {
        return StackActions.push(step, params);
      }
      return null;
    },
  };
};

const Stack = createNativeStackNavigator();

interface StackCoordinatorProps<Steps extends BaseSteps, Step extends keyof Steps> {
  initialStep: Step;
  initialParams?: Steps[Step];
}

const StackCoordinator = <Steps extends BaseSteps, Step extends keyof Steps>({
  initialStep,
  initialParams,
  children,
}: React.PropsWithChildren<StackCoordinatorProps<Steps, Step>>) => {
  const { NavigatorContainer, config } = useCoordinatorBuilder<Steps, StackStepOptions>(
    {
      type: StackCoordinatorType,
      children,
    },
    NavigationHandler,
  );

  const stepConfigList = useMemo(() => Object.values(config), [config]);

  return (
    <NavigatorContainer>
      {/* FIXME: casting to string */}
      <Stack.Navigator initialRouteName={initialStep as string}>
        {stepConfigList.map(stepConfig => {
          return (
            <Stack.Screen
              key={stepConfig.step}
              name={stepConfig.step}
              options={createNavigationOptions(stepConfig.options)}
              component={stepConfig.component as React.ComponentType}
              initialParams={stepConfig.step === initialStep ? initialParams : undefined}
            />
          );
        })}
      </Stack.Navigator>
    </NavigatorContainer>
  );
};

const createStackCoordinator = createCoordinatorFactory<StackStepOptions>(StackCoordinator);

export default createStackCoordinator;
