import React, { useMemo } from 'react';
import { TabActions } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import {
  BaseSteps,
  NavigationHandlerFactory,
  createCoordinatorFactory,
  useCoordinatorBuilder,
} from '../core';
import TabBarCoordinatorType from './TabBarCoordinatorType';
import {
  TabBarCoordinatorOptions,
  createTabNavigatorNavigationOptions,
} from './TabBarCoordinatorOptions';
import { TabBarStepOptions, createTabScreenNavigationOptions } from './TabBarStepOptions';

const NavigationHandler: NavigationHandlerFactory<TabBarStepOptions> = () => {
  return {
    getForwardNavigationAction(config, step, params) {
      if (config[step]) {
        return TabActions.jumpTo(step, params);
      }
      return null;
    },
  };
};

const TabBar = createBottomTabNavigator();

interface StackCoordinatorProps<Steps extends BaseSteps, Step extends keyof Steps> {
  initialStep: Step;
  initialParams?: Steps[Step];
  options?: TabBarCoordinatorOptions;
}

const TabBarCoordinator = <Steps extends BaseSteps, Step extends keyof Steps>({
  initialStep,
  initialParams,
  options,
  children,
}: React.PropsWithChildren<StackCoordinatorProps<Steps, Step>>) => {
  const { NavigatorContainer, config } = useCoordinatorBuilder<Steps, TabBarStepOptions>(
    {
      type: TabBarCoordinatorType,
      children,
      configBuilderOptions: { disableLocalSteps: true },
    },
    NavigationHandler,
  );

  const stepConfigList = useMemo(() => Object.values(config), [config]);

  return (
    <NavigatorContainer>
      <TabBar.Navigator
        // FIXME: casting to string
        initialRouteName={initialStep as string}
        screenOptions={createTabNavigatorNavigationOptions(options)}
      >
        {stepConfigList.map(stepConfig => {
          return (
            <TabBar.Screen
              key={stepConfig.step}
              name={stepConfig.step}
              options={createTabScreenNavigationOptions(stepConfig.options)}
              component={stepConfig.component as React.ComponentType}
              initialParams={stepConfig.step === initialStep ? initialParams : undefined}
            />
          );
        })}
      </TabBar.Navigator>
    </NavigatorContainer>
  );
};

const createTabBarCoordinator = createCoordinatorFactory<
  TabBarStepOptions,
  TabBarCoordinatorOptions
>(TabBarCoordinator);

export default createTabBarCoordinator;
