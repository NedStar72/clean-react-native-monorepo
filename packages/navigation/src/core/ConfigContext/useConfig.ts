import { useContext } from 'react';
import NavigationError from '../../../NavigationError';
import { BaseSteps } from './BaseSteps';
import { BaseOptions } from './Step';
import ConfigContext, { ConfigContextType } from './ConfigContext';

function useConfig<Steps extends BaseSteps, Options extends BaseOptions>() {
  const config = useContext(ConfigContext);
  if (!config) {
    throw new NavigationError('Контекст конфига не найден');
  }

  // FIXME: Upcasting
  return config as unknown as ConfigContextType<Steps, Options>;
}

export default useConfig;
