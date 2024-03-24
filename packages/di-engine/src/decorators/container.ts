import { createCache, getCache, hasCache } from '@packages/metadata-cache';
import DIEngineError from '../DIEngineError';
import { Container } from '../container';
import { getProvideMetadata, getResolveMetadata } from '../metadata';

function createBindings<T extends Container>(container: T) {
  const metadata = getProvideMetadata(container);
  for (const provideMetadata of metadata) {
    const binding = container.bind(provideMetadata.identifier).toDynamicValue(() => {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      return container[provideMetadata.propertyKey];
    });
    if (provideMetadata.options.shared) {
      binding.inSingletonScope();
    }
  }
}

function getIndexedProvideIdentifiers<T extends Container>(container: T) {
  const metadata = getProvideMetadata(container);
  return Object.fromEntries(
    metadata.map(provideMetadata => [provideMetadata.propertyKey, provideMetadata]),
  );
}

function getIndexedResolveIdentifiers<T extends Container>(container: T) {
  const metadata = getResolveMetadata(container);
  return Object.fromEntries(
    metadata.map(provideMetadata => [provideMetadata.propertyKey, provideMetadata]),
  );
}

// Надо подумать над рефактирингом. Возможно стоит улучшить (доработать) движок,
// сделать возможным регистрацию любых метаданных. Тогда описание контейнера
// станет похоже на что-то такое:
// ```
// @resolve('identifier')
// @optional
// @cached
// someDep: SomeDep;
//
// @provide('identifier')
// @shared
// get someProp() {
//   return new SomeProp();
// }
// ```

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function container<T extends Container>(constructor: new (...args: any[]) => T) {
  return new Proxy(constructor, {
    construct(target, args) {
      const instance = Reflect.construct(target, args);

      createBindings(instance);

      const indexedProvideIdentifiers = getIndexedProvideIdentifiers(instance);
      const indexedResolvedIdentifiers = getIndexedResolveIdentifiers(instance);

      return new Proxy(instance, {
        get(target, prop: string, receiver) {
          if (prop in indexedProvideIdentifiers) {
            const metadata = indexedProvideIdentifiers[prop];
            return instance.get<unknown>(metadata.identifier);
          }
          if (prop in indexedResolvedIdentifiers) {
            const metadata = indexedResolvedIdentifiers[prop];
            if (metadata.options.optional && !instance.isBound(metadata.identifier)) {
              return undefined;
            }
            if (metadata.options.cached && hasCache(instance, prop)) {
              return getCache<unknown>(target, prop);
            }
            const value = instance.get(metadata.identifier);
            if (metadata.options.cached) {
              createCache(target, prop, value);
            }
            return value;
          }
          return Reflect.get(target, prop, receiver) as unknown;
        },
        set(target, prop: string, receiver) {
          if (prop in indexedResolvedIdentifiers) {
            throw new DIEngineError('Нельзя изменять resolved поля');
          }
          return Reflect.set(target, prop, receiver);
        },
      });
    },
  });
}
