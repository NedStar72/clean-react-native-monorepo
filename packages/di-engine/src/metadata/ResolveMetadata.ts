import { Metadata, getMetadataList } from '@packages/metadata';
import type { Optional } from '@packages/ts-kit';
import { Identifier } from '../container';

const RESOLVE_TYPE = Symbol('resolve');

export type ResolveMetadataOptions = {
  optional?: boolean;
  cached?: boolean;
};

const defaultOptions: ResolveMetadataOptions = {
  optional: false,
  cached: false,
};

export class ResolveMetadata extends Metadata {
  public readonly identifier: Identifier;
  public readonly propertyKey: string;
  public readonly options: ResolveMetadataOptions;

  constructor(
    identifier: Identifier,
    propertyKey: string,
    options: Optional<ResolveMetadataOptions> = undefined,
  ) {
    super(RESOLVE_TYPE);

    this.identifier = identifier;
    this.propertyKey = propertyKey;
    this.options = {
      ...defaultOptions,
      ...options,
    };
  }
}

function isResolveMetadata(metadata: Metadata): metadata is ResolveMetadata {
  return metadata.type === RESOLVE_TYPE;
}

export function getResolveMetadata(target: Object) {
  return getMetadataList(target, RESOLVE_TYPE, isResolveMetadata);
}
