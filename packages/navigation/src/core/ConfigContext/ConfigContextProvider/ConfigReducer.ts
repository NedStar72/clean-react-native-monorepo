import { BaseSteps } from '../BaseSteps';
import { BaseOptions } from '../Step';
import { Config, ConfigIdentifier } from '../ConfigContext';
import { ConfigReducerAction } from './ConfigActions';

export type ConfigReducerState<Steps extends BaseSteps, Options extends BaseOptions> = {
  store: [ConfigIdentifier, Config<Steps, Options>][];
};

const ConfigReducer = <Steps extends BaseSteps, Options extends BaseOptions>(
  state: ConfigReducerState<Steps, Options>,
  { type, payload }: ConfigReducerAction<Steps, Options>,
) => {
  switch (type) {
    case 'set': {
      const index = state.store.findIndex(([id]) => id === payload.id);
      if (index < 0) {
        return {
          ...state,
          store: [...state.store, [payload.id, payload.config]],
        };
      }
      return {
        ...state,
        store: [
          // TODO: вынести в @packages/js-utils
          ...state.store.slice(0, index),
          [payload.id, payload.config],
          ...state.store.slice(index + 1),
        ],
      };
    }
    case 'remove': {
      return {
        ...state,
        store: state.store.filter(([id]) => id !== payload.id),
      };
    }
    default:
      return state;
  }
};

export default ConfigReducer;
