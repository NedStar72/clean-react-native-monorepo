import { defineOrAppendMetadata } from '@packages/metadata';
import type { Optional } from '@packages/ts-kit';
import DIEngineError from '../DIEngineError';
import { Container, Identifier } from '../container';
import { ProvideMetadata, ProvideMetadataOptions } from '../metadata';

export function provide(
  identifier: Identifier,
  options: Optional<ProvideMetadataOptions> = undefined,
) {
  return function provideDecorator<T extends Container, Value>(
    entry: T,
    propertyKey: string,
    descriptor: TypedPropertyDescriptor<Value>,
  ) {
    if (!descriptor.get || descriptor.set) {
      throw new DIEngineError('Декоратор provider должен оборачивать только get свойство');
    }
    defineOrAppendMetadata(entry, new ProvideMetadata(identifier, propertyKey, options));
  };
}
