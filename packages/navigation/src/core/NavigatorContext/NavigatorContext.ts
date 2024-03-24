import { NavigationAction } from '@react-navigation/native';
import { createContext } from 'react';
import { BaseParams, BaseStep } from '../ConfigContext';

export type NavigationForwardActionFactory = (
  step: BaseStep,
  params?: BaseParams,
) => NavigationAction | null;

export interface NavigatorContextType {
  type: symbol;
  getForwardNavigationAction: NavigationForwardActionFactory;
}

const NavigatorContext = createContext<NavigatorContextType | undefined>(undefined);

export default NavigatorContext;
