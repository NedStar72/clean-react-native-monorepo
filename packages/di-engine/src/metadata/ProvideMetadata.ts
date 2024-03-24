import { Metadata, getMetadataList } from '@packages/metadata';
import type { Optional } from '@packages/ts-kit';
import { Identifier } from '../container';

const PROVIDE_TYPE = Symbol('provide');

export type ProvideMetadataOptions = {
  shared?: boolean;
};

const defaultOptions: ProvideMetadataOptions = {
  shared: false,
};

export class ProvideMetadata extends Metadata {
  public readonly identifier: Identifier;
  public readonly propertyKey: string;
  public readonly options: ProvideMetadataOptions;

  constructor(
    identifier: Identifier,
    propertyKey: string,
    options: Optional<ProvideMetadataOptions> = undefined,
  ) {
    super(PROVIDE_TYPE);

    this.identifier = identifier;
    this.propertyKey = propertyKey;
    this.options = {
      ...defaultOptions,
      ...options,
    };
  }
}

// Мб вынести в статичные функции класса и добавить в абстрактный класс?
function isProvideMetadata(metadata: Metadata): metadata is ProvideMetadata {
  return metadata.type === PROVIDE_TYPE;
}

export function getProvideMetadata(target: Object) {
  return getMetadataList(target, PROVIDE_TYPE, isProvideMetadata);
}
