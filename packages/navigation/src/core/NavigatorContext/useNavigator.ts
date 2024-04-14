import { useContext } from 'react';
import NavigationError from '../../NavigationError';
import NavigatorContext from './NavigatorContext';

function useNavigator() {
  const navigator = useContext(NavigatorContext);
  if (!navigator) {
    throw new NavigationError('Контекст навигатора не найден');
  }
  return navigator;
}

export default useNavigator;
