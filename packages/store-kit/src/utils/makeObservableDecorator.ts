import { makeAutoObservable, makeObservable } from 'mobx';

interface MakeObservableOptions {
  autoObservable?: boolean;
}

const DEFAULT_METADATA_OPTIONS: MakeObservableOptions = {
  autoObservable: false,
};

export default function makeObservableDecorator<T extends object>(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  constructor: new (...args: any[]) => T,
  options: MakeObservableOptions = DEFAULT_METADATA_OPTIONS,
) {
  return new Proxy(constructor, {
    construct(target, args) {
      const instance = Reflect.construct(target, args);
      if (options.autoObservable) {
        makeAutoObservable(instance);
      } else {
        makeObservable(this);
      }
      return instance;
    },
  });
}
