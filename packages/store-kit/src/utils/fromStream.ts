import { action, makeObservable, observable } from 'mobx';
import { Observable } from 'rxjs';
import { Disposable } from '../Disposable';

class StreamListener<T> extends Disposable {
  @observable.ref current!: T;

  constructor(observable: Observable<T>, initialValue: T) {
    super();
    this.current = initialValue;
    makeObservable(this);
    this.bind(observable.subscribe(this));
  }

  @action.bound
  next(value: T) {
    this.current = value;
  }

  @action.bound
  complete() {
    this.dispose();
  }

  @action.bound
  error(value: T) {
    this.current = value;
    this.dispose();
  }
}

export function fromStream<T>(observable: Observable<T>): StreamListener<T | undefined>;
export function fromStream<T>(observable: Observable<T>, initialValue: T): StreamListener<T>;
export function fromStream<T>(
  observable: Observable<T>,
  initialValue: T | undefined = undefined,
): StreamListener<T | undefined> {
  return new StreamListener(observable, initialValue);
}
