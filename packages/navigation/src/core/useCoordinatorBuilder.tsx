import { useRef } from 'react';
import { inject, useLazyRef } from '@packages/react-utils';
import NavigationError from '../NavigationError';
import { BaseOptions, BaseSteps, Config } from './ConfigContext';
import { NavigatorContextProvider, NavigatorContextProviderProps } from './NavigatorContext';
import useConfigBuilder, { ConfigBuilderOptions } from './useConfigBuilder';

interface NavigationHandler<Steps extends BaseSteps, Options extends BaseOptions> {
  getForwardNavigationAction: (
    config: Config<Steps, Options>,
    ...args: Parameters<NavigatorContextProviderProps['getForwardNavigationAction']>
  ) => ReturnType<NavigatorContextProviderProps['getForwardNavigationAction']>;
}

export interface NavigationHandlerFactory<Options extends BaseOptions> {
  <Steps extends BaseSteps>(): NavigationHandler<Steps, Options>;
}

interface CoordinatorBuilderOptions {
  type: NavigatorContextProviderProps['type'];
  children: React.ReactNode;
  configBuilderOptions?: ConfigBuilderOptions;
}

interface CoordinatorBuilder<Steps extends BaseSteps, Options extends BaseOptions> {
  NavigatorContainer: React.ComponentType<React.PropsWithChildren>;
  config: Config<Steps, Options>;
}

function useCoordinatorBuilder<Steps extends BaseSteps, Options extends BaseOptions>(
  { type, children, configBuilderOptions }: CoordinatorBuilderOptions,
  navigationHandlerFactory?: NavigationHandlerFactory<Options>,
): CoordinatorBuilder<Steps, Options> {
  const config = useConfigBuilder<Steps, Options>(children, configBuilderOptions);

  const configRef = useRef(config);
  configRef.current = config;

  const navigationHandler = useLazyRef(() => navigationHandlerFactory<Steps>?.()).current;

  const getForwardNavigationAction = useRef<
    NavigatorContextProviderProps['getForwardNavigationAction']
  >((step, params) => {
    if (!navigationHandler) {
      throw new NavigationError(
        'В координатор использующий NavigatorContext не передан NavigationHandlerFactory',
      );
    }
    const config = configRef.current;
    return navigationHandler.getForwardNavigationAction(config, step, params);
  }).current;

  const NavigatorContainer = useLazyRef(() =>
    inject(NavigatorContextProvider, { type, getForwardNavigationAction }),
  ).current;

  return {
    NavigatorContainer,
    config,
  };
}

export default useCoordinatorBuilder;
