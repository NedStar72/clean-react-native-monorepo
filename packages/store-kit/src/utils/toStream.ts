import { computed, observe } from 'mobx';
import { Observable } from 'rxjs';

function toStream<T>(
  expression: () => T,
  fireImmediately: boolean | undefined = undefined,
): Observable<T> {
  const computedValue = computed(expression);
  return new Observable(observer => {
    return {
      unsubscribe: observe<T>(
        computedValue,
        ({ newValue }) => observer.next(newValue),
        fireImmediately,
      ),
    };
  });
}

export default toStream;
