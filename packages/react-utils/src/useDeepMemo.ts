import { DependencyList, useRef } from 'react';
import deepEqual from 'deep-equal';

/**
 * Memoize a result using deep equality. This hook has two advantages over
 * React.useMemo: it uses deep equality to compare memo keys, and it guarantees
 * that the memo function will only be called if the keys are unequal.
 * React.useMemo cannot be relied on to do this, since it is only a performance
 * optimization (see https://reactjs.org/docs/hooks-reference.html#usememo).
 */
function useDeepMemo<T>(factory: () => T, deps?: DependencyList): T {
  const ref = useRef<{ value: T; deps?: DependencyList }>();

  if (!ref.current || !deepEqual(deps, ref.current.deps)) {
    ref.current = { value: factory(), deps };
  }

  return ref.current.value;
}

export default useDeepMemo;
