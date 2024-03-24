import Metadata, { MetadataType } from '../Metadata';
import hasMetadata from './hasMetadata';

function getMetadataList<T extends Metadata>(
  target: Object,
  metadataType: MetadataType,
  metadataTypeChecker: (metadata: Metadata) => metadata is T,
  propertyKey?: string | symbol,
): T[] {
  if (!hasMetadata(target, metadataType, propertyKey)) {
    return [];
  }

  const metadata: Metadata = propertyKey
    ? Reflect.getMetadata(metadataType, target, propertyKey)
    : Reflect.getMetadata(metadataType, target);

  if (Array.isArray(metadata)) {
    return metadata.filter(metadataTypeChecker);
  }
  return metadataTypeChecker(metadata) ? [metadata] : [];
}

export default getMetadataList;
