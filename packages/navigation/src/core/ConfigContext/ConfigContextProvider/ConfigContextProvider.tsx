import React, { useMemo, useReducer } from 'react';
import { BaseSteps } from '../BaseSteps';
import { BaseOptions } from '../Step';
import ConfigContext, { Config, ConfigContextType } from '../ConfigContext';
import { ConfigReducerAction, remove, set } from './ConfigActions';
import ConfigReducer, { ConfigReducerState } from './ConfigReducer';

const initialState = {
  store: [],
};

const ConfigContextProvider = <Steps extends BaseSteps, Options extends BaseOptions>({
  children,
}: React.PropsWithChildren) => {
  const [state, dispatch] = useReducer(
    // FIXME: Upcasting
    ConfigReducer as React.Reducer<
      ConfigReducerState<Steps, Options>,
      ConfigReducerAction<Steps, Options>
    >,
    initialState,
  );

  const config = useMemo(() => {
    return state.store.reduce<Config<Steps, Options>>((acc, [, config]) => {
      return {
        ...acc,
        ...config,
      };
    }, {});
  }, [state.store]);

  const registeredConfigs = useMemo(() => {
    return state.store.map(([id]) => id);
  }, [state.store]);

  const value = useMemo<ConfigContextType<Steps, Options>>(() => {
    return {
      config,
      registeredConfigs,
      set: (id, config) => {
        dispatch(
          set({
            id,
            config,
          }),
        );
      },
      remove: id => {
        dispatch(
          remove({
            id,
          }),
        );
      },
    };
  }, [config, registeredConfigs]);

  return (
    // FIXME: Upcasting
    <ConfigContext.Provider value={value as unknown as ConfigContextType<BaseSteps, BaseOptions>}>
      {children}
    </ConfigContext.Provider>
  );
};

export default ConfigContextProvider;
