import { Metadata, defineMetadata, getMetadata, hasMetadata } from '@packages/metadata';
import MetadataCacheError from './MetadataCacheError';

const CACHE_TYPE = Symbol('cache');

class Cache<Value> extends Metadata {
  public readonly value: Value;

  constructor(value: Value) {
    super(CACHE_TYPE);

    this.value = value;
  }
}

function isCache<Value>(metadata: Metadata): metadata is Cache<Value> {
  return metadata.type === CACHE_TYPE;
}

export function hasCache(target: Object, propertyKey: string | symbol) {
  return hasMetadata(target, propertyKey, CACHE_TYPE);
}

export function createCache<Value>(target: Object, propertyKey: string | symbol, value: Value) {
  defineMetadata(target, new Cache(value), propertyKey);
}

export function getCache<Value>(target: Object, propertyKey: string | symbol): Value {
  const metadata = getMetadata(target, propertyKey, CACHE_TYPE);
  if (isCache<Value>(metadata)) {
    return metadata.value;
  }
  throw new MetadataCacheError('Something went wrong with the cache');
}
