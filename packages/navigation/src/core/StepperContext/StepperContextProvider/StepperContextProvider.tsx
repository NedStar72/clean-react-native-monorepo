import React, { useMemo } from 'react';
import { useNavigation } from '@react-navigation/native';
import NavigationError from '../../../NavigationError';
import { BaseSteps, ConfigIdentifier } from '../../ConfigContext';
import { useNavigator } from '../../NavigatorContext';
import StepperContext, { StepperContextType } from '../StepperContext';
import makeContextualStepName from './makeContextualStepName';

export interface StepperContextProviderProps {
  configIdentifier: ConfigIdentifier;
  localSteps: string[];
}

const StepperContextProvider = <Steps extends BaseSteps>({
  configIdentifier,
  localSteps,
  children,
}: React.PropsWithChildren<StepperContextProviderProps>) => {
  const navigation = useNavigation();
  const navigator = useNavigator();

  const value = useMemo<StepperContextType<Steps>>(() => {
    return {
      step: (...args) => {
        const [step, params] = args;
        // FIXME: casting to string
        const mutatedStep = localSteps.includes(step as string)
          ? makeContextualStepName<Steps>(configIdentifier, step)
          : step;
        // FIXME: casting to string
        const navigationAction = navigator.getForwardNavigationAction(
          mutatedStep as string,
          params,
        );
        if (!navigationAction) {
          throw new NavigationError('Ни один навигатор не обработал шаг');
        }
        navigation.dispatch(navigationAction);
      },
      stepBack: () => {
        navigation.goBack();
      },
    };
  }, [localSteps, navigation, navigator]);

  return (
    <StepperContext.Provider value={value as StepperContextType<BaseSteps>}>
      {children}
    </StepperContext.Provider>
  );
};

export default StepperContextProvider;
