import React, { useContext, useMemo } from 'react';
import NavigatorContext, { NavigatorContextType } from './NavigatorContext';

export interface NavigatorContextProviderProps {
  type: NavigatorContextType['type'];
  getForwardNavigationAction: NavigatorContextType['getForwardNavigationAction'];
}

const NavigatorContextProvider: React.FC<
  React.PropsWithChildren<NavigatorContextProviderProps>
> = ({ type, getForwardNavigationAction, children }) => {
  const navigator = useContext(NavigatorContext);

  const value = useMemo<NavigatorContextType>(() => {
    return {
      type,
      getForwardNavigationAction: (step, params) => {
        const action = getForwardNavigationAction(step, params);
        if (action) {
          return action;
        }
        return navigator?.getForwardNavigationAction(step, params) ?? null;
      },
    };
  }, [type, getForwardNavigationAction, navigator]);

  return <NavigatorContext.Provider value={value}>{children}</NavigatorContext.Provider>;
};

export default NavigatorContextProvider;
