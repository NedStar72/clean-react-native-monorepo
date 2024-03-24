import { defineOrAppendMetadata } from '@packages/metadata';
import type { Optional } from '@packages/ts-kit';
import { Container, Identifier } from '../container';
import { ResolveMetadata, ResolveMetadataOptions } from '../metadata';

export function resolve(
  identifier: Identifier,
  options: Optional<ResolveMetadataOptions> = undefined,
) {
  return function resolveDecorator<T extends Container>(entry: T, propertyKey: string) {
    defineOrAppendMetadata(entry, new ResolveMetadata(identifier, propertyKey, options));
  };
}
