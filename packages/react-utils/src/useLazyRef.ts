import { useRef, MutableRefObject } from 'react';

const initialValue = Symbol('initialValue');

const useLazyRef = <T>(factory: () => T) => {
  const ref: MutableRefObject<T | symbol> = useRef(initialValue);
  if (ref.current === initialValue) {
    ref.current = factory();
  }
  if (ref.current === initialValue) {
    throw new Error('Unexpected initialize useLazyRef value error');
  }
  return ref as MutableRefObject<T>;
};

export default useLazyRef;
