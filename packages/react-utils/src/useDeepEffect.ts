import { DependencyList, EffectCallback, useEffect } from 'react';
import useDeepMemo from './useDeepMemo';

function useDeepEffect(callback: EffectCallback, deps?: DependencyList) {
  return useEffect(
    callback,
    useDeepMemo(() => deps, deps),
  );
}

export default useDeepEffect;
