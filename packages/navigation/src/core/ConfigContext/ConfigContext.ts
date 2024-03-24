import { createContext } from 'react';
import { BaseStep, BaseSteps } from './BaseSteps';
import { BaseOptions, StepConfig } from './Step';

export type Config<Steps extends BaseSteps, Options extends BaseOptions> = {
  [step in BaseStep]: StepConfig<Steps, Options, BaseStep>;
};

export type ConfigIdentifier = string;

export interface ConfigContextType<Steps extends BaseSteps, Options extends BaseOptions> {
  readonly config: Config<Steps, Options>;
  readonly registeredConfigs: ConfigIdentifier[];
  set: (id: ConfigIdentifier, config: Config<Steps, Options>) => void;
  remove: (id: ConfigIdentifier) => void;
}

const ConfigContext = createContext<ConfigContextType<BaseSteps, BaseOptions> | undefined>(
  undefined,
);

export default ConfigContext;
