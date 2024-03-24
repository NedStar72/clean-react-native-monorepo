import { DependencyList, useCallback, useEffect } from 'react';
import { EventArg, EventMapBase, useNavigation } from '@react-navigation/native';

type NavigationBeforeRemoveEvent = EventArg<
  'beforeRemove',
  true,
  EventMapBase['beforeRemove']['data']
>;

type StepperBeforeRemoveEvent = {
  defaultPrevented: NavigationBeforeRemoveEvent['defaultPrevented'];
  preventDefault: NavigationBeforeRemoveEvent['preventDefault'];
};

export type StepperBeforeRemoveEventListener = (event: StepperBeforeRemoveEvent) => void;

function useBeforeRemoveEffect(
  callback: StepperBeforeRemoveEventListener,
  callbackDeps?: DependencyList,
) {
  const navigation = useNavigation();

  const memoizedCallback = useCallback(callback, callbackDeps ?? []);

  useEffect(() => {
    const unsubscribe = navigation.addListener('beforeRemove', memoizedCallback);

    return unsubscribe;
  }, [memoizedCallback]);
}

export default useBeforeRemoveEffect;
