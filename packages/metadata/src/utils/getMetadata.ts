import MetadataError from '../MetadataError';
import Metadata, { MetadataType } from '../Metadata';
import hasMetadata from './hasMetadata';

function getMetadata<T extends Metadata>(
  target: Object,
  metadataType: MetadataType,
  propertyKey?: string | symbol,
): T {
  if (hasMetadata(target, metadataType, propertyKey)) {
    const metadata = propertyKey
      ? Reflect.getMetadata(metadataType, target, propertyKey)
      : Reflect.getMetadata(metadataType, target);
    if (Array.isArray(metadata)) {
      throw new MetadataError('Lots of metadata defined, use getMetadataList');
    }
    return metadata as T;
  }
  throw new MetadataError('Metadata not found');
}

export default getMetadata;
