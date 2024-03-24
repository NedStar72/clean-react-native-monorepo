import MetadataError from '../MetadataError';
import Metadata from '../Metadata';
import hasMetadata from './hasMetadata';

function defineMetadata<T extends Metadata>(
  target: Object,
  metadata: T,
  propertyKey?: string | symbol,
) {
  if (hasMetadata(target, metadata.type, propertyKey)) {
    throw new MetadataError('Cannot overwrite existing metadata');
  }
  if (propertyKey) {
    Reflect.defineMetadata(metadata.type, metadata, target, propertyKey);
  } else {
    Reflect.defineMetadata(metadata.type, metadata, target);
  }
}

export default defineMetadata;
