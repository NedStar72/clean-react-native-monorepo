import React, { useEffect, useId } from 'react';
import { withForwardedNavigationParams } from 'react-navigation-props-mapper';
import { useDeepEffect } from '@packages/react-utils';
import type { ArrayElement } from '@packages/ts-kit';
import NavigationError from '../NavigationError';
import {
  BaseOptions,
  BaseSteps,
  Config,
  ConfigIdentifier,
  Step,
  StepConfig,
  useConfig,
} from './ConfigContext';
import { makeContextualStepName, withStepper } from './StepperContext';

const isValidStepElement = <Steps extends BaseSteps, Options extends BaseOptions>(
  child: ArrayElement<ReturnType<typeof React.Children.toArray>>,
): child is React.ReactElement<StepConfig<Steps, Options, keyof Steps>> => {
  return (
    React.isValidElement<StepConfig<Steps, Options, keyof Steps>>(child) && child.type === Step
  );
};

const isValidStepName = <Step>(key: unknown): key is Step => {
  return typeof key === 'string' && key !== '';
};

type StepConfigList<Steps extends BaseSteps, Options extends BaseOptions> = [
  keyof Steps,
  StepConfig<Steps, Options, keyof Steps>,
][];

const getStepConfigList = <Steps extends BaseSteps, Options extends BaseOptions>(
  children: React.ReactNode,
): StepConfigList<Steps, Options> => {
  return React.Children.toArray(children).map<[string, StepConfig<Steps, Options, keyof Steps>]>(
    child => {
      if (isValidStepElement<Steps, Options>(child)) {
        const { step } = child.props;
        if (!isValidStepName<keyof Steps>(step)) {
          throw new NavigationError('Имя шага должно быть строкой');
        }
        return [step, child.props];
      }
      throw new NavigationError('В координатор можно передавать только Step');
    },
  );
};

const addContextualSteps = <Steps extends BaseSteps, Options extends BaseOptions>(
  stepConfigList: StepConfigList<Steps, Options>,
  configIdentifier: ConfigIdentifier,
): StepConfigList<Steps, Options> => {
  return stepConfigList.flatMap(([step, props]) => {
    const mutatedStep = makeContextualStepName(configIdentifier, step);
    return [
      [step, props],
      [
        mutatedStep,
        {
          ...props,
          step: mutatedStep,
        },
      ],
    ];
  });
};

const wrapStepsInStepper = <Steps extends BaseSteps, Options extends BaseOptions>(
  stepConfigList: StepConfigList<Steps, Options>,
  configIdentifier: ConfigIdentifier,
  localSteps: (keyof Steps)[],
): StepConfigList<Steps, Options> => {
  return stepConfigList.map(([step, props]) => {
    const mutatedComponent = withForwardedNavigationParams<Steps[keyof Steps]>()(
      // FIXME: casting to string[]
      withStepper({ configIdentifier, localSteps: localSteps as string[] })(
        // FIXME: Downcasting
        props.component as React.FC<Steps[keyof Steps]>,
      ),
      // FIXME: Upcasting
    ) as typeof props.component;
    return [
      step,
      {
        ...props,
        component: mutatedComponent,
      },
    ];
  });
};

const stepConfigListToConfig = <Steps extends BaseSteps, Options extends BaseOptions>(
  stepConfigList: StepConfigList<Steps, Options>,
): Config<Steps, Options> => {
  return stepConfigList.reduce((acc, [step, props]) => {
    return {
      ...acc,
      [step]: props,
    };
  }, {});
};

export interface ConfigBuilderOptions {
  disableLocalSteps?: boolean;
}

const createConfig = <Steps extends BaseSteps, Options extends BaseOptions>(
  children: React.ReactNode,
  configIdentifier: ConfigIdentifier,
  options?: ConfigBuilderOptions,
): Config<Steps, Options> => {
  const cleanStepConfigList = getStepConfigList<Steps, Options>(children);
  const maybeDoubledStepConfigList = options?.disableLocalSteps
    ? cleanStepConfigList
    : addContextualSteps(cleanStepConfigList, configIdentifier);
  const localSteps = cleanStepConfigList.map(([step]) => step);
  const mutatedMaybeDoubledStepConfigList = wrapStepsInStepper(
    maybeDoubledStepConfigList,
    configIdentifier,
    localSteps,
  );
  return stepConfigListToConfig(mutatedMaybeDoubledStepConfigList);
};

const useConfigBuilder = <Steps extends BaseSteps, Options extends BaseOptions>(
  children: React.ReactNode,
  options?: ConfigBuilderOptions,
) => {
  const configIdentifier = useId();

  const buildedConfig = createConfig<Steps, Options>(children, configIdentifier, options);

  const { config, registeredConfigs, set, remove } = useConfig<Steps, Options>();

  const representativeConfig = Object.values(buildedConfig).map(props => {
    return {
      ...props,
      component: null,
    };
  });

  useDeepEffect(() => {
    set(configIdentifier, buildedConfig);
  }, [representativeConfig]);

  useEffect(() => {
    return () => {
      remove(configIdentifier);
    };
  }, []);

  return registeredConfigs.includes(configIdentifier) ? config : buildedConfig;
};

export default useConfigBuilder;
